import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  // Tüm testler için bir defa mock tanımlıyoruz
  beforeEach(() => {
    const mockLocalStorage = {
      getItem: () => JSON.stringify([]),
      setItem: () => {},
    };

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  it("adds an existing product to cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage(); // This
    addToCart("36c64692-677f-4f58-b5ec-0dc2cf109e27");

    setTimeout(() => {
      console.log(cart); // Log cart to see what's inside
      expect(cart.length).toEqual(1);
    }, 0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("36c64692-677f-4f58-b5ec-0dc2cf109e27");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    console.log(localStorage.getItem("cart"));
    loadFromStorage(); // This should log '[]'

    addToCart("36c64692-677f-4f58-b5ec-0dc2cf109e27");

    setTimeout(() => {
      console.log(cart); // Log cart to see what's inside
      expect(cart.length).toEqual(1);
    }, 0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("36c64692-677f-4f58-b5ec-0dc2cf109e27");
    expect(cart[0].quantity).toEqual(1);
  });
});
