// script.js
document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('payButton');
    const paymentStatus = document.getElementById('paymentStatus');
    const paymentSuccess = document.getElementById('paymentSuccess');
    const orderIdSpan = document.getElementById('orderId');
    const transactionIdSpan = document.getElementById('transactionId');
    const enableSmsButton = document.getElementById('enableSmsButton');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const smsStatus = document.getElementById('smsStatus');
    const confirmedNumber = document.getElementById('confirmedNumber');

    let orderId = generateOrderId();
    orderIdSpan.textContent = orderId;

    payButton.addEventListener('click', function() {
        // Generate UPI deep link
        const upiLink = generateUPILink(orderId);
        
        // Open UPI app
        window.location.href = upiLink;
        
        // Show payment pending status
        payButton.style.display = 'none';
        paymentStatus.classList.remove('hidden');
        
        // Simulate payment confirmation after 5 seconds
        setTimeout(() => {
            simulatePaymentConfirmation();
        }, 5000);
    });

    enableSmsButton.addEventListener('click', function() {
        const mobile = mobileNumberInput.value.trim();
        if (mobile && mobile.length === 10 && /^\d+$/.test(mobile)) {
            confirmedNumber.textContent = mobile;
            smsStatus.classList.remove('hidden');
            mobileNumberInput.disabled = true;
            enableSmsButton.disabled = true;
            enableSmsButton.textContent = 'SMS Enabled';
            
            // Simulate SMS confirmation
            setTimeout(() => {
                alert('SMS Confirmation: Payment of ₹1.00 received for Order ' + orderId);
            }, 6000);
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    });

    function generateOrderId() {
        return 'ORDER' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    function generateUPILink(orderId) {
        // Using example merchant details
        const pa = 'merchant@bank'; // Payee address (merchant UPI ID)
        const pn = 'MerchantName'; // Payee name
        const am = '1.00'; // Amount
        const cu = 'INR'; // Currency
        const tn = orderId; // Transaction note
        
        return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=${cu}&tn=${tn}`;
    }

    function simulatePaymentConfirmation() {
        // Simulate success (in real implementation, this would check actual payment status)
        paymentStatus.classList.add('hidden');
        paymentSuccess.classList.remove('hidden');
        transactionIdSpan.textContent = 'TXN' + Date.now();
    }
});