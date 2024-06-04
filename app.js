const CART_ITEMS_CONTAINER = document.getElementById("cart__items__container");
const DISPLAY_CART_TOTAL = document.getElementById("display__cart__total");
const CHECK_OUT_BTN = document.getElementById("check__out__btn");

class product {
  constructor(
    product_id,
    product_name,
    product_image,
    product_price,
    product_quantity
  ) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.product_image = product_image;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
  }
}

// an instance of the shopping
class shoppingCartItem {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  // a method to display cart items

  display_cart_items() {
    let product_to_display = [];

    for (let i = 0; i < this.cartItems.length; i++) {
      const cart_product = ` <!-- single cart product -->
          <div class="flex justify-between items-center shadow-md p-5">
            <div class="flex items-center gap-4">
              <img
                src=${this.cartItems[i].product_image}
                alt="product image"
                class="w-40 rounded-md"
              /> 
              <div>
                <h2 class="font-bold text-3xl">${this.cartItems[i].product_name}</h2>
                <button
                  class="delete__item bg-red-500 text-white font-semibold p-2 rounded-md mt-2"

                   id=${this.cartItems[i].product_id}
                >
                  Delete
                </button>
              </div>
            </div>

            <div class="text-center">
              <p class="font-bold text-xl">${this.cartItems[i].product_price}</p>
              <button
                class="increase__product__quantity  bg-green-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
               id=${this.cartItems[i].product_id}
              >
                +
              </button>
              <span class="font-bold text-lg">${this.cartItems[i].product_quantity}</span>
              <button
                class="decrease__product__quantity bg-red-500 text-white text-lg font-semibold p-2 rounded-md mt-2"
                id=${this.cartItems[i].product_id}
              >
                -
              </button>
            </div>
          </div>
          <!-- single cart product ends here -->`;

      product_to_display.push(cart_product);
    }

    if (product_to_display.length === 0) {
      CART_ITEMS_CONTAINER.innerHTML = `<h1 class="text-center text-3xl font-semibold">Cart is empty please add product 🥲🥲</h1>`;
      // DISPLAY_CART_TOTAL.textContent = 0;
      return;
    }

    CART_ITEMS_CONTAINER.innerHTML = product_to_display.join(" ");
    // increase quantity button
    const increaseProductQuantityBTN = document.querySelectorAll(
      ".increase__product__quantity"
    );
    increaseProductQuantityBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        console.log(productID);
        this.increaseProductQuantity(productID);
      });
    });
    // increase quantity button ends here

    // decrease quantity button starts here
    const decreaseProductQuantityBTN = document.querySelectorAll(
      ".decrease__product__quantity"
    );
    decreaseProductQuantityBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        console.log(productID);
        this.decreaseProductQuantity(productID);
      });
    });
    // decrease quantity button ends here

    // delete item button starts here
    const deleteItemBTN = document.querySelectorAll(".delete__item");
    deleteItemBTN.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        let productID = parseInt(event.target.getAttribute("id"));
        console.log(productID);
        this.removeItemFromCart(productID);
      });
    });
    // delete item button ends here
  }
  // a method to display cart items ends here

  // method to increase product quantity
  increaseProductQuantity(productID) {
    for (let i = 0; i < this.cartItems.length; i++) {
      // check for the product that was click
      if (this.cartItems[i].product_id === productID) {
        this.cartItems[i].product_quantity++;
      }
    }

    this.calculateCartTotal();
    this.display_cart_items();
  }
  // method to increase product quantity ends here

  // a method to decrease product quantity
  decreaseProductQuantity(productID) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (
        this.cartItems[i].product_id === productID &&
        this.cartItems[i].product_quantity != 1
      ) {
        this.cartItems[i].product_quantity--;
      }
    }
    this.calculateCartTotal();
    this.display_cart_items();
  }

  // a method to decrease product quantity ends here

  // a method to remove product from cart start here
  removeItemFromCart(productID) {
    const productsLeftInCart = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product_id !== productID) {
        productsLeftInCart.push(this.cartItems[i]);
      }
    }
    this.cartItems = productsLeftInCart;
    this.display_cart_items();
    this.calculateCartTotal();
  }
  // a method to remove product from cart ends here

  // a method to calculate cart total starts here
  calculateCartTotal() {
    let totalCost = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCost =
        totalCost +
        this.cartItems[i].product_price * this.cartItems[i].product_quantity;
      DISPLAY_CART_TOTAL.textContent = totalCost;
    }
    return totalCost;
  }
  // a method to calculate cart total ends here
}

let cartItems = [
  new product(
    1,
    "Samsung",
    "https://th.bing.com/th/id/R.00f0eb654b5f202b6156cd4f37437f78?rik=a3d6Tyo5aYH9TA&pid=ImgRaw&r=0",
    2000,
    1
  ),

  new product(
    2,
    "Iphone 12",
    "https://th.bing.com/th/id/OIP.-22fs7W_R-MVukHjyGOq1AHaEx?rs=1&pid=ImgDetMain",
    5000,
    1
  ),

  new product(
    3,
    "Tecno Pop 2",
    "https://th.bing.com/th/id/OIP.b8RtZPhsoqNnFbpT0eZTXAHaHa?rs=1&pid=ImgDetMain",
    10000,
    1
  ),

  new product(
    4,
    "Infinix hot 5",
    "https://th.bing.com/th/id/OIP.Nuvc-slbqHCH0l169HCt_AHaHa?rs=1&pid=ImgDetMain",
    5000,
    1
  ),

  new product(
    5,
    "Oppo A5",
    "https://th.bing.com/th/id/R.b4b12bd39f278242c3a1201fce360bb2?rik=idzKC3GG3bCEcQ&pid=ImgRaw&r=0",
    25000,
    1
  ),
];

// create an instance of the shopping  cart
const customerShoppingCart = new shoppingCartItem(cartItems);
customerShoppingCart.display_cart_items();
customerShoppingCart.calculateCartTotal();

CHECK_OUT_BTN.addEventListener("click", handleCheckOut);
function handleCheckOut() {
  console.log(customerShoppingCart);
  console.log(customerShoppingCart.calculateCartTotal());
}
