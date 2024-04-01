import {cart, removeFromCart, cartQuantityCalc, saveToStorage, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js'


let checkoutHTML = '';


// Renders the cart Summary
export function renderCartSummary() {
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

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

  
    checkoutHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `
  });


  // Update new generated HTML
  document.querySelector('.order-summary').innerHTML = checkoutHTML;


  // Event listener for clicking on the Delete button
  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderCartSummary(cart);
    });
  });


  // Event listener for clicking on the Update button
  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.update-${productId}`).classList.add('disappear');
      document.querySelector(`.edit-${productId}`).classList.add('is-editing-quantity');
    });
  });


  // Event Listener for clicking on save button for quantity field
  document.querySelectorAll('.save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      updateCartQuantity(link.dataset.productId);
    });
  });

  // Event Listener for pressing Enter on quantity field
  document.querySelectorAll('.quantity-input').forEach((link) => {
    link.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        updateCartQuantity(link.dataset.productId);
      }
    })
  });


  // Event Listener for delivery option buttons
  document.querySelectorAll('.delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartSummary(cart);
    });
  });
}


// Delivery Options Generatorion
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html +=`
    <div class="delivery-option"
        data-product-id='${matchingProduct.id}'
        data-delivery-option-id='${deliveryOption.id}'>
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
    </div>
    `;
  });

  return html;
}


// Update Cart Quantity Function
function updateCartQuantity(productId) {
  const quantityUpdate = Number(document.querySelector(`.input-${productId}`).value);

  document.querySelector(`.update-${productId}`).classList.remove('disappear');
  document.querySelector(`.edit-${productId}`).classList.remove('is-editing-quantity');

  if (quantityUpdate < 0 || quantityUpdate > 999) {
    alert('Quantity not allowed!')
    return;
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

