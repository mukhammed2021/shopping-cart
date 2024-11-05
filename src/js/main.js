import "../scss/style.scss";

const products = [
   {
      id: 1,
      src: "images/leather-jacket.webp",
      title: "Leather Jacket",
      quantity: 1,
      price: 199,
   },
   {
      id: 2,
      src: "images/baseball-cap.jpeg",
      title: "Baseball Cap",
      quantity: 1,
      price: 20,
   },
   {
      id: 3,
      src: "images/denim-jeans.jpg",
      title: "Denim Jeans",
      quantity: 1,
      price: 97,
   },
   {
      id: 4,
      src: "images/sunglasses.webp",
      title: "Sunglasses",
      quantity: 1,
      price: 120,
   },
   {
      id: 5,
      src: "images/t-shirt.jpg",
      title: "T-Shirt",
      quantity: 1,
      price: 77,
   },
   {
      id: 6,
      src: "images/sneakers.jpg",
      title: "Sneakers",
      quantity: 1,
      price: 57,
   },
];

let cart = [];

const cartItems = document.querySelector(".cart__items");
const cartEmptyText = document.querySelector(".cart__text");

function displayProducts() {
   const productsItems = document.querySelector(".products__items");
   const productsHTML = products
      .map(
         ({ id, title, price, src }) =>
            `
               <article id=${id} class="products__item item-product">
                  <div class="item-product__image">
                     <img src="${src}" width="200" height="200" alt="${title}" class="ibg" />
                  </div>
                  <h4 class="item-product__title">${title}</h4>
                  <p class="item-product__price">$${price}</p>
                  <button type="button" class="item-product__button button">Add to Cart</button>
               </article>
            `
      )
      .join("");
   productsItems.innerHTML = productsHTML;
}
displayProducts();

products.forEach((product) => {
   const productItem = document.getElementById(product.id);
   const productBtn = productItem.querySelector(".item-product__button");
   productBtn.addEventListener("click", () => {
      isInCart(product, product.id);
   });
});

function isInCart(product, id) {
   const isInCart = cart.find((product) => product.id === id);

   if (!isInCart) {
      cart.push(product);
      addToCart();
   } else {
      incrementCartItem(isInCart.id);
   }
}

function addToCart() {
   updateCart();
}

function updateCart() {
   if (cart.length) {
      cartEmptyText.innerText = "";
   } else {
      cartEmptyText.innerText = "Your cart is empty";
   }

   const cartItemHTML = cart
      .map(
         (product) =>
            `
            <div data-id="${product.id}" class="item-cart">
               <div class="item-cart__info">
                  <h3 class="item-cart__title">${product.title}</h3>
                  <p class="item-cart__price">$<span>${product.price}</span></p>
               </div>
               <div class="item-cart__actions">
                  <div class="item-cart__quantity-block">
                     <button type="button" class="item-cart__button item-cart__button--minus">
                        <svg class="svg-icon">
                           <use xlink:href="#minus"></use>
                        </svg>
                     </button>
                     <span class="item-cart__quantity">${product.quantity}</span>
                     <button type="button" class="item-cart__button item-cart__button--plus">
                        <svg class="svg-icon">
                           <use xlink:href="#plus"></use>
                        </svg>
                     </button>
                  </div>
                  <button type="button" class="item-cart__button item-cart__button--delete">
                     <svg class="svg-icon">
                        <use xlink:href="#x"></use>
                     </svg>
                  </button>
               </div>
            </div>
         `
      )
      .join("");
   cartItems.innerHTML = cartItemHTML;

   cart.forEach((product) => {
      const itemCart = document.querySelector(`[data-id="${product.id}"]`);
      const incButton = itemCart.querySelector(".item-cart__button--plus");
      const decButton = itemCart.querySelector(".item-cart__button--minus");
      const deleteButton = itemCart.querySelector(".item-cart__button--delete");
      incButton.addEventListener("click", () => incrementCartItem(product.id));
      decButton.addEventListener("click", () => decrementCartItem(product.id));
      deleteButton.addEventListener("click", () => deleteCartItem(product.id));
   });

   displayTotalPrice();
}

function displayTotalPrice() {
   const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
   }, 0);

   let totalPriceHTML = document.querySelector(".cart__total-price span");
   totalPriceHTML.innerText = totalPrice;
}

function incrementCartItem(id) {
   cart.forEach((product) => {
      if (product.id === id) {
         product.quantity++;
         updateCart();
      }
   });
}

function decrementCartItem(id) {
   cart.forEach((product) => {
      if (product.id === id) {
         if (product.quantity === 1) {
            return;
         }
         product.quantity--;
         updateCart();
      }
   });
}

function deleteCartItem(id) {
   cart.forEach((product) => {
      if (product.id === id) {
         product.quantity = 1;
      }
   });
   cart = cart.filter((product) => product.id !== id);
   updateCart();
}
