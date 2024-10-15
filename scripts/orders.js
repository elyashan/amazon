import { orders } from "../data/orders.js";

function renderOrdersGrid() {
  let ordersHTML = ``;
  console.log(orders);
  orders.forEach((order) => {
    ordersHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$35.06</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
        </div>
    `;
  });
  document.querySelector(".js-order-grid").innerHTML = ordersHTML;
}
renderOrdersGrid();
