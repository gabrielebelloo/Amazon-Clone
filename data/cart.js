export const cart = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1 
}];

export function addToCart(id, quantityAdded) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (id === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantityAdded;
  } else {
    cart.push({
      id,
      quantity: quantityAdded
    });
  }
}