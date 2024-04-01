// Gets cart objects from localStorage or creates one
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Total cart quantity
export let cartQuantity = cartQuantityCalc();

// Adds item to cart
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

// Removes item from cart
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

// Saves cart in localStorage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Calculates cart's total quantity
export function cartQuantityCalc() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

// Updates cart's delivery options
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}