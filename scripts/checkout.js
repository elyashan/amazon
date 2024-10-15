import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-oop.js";
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {
  try {
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  } catch (e) {
    console.log(e);
  }
}
loadPage();
