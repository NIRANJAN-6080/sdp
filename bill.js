/**
 * Product Billing System - Dr. Emmanuel Joy
 * Experiment 10 (Robust JS Variables & DOM Calculation)
 */

// 1. Constants
const TAX_RATE = 0.18; // 18% GST

// 2. Main Calculation Function
function calculateNetTotal() {
    // Initialize dynamic numerical variables
    let subtotal = 0;

    // Fetch all table rows containing product data
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach((row, index) => {
        // Read price cell text and clean non-numeric characters (currency, commas)
        const priceText = row.children[2].innerText;
        const cleanedPrice = priceText.replace(/[^0-9.]/g, ''); 
        const price = parseFloat(cleanedPrice) || 0;

        // Fetch quantity input value
        const qtyInput = row.querySelector('.quantity-input');
        let quantity = parseFloat(qtyInput.value);

        // Sanitize negative or empty inputs
        if (isNaN(quantity) || quantity < 0) {
            quantity = 0;
            qtyInput.value = 0;
        }

        // Calculate line item total
        const itemTotal = price * quantity;
        subtotal += itemTotal;

        // Update Item Total cell in the DOM
        row.children[4].innerText = itemTotal.toFixed(2);
    });

    // 3. Compute Tax and Net Total
    const taxAmount = subtotal * TAX_RATE;
    const netTotal = subtotal + taxAmount;

    // 4. Update Summary UI Elements safely
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = taxAmount.toFixed(2);
    document.getElementById('grandTotal').innerText = netTotal.toFixed(2);
}

// 5. Attach Event Listeners for Live Auto-Calculation
document.addEventListener('DOMContentLoaded', () => {
    // Attach listener to Calculate button
    const calcBtn = document.getElementById('calculateBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateNetTotal);
    }

    // Attach 'input' event to all quantity fields for real-time recalculation
    const qtyInputs = document.querySelectorAll('.quantity-input');
    qtyInputs.forEach(input => {
        input.addEventListener('input', calculateNetTotal);
    });

    // Run baseline calculation on load
    calculateNetTotal();
});