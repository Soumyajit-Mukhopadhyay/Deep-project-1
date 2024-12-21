// Cart functionality
let cart = [];

// Add event listener for 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const product = this.dataset.product;
    const price = parseFloat(this.dataset.price);

    // Find if the item already exists in the cart and update quantity if so
    let itemIndex = cart.findIndex(item => item.product === product);
    
    if (itemIndex !== -1) {
      // Item already exists in the cart, increase its quantity
      cart[itemIndex].quantity += 1;
    } else {
      // Add new item to the cart with quantity 1
      cart.push({ product, price, quantity: 1 });
    }

    // Update cart count (number of items in the cart)
    document.getElementById('cart-count').textContent = cart.length;

    // Update cart items in the modal
    updateCartModal();
  });
});

// Open the cart modal
document.getElementById('cart-button').addEventListener('click', function() {
  document.getElementById('cart-modal').style.display = 'block';
});

// Close the cart modal
document.getElementById('close-cart').addEventListener('click', function() {
  document.getElementById('cart-modal').style.display = 'none';
});

// Function to update the cart modal
function updateCartModal() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  
  // Clear previous items in the modal
  cartItemsDiv.innerHTML = '';
  let total = 0;

  // Add items to modal and display their index, quantity, and total
  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      ${index + 1}. ${item.product} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.quantity; // Update total
  });

  // Update the total in the cart modal
  cartTotalSpan.textContent = total.toFixed(2);
}

// Handle the checkout process
document.querySelector('.checkout-button').addEventListener('click', function() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add products to your cart before proceeding.");
    return;
  }

  // Store cart data in localStorage for use on the payment page
  localStorage.setItem('cartData', JSON.stringify(cart));

  // Redirect to payment page
  window.location.href = "payment.html"; // Redirect to the payment page
});
