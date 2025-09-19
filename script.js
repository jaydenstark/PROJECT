document.addEventListener('DOMContentLoaded', () => {
    const redirectBtn = document.getElementById('redirect-btn');
    if (redirectBtn) {
        redirectBtn.addEventListener('click', function() {
            window.location.href = 'store.html';
        });
    }

    // Initialize cart count from localStorage
    function updateCartCount() {
        const cartCountElem = document.getElementById('cart-count');
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        let totalCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        if (cartCountElem) {
            cartCountElem.textContent = totalCount;
        }
    }

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElem = button.closest('.product');
            const productId = productElem.getAttribute('data-id');
            const productName = productElem.querySelector('h2').textContent.trim();
            const productPrice = parseFloat(productElem.getAttribute('data-price'));
            const productImage = productElem.querySelector('img').getAttribute('src');
            const quantityInput = productElem.querySelector('.quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

            let cart = JSON.parse(localStorage.getItem('cart')) || {};

            if (cart[productId]) {
                cart[productId].quantity += quantity;
            } else {
                cart[productId] = {
                    name: productName,
                    price: productPrice,
                    quantity: quantity,
                    image: productImage
                };
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        });
    });

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalQuantityElem = document.getElementById('total-quantity');
        const totalPriceElem = document.getElementById('total-price');
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        console.log('Cart data loaded:', cart);
        cartItemsContainer.innerHTML = '';

        let totalQuantity = 0;
        let totalPrice = 0;

        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const item = cart[productId];
                if (!item.image) {
                    item.image = 'images/signal logo.png'; // Default image for items without image
                }
                totalQuantity += item.quantity;
                totalPrice += item.price * item.quantity;

            const cartItemElem = document.createElement('div');
            cartItemElem.className = 'cart-item';

            cartItemElem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ₵${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <label>Quantity:</label>
                    <input type="number" min="1" value="${item.quantity}" data-id="${productId}" class="quantity-input" />
                </div>
                <div class="cart-item-total-price">₵${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" data-id="${productId}">Remove</button>
            `;

                cartItemsContainer.appendChild(cartItemElem);
            }
        }

        if (totalQuantityElem) {
            totalQuantityElem.textContent = totalQuantity;
        }
        if (totalPriceElem) {
            totalPriceElem.textContent = totalPrice.toFixed(2);
        }

        // Add event listeners for quantity change
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                let newQuantity = parseInt(e.target.value);
                if (newQuantity < 1) {
                    newQuantity = 1;
                    e.target.value = 1;
                }
                cart[id].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
            });
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                delete cart[id];
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                updateCartCount();
            });
        });
    }

    // Update cart count on page load
    updateCartCount();
    renderCartItems();
});
