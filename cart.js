let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count (sum of quantities)
function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.qty, 0);
    let counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
}

// Add item (with quantity support)
function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    updateCartCount();
}

// Remove item completely
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    renderCart();
    updateCartCount();
}

// Change quantity
function changeQty(name, amount) {
    let item = cart.find(i => i.name === name);

    if (!item) return;

    item.qty += amount;

    if (item.qty <= 0) {
        removeItem(name);
    } else {
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Render cart page
function renderCart() {
    let container = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        let div = document.createElement("div");
        div.style.marginBottom = "15px";

        div.innerHTML = `
            <strong>${item.name}</strong><br>
            $${item.price} x ${item.qty} = $${item.price * item.qty}
            <br>
            <button onclick="changeQty('${item.name}', 1)">+</button>
            <button onclick="changeQty('${item.name}', -1)">-</button>
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;

        container.appendChild(div);

        total += item.price * item.qty;
    });

    if (totalBox) {
        totalBox.innerText = "Total: $" + total;
    }
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
}

// Init
updateCartCount();
renderCart();