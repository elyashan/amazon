export const orders = JSON.parse(localStorage.getItem("orders")) || [];
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function addOrder(newOrder) {
  orders.unshift(newOrder);
  saveToStorage();
}
export function getOrders(id) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === id) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}
