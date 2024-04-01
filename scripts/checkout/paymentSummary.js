import { cart } from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { cartQuantityCalc } from "../../data/cart.js";


let paymentHTML = '';


// Renders the Payment Summary
export function renderPaymentSummary() {

  let cartQuantity = cartQuantityCalc();

  // Calculate total price of order, products and shipping
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach(cartItem => {
      const product = getProduct(cartItem.id);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      
      productPriceCents = productPriceCents + product.priceCents * cartItem.quantity;
      shippingPriceCents = shippingPriceCents + deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    

  // Generate HTML for the payment item
  paymentHTML =
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>
  `;

  // Update new generated HTML
  document.querySelector('.payment-summary').innerHTML = paymentHTML;
}