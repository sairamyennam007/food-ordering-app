
// Food Data
const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 199,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        price: 149,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 249,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 129,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"
    },
    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
    },
    {
        id: 6,
        name: "Chicken Burger",
        category: "Burger",
        price: 179,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500"
    },
    {
        id: 7,
        name: "Veg Biryani",
        category: "Biryani",
        price: 179,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500"
    },
    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    }
];

// Cart
let cart = [];

// Display Food Items
function displayFoods(items) {
    const container = document.getElementById("food-container");

    if (items.length === 0) {
        container.innerHTML = "<p>No food items found.</p>";
        return;
    }

    container.innerHTML = items.map(food => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}"
                 onerror="this.src='https://placehold.co/500x300?text=Food'">

            <div class="food-info">
                <h3>${food.name}</h3>
                <p class="rating">⭐ ${food.rating}</p>

                <div class="food-bottom">
                    <span class="price">₹${food.price}</span>
                    <button class="add-btn"
                        onclick="addToCart(${food.id})">
                        Add +
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(id) {
    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();
}

// Increase or Decrease Quantity
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>

                    <div class="quantity">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <button class="remove-btn"
                        onclick="removeItem(${item.id})">
                        Remove
                    </button>
                </div>

                <strong>₹${item.price * item.quantity}</strong>
            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    document.getElementById("total").textContent = total;
    document.getElementById("cart-count").textContent = count;
}

// Open and Close Cart
function toggleCart() {
    document.getElementById("cart").classList.toggle("open");
    document.getElementById("cart-overlay").classList.toggle("show");
}

// Filter Food by Category
function filterFood(category, button) {
    const filtered = category === "All"
        ? foods
        : foods.filter(food => food.category === category);

    displayFoods(filtered);

    document.querySelectorAll(".categories button")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

// Search Food
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();

    const filtered = foods.filter(food =>
        food.name.toLowerCase().includes(searchValue) ||
        food.category.toLowerCase().includes(searchValue)
    );

    displayFoods(filtered);

    document.querySelectorAll(".categories button")
        .forEach(btn => btn.classList.remove("active"));
});

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Order placed successfully!\n" +
        "Total Amount: ₹" + total +
        "\nThank you for ordering with Foodie!"
    );

    cart = [];
    updateCart();
    toggleCart();
}

// Initial Display
displayFoods(foods);
updateCart();
