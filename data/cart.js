export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export let cartQuantity = cartQuantityCalc();

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
      quantity: quantityAdded,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}


export function removeFromCart(productId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.id === productId) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        cart.splice(index ,1);
      }
    }
  });
  saveToStorage();
}


export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function cartQuantityCalc() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}