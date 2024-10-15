import { addingTotals } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const totalItems = addingTotals();
  const checkoutLabel = document.querySelector(
    `.js-checkout-header-middle-section`
  );

  checkoutLabel.innerHTML = `Checkout (<a
        class="return-to-home-link js-return-to-home-link"
        href="amazon.html"
        >${totalItems} items</a
      >)`;
}
