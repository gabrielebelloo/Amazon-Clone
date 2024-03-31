export const cart = [];

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