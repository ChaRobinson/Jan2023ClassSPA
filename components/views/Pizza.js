import html from "html-literal";

export default st => html`
  <table id="pizzas">
    <tr>
      <th>Crust</th>
      <th>Cheese</th>
      <th>Sauce</th>
      <th>Toppings</th>
      <th>Customer</th>
      <th>Actions</th>
    </tr>
    ${st.pizzas
      .map(pizza => {
        return `<tr><td>${pizza.crust}</td><td>${pizza.cheese}</td><td>${
          pizza.sauce
        }</td><td>${pizza.toppings.join(" & ")}</td><td>${pizza.customer}</td>
        <td><a data-id="${
          pizza._id
        }" class="delete-action" href="#">Delete</a></td>
        </tr>`;
      })
      .join("")}
  </table>
`;
