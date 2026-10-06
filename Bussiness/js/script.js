


let cart = [];
let deliveryFee = 1500;

function addToCart(name, price) {
  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name == name) {
      cart[i].qty = cart[i].qty + 1;
      found = true;
    }
  }

  if (found == false) {
    cart.push({ name: name, price: price, qty: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  let totalQty = 0;
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQty = totalQty + cart[i].qty;
    subtotal = subtotal + (cart[i].price * cart[i].qty);
  }

  // 1. Update the small number in header
  document.getElementById("cartNumber").innerHTML = totalQty;
  // 2. Update the number inside modal
  document.getElementById("modalCartCount").innerHTML = totalQty;
  document.getElementById("subtotalCount").innerHTML = totalQty;

  document.getElementById("subtotalPrice").innerHTML = "₦" + subtotal.toLocaleString();
  document.getElementById("totalPrice").innerHTML = "₦" + (subtotal + deliveryFee).toLocaleString();

  // 3. Draw items inside cart
  let container = document.getElementById("cartItemsContainer");
  container.innerHTML = "";

  if (cart.length == 0) {
    container.innerHTML = "<p style='text-align:center; padding:20px;'>Cart is empty</p>";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    container.innerHTML +=
      "<div class='cart-item'>" +
        "<div><b>" + cart[i].name + "</b><br>₦" + cart[i].price + " x " + cart[i].qty + "</div>" +
        "<div><button onclick='changeQty(" + i + ", -1)'>-</button> " + cart[i].qty + " <button onclick='changeQty(" + i + ", 1)'>+</button></div>" +
        "<div>₦" + (cart[i].price * cart[i].qty) + "</div>" +
        "<button onclick='removeItem(" + i + ")'>🗑️</button>" +
      "</div>";
  }
}

function changeQty(index, change) {
  cart[index].qty = cart[index].qty + change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function openCart() {
  document.getElementById("cartModal").classList.add("active");
  updateCartUI();
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
}

function orderViaWhatsApp() {
  if (cart.length == 0) {
    alert("Your cart is empty!");
    return;
  }
  let phone = "+2349158529896"; // change to your real number
  let msg = "Hello, I want to order:%0A";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let t = cart[i].price * cart[i].qty;
    total = total + t;
    msg += (i+1) + ". " + cart[i].name + " x" + cart[i].qty + " = N" + t + "%0A";
  }
  msg += "%0ASubtotal: N" + total + "%0ADelivery: N" + deliveryFee + "%0ATOTAL: N" + (total+deliveryFee);
  window.open("https://wa.me/" + phone + "?text=" + msg, "_blank");
}
function openMenu() {
  document.getElementById("sideBar").classList.add("active");
  document.getElementById("backMenu").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideBar").classList.remove("active");
  document.getElementById("backMenu").classList.remove("active");
}