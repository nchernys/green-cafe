const myCartLocal = JSON.parse(localStorage.getItem("cart"));
updateCart();

function addToCart(id) {
  let getCart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemFound = false;

  getCart.forEach((itemCart) => {
    if (itemCart.id === id) {
      itemCart.quantity += 1;
      console.log(itemCart);
      cartItemFound = true;
    }
  });
  if (!cartItemFound) {
    menu.forEach((item) => {
      if (item.id === id) {
        getCart.push(item);
      }
    });
  }

  localStorage.setItem("cart", JSON.stringify(getCart));
  updateCart();
}

function updateCart() {
  let cartNo = 0;
  const getCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNav = document.querySelectorAll(".cart-nav-no");
  getCart.forEach((item) => {
    cartNo += item.quantity;
  });
  cartNav.forEach((i) => {
    i.innerText = `${cartNo}`;
  });
}

function cartPopulate() {
  updateCart();
  const cartSum = document.getElementById("cartList");
  cartSum.innerHTML = "";
  const myCartLocal = JSON.parse(localStorage.getItem("cart"));
  if (myCartLocal.length === 0) {
    cartSum.innerHTML += `
        <tr><td class="cart-desc">Your cart is empty... </td></tr>`;
  }
  console.log(myCartLocal);
  myCartLocal.forEach((cartItem) => {
    cartSum.innerHTML += `
                <tr> <td class="cart-img"><div id="cart-img-frame"><img src="${cartItem.image}" alt=""> </div></td> 
                    <td class="cart-desc">${cartItem.description}</td> 
                    <td class="cart-price"> $${cartItem.price} </td>
                    <td class="cart-quantity">
                    <div class="cart-wrap-counter">
                    <div id="minus" onclick="deductQuantity(${cartItem.id})">-</div> 
                    <div id="showQuantity-${cartItem.id}"> ${cartItem.quantity} </div> 
                    <div id="plus" onclick="addQuantity(${cartItem.id})">+</div>
                    </div> <br>
                    <div class='remove-item' onclick="removeFromCart(${cartItem.id})">Remove</div></td>
                </tr>
                `;
  });
  updateSubTotal();
}

function addQuantity(id) {
  const myCartLocal = JSON.parse(localStorage.getItem("cart"));
  myCartLocal.forEach((cartItem) => {
    if (cartItem.id === id) {
      cartItem.quantity += 1;
      document.getElementById(`showQuantity-${id}`).innerText =
        cartItem.quantity;
    }
  });
  localStorage.setItem("cart", JSON.stringify(myCartLocal));

  updateSubTotal();
}

function deductQuantity(id) {
  const myCartLocal = JSON.parse(localStorage.getItem("cart"));
  myCartLocal.forEach((cartItem) => {
    if (cartItem.id === id) {
      cartItem.quantity -= 1;
      if (cartItem.quantity <= 1) {
        cartItem.quantity = 1;
      }
      document.getElementById(`showQuantity-${id}`).innerText =
        cartItem.quantity;
    }
  });
  localStorage.setItem("cart", JSON.stringify(myCartLocal));
  updateSubTotal();
}

function removeFromCart(id) {
  const updateCart = [];
  const getCart = JSON.parse(localStorage.getItem("cart"));
  getCart.forEach((item) => {
    if (item.id !== id) {
      updateCart.push(item);
    }
  });

  localStorage.setItem("cart", JSON.stringify(updateCart));
  cartPopulate();
}

function updateSubTotal() {
  let cartSubTotal = 0;
  const myCartLocal = JSON.parse(localStorage.getItem("cart"));
  myCartLocal.forEach((cartItem) => {
    cartSubTotal += cartItem.price * cartItem.quantity;
  });
  const calcCartSubtotal = document.getElementById("cart-subtotal");
  calcCartSubtotal.innerText = cartSubTotal;
  const checkTip = JSON.parse(localStorage.getItem("tip")) || 0;
  addTip(checkTip);
}

function addTip(tip) {
  localStorage.setItem("tip", JSON.stringify(tip));
  const selectTip = document.querySelector(".tip-btn-group-options");
  selectTip.style.display = "none";
  const tipHeader = document.querySelector(".tip-btn-header");
  tipHeader.innerHTML = `${tip}%`;
  calcTotal(tip);
}

function calcTotal(tip) {
  updateCart();
  const calcCartSubtotal = document.getElementById("cart-subtotal");
  const yourTip = (parseInt(calcCartSubtotal.innerText) * tip) / 100;
  const calcCartTotal = document.getElementById("cart-total");
  calcCartTotal.innerText = parseInt(calcCartSubtotal.innerText) + yourTip;
}

function selectTip() {
  const selectTip = document.querySelector(".tip-btn-group-options");
  if (selectTip.style.display === "none") {
    selectTip.style.display = "block";
  } else {
    selectTip.style.display = "none";
  }
}
