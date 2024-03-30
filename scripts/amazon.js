let productsHTML = '';



products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
     $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart added-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary" 
    data-id="${product.id}">
      Add to Cart
    </button>
  </div>
  `;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

let intervalId;

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      clearInterval(intervalId);

      const id = (button.dataset['id']);
      
      const quantitySelected = document.querySelector(`.quantity-selector-${id}`);

      quantityAdded = Number(quantitySelected.value);


      let matchingItem;

      cart.forEach((item) => {
        if (id === item.id) {
          matchingItem = item;
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

      let cartQuantity = 0;

      cart.forEach((item) =>{
        cartQuantity += item.quantity;
      });

      document.querySelector(`.added-${id}`).classList.add('added-visible');

      intervalId = setTimeout(() => {
        document.querySelector(`.added-${id}`).classList.remove('added-visible');
      }, 2000);

      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    });
  });