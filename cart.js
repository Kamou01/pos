let cart = JSON.parse(localStorage.getItem("cart"))

let container = document.querySelector("#cart-items");
        cart.forEach(comic => {
            container.innerHTML += renderCart(comic)
        })

function renderCart(cart) {
    return `       <div class="comic-books">
    <img
      src="${cart.image}"
      alt="pic"
    />
    <h1>${cart.name}</h1>
    <h2>${cart.category}</h2>
    <h3>${cart.description}</h3>
    <h3>${cart.price}</h3>
    <button type="button" class="remove-item" onclick="removeFromCart(${cart.id})">Remove Item</button>
    </div>`
}

console.log(cart)

function removeFromCart(id) {
    cart = JSON.parse(localStorage.getItem("cart"))
    cart = cart.filter(item => item.id != id)
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Item deleted")
    location.reload()
}

function clearCart() {
    localStorage.removeItem("cart")
    alert("Cart cleared")
    location.reload()
}