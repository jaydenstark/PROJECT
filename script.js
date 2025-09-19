document.getElementById('redirect-btn').addEventListener('click', function() {
    window.location.href = 'store.html';
});

// Initialize cart count from localStorage
function updateCartCount() {
    const cartCountElem = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalCount = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    cartCountElem.textContent = totalCount;
}

// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElem = button.closest('.product');
        const productId = productElem.getAttribute('data-id');
        const productName = productElem.getAttribute('data-name');
        const productPrice = parseFloat(productElem.getAttribute('data-price'));
        const quantityInput = productElem.querySelector('.quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        let cart = JSON.parse(localStorage.getItem('cart')) || {};

        if (cart[productId]) {
            cart[productId].quantity += quantity;
        } else {
            cart[productId] = {
                name: productName,
                price: productPrice,
                quantity: quantity
            };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
