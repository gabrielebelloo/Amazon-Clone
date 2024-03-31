import {cart, removeFromCart, cartQuantityCalc, saveToStorage} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let checkoutHTML = '';

renderCartSummary(cart);


function renderCartSummary(cart) {
  let cartQuantity = cartQuantityCalc();
  document.querySelector('.return-to-home-link').innerHTML = `${cartQuantity} item`

  checkoutHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.id;
  
    let matchingProduct;
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });
  
    checkoutHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>
  
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
  
        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary update-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <div style="display: inline;" class="div-edit-quantity edit-${matchingProduct.id}">
              <input class="quantity-input input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            </div>
            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
  
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  });

  document.querySelector('.order-summary').innerHTML = checkoutHTML;

  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderCartSummary(cart);
    });
  });

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.update-${productId}`).classList.add('disappear');
      document.querySelector(`.edit-${productId}`).classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      updateCart(link.dataset.productId);
    });
  });

  document.querySelectorAll('.quantity-input').forEach((link) => {
    link.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        updateCart(link.dataset.productId);
      }
    })
  });
}


function updateCart(productId) {
  const quantityUpdate = Number(document.querySelector(`.input-${productId}`).value);

  document.querySelector(`.update-${productId}`).classList.remove('disappear');
  document.querySelector(`.edit-${productId}`).classList.remove('is-editing-quantity');

  if (quantityUpdate < 0 || quantityUpdate > 999) {
    alert('Quantity not allowed!')
    return
  }

  cart.forEach((cartItem, index) => {
    if (cartItem.id === productId) {
      if (quantityUpdate === 0) {
        cart.splice(index, 1);
      } else {
        cartItem.quantity = quantityUpdate;
      }
      
    }
  });

  saveToStorage();
  renderCartSummary(cart);
}

