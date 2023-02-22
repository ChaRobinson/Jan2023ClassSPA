import html from "html-literal";

export default state => html`
  <section id="jumbotron">
    <h2>SavvyCoders JavaScript Fullstack Bootcamp</h2>
    <a href="index.html">"Call to Action" "Button"</a>
  </section>

  <h3>Today's Weather</h3>
  <h3>
    The weather in ${state.weather.city} is ${state.weather.description}.
    Temperature is ${state.weather.temp}F, and it feels like
    ${state.weather.feelsLike}F.
  </h3>
`;

// import html from "html-literal";

// export default () => html`
//   <section id="jumbotron">
//     <h2>SavvyCoders JavaScript Fullstack Bootcamp</h2>
//     <a href="index.html">"Call to Action" "Button"</a>
//   </section>
// `;
