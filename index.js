import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  afterRender();
  router.updatePageLinks();
}

function afterRender() {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home"; // Add a switch case statement to handle multiple routes
    // Add a switch case statement to handle multiple routes
    switch (view) {
      case "Home":
        axios
          .get(
            // Replace the key provided here with your own key from openweathermap
            `https://api.openweathermap.org/data/2.5/weather?q=st%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then(response => {
            console.log(response.data);
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Save Data into state
            store.Home.weather = {};
            store.Home.weather.city = response.data.name;
            store.Home.weather.temp = kelvinToFahrenheit(
              response.data.main.temp
            );
            store.Home.weather.feelsLike = kelvinToFahrenheit(
              response.data.main.feels_like
            );
            store.Home.weather.description =
              response.data.weather[0].description;
            console.log(store.Home.weather);

            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      render(store[view]);
    }
  })
  .resolve();

// /* eslint-disable no-prototype-builtins */
// import { Header, Nav, Main, Footer } from "./components"; // Added 6.2
// import * as store from "./store"; // Added 6.3
// import Navigo from "navigo"; // Added 6.3
// import { capitalize } from "lodash"; // Added 6.3
// import axios from "axios";

// const router = new Navigo("/");

// // add menu toggle to bars icon in nav bar
// // document.querySelector(".fa-bars").addEventListener("click", () => {
// //   document.querySelector("nav > ul").classList.toggle("hidden--mobile");
// // });

// //HTML display will take the HTML code and display it//
// function render(state = store.Home) {
//   document.querySelector("#root").innerHTML = `
// ${Header(state)}
// ${Nav(store.Links)}
// ${Main(state)}
// ${Footer()}
//   `;
//   afterRender();
//   router.updatePageLinks();
// }

// function afterRender() {
//   document.querySelector(".fa-bars").addEventListener("click", () => {
//     document.querySelector("nav > ul").classList.toggle("hidden--mobile");
//   });
// }

// router.hooks({
//   before: (done, params) => {
//     const page =
//       params && params.hasOwnProperty("page")
//         ? capitalize(params.page)
//         : "Home";
//     // Add a switch case statement to handle multiple routes
//     switch (page) {
//       case "Home":
//         axios
//           .get(
//             // Replace the key provided here with your own key from openweathermap
//             `https://api.openweathermap.org/data/2.5/weather?q=st%20louis&appid=a2b6ca5d8e5378dad78c7336fd47dca3`
//           )
//           .then(response => {
//             console.log(response.data);
//             done();
//           });
//         break;
//       default:
//         done();
//     }
//   },
//   already: params => {
//     const view =
//       params && params.data && params.data.view
//         ? capitalize(params.data.view)
//         : "Home";

//     render(store[view]);
//   }
// });

// router
//   .on({
//     "/": () => render(),
//     ":view": params => {
//       let view = capitalize(params.data.view);
//       render(store[view]);
//     }
//   })
//   .resolve();
