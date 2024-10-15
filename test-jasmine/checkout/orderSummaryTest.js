import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart";

describe("test suite: renderOrderSummary", () => {
  beforeEach(() => {
    // `localStorage`'u mock'luyoruz
    const mockLocalStorage = {
      getItem: jasmine.createSpy("getItem").and.callFake(() => {
        // Local storage'dan sepete 2 ürün yükleniyormuş gibi yapıyoruz
        return JSON.stringify([
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ]);
      }),
      setItem: jasmine.createSpy("setItem"),
      clear: jasmine.createSpy("clear"),
    };

    // `localStorage` mock'unu tüm testler için ayarlıyoruz
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  it("displays the cart", () => {
    // HTML container'ı ekliyoruz
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>`;

    // Yükleme fonksiyonunu çağırıyoruz
    loadFromStorage();
    renderOrderSummary();

    // Sepetteki ürünler görüntülenmeli
    expect(localStorage.getItem).toHaveBeenCalledWith("cart"); // getItem 'cart' için çağrıldı mı?
    const orderSummary = document.querySelector(".js-order-summary").innerHTML;
    expect(orderSummary).toContain("e43638ce-6aa0-4b85-b27f-e1d07eb678c6"); // Ürünlerden biri içeriğe yazıldı mı?
  });
});
