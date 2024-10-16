import { getOrders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "./utils/formatCurrency.js";
import { emptyCart, addToCart, addingTotals } from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  console.log(orderId);

  const productId = url.searchParams.get("productId");
  console.log(productId);

  const order = getOrders(orderId);
  const product = getProduct(productId);

  let productDetails;

  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${dayjs(
          productDetails.estimatedDeliveryTime
        ).format("dddd, MMMM D")}</div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${productDetails.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label ${
            percentProgress < 50 ? "current-status" : ""
          }">Preparing</div>
          <div class="progress-label ${
            percentProgress >= 50 && percentProgress < 100
              ? "current-status"
              : ""
          }">Shipped</div>
          <div class="progress-label ${
            percentProgress === 100 ? "current-status" : ""
          }">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;
  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}
loadPage();
