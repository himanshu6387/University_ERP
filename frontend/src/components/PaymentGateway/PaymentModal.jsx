import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, donationData, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      if (paymentMethod === 'razorpay') {
        // Simulate Razorpay payment
        setTimeout(() => {
          onPaymentSuccess({
            ...donationData,
            paymentId: 'pay_' + Date.now(),
            status: 'completed'
          });
          onClose();
          setIsProcessing(false);
        }, 2000);

      } else if (paymentMethod === 'stripe') {
        // Simulate Stripe payment
        setTimeout(() => {
          onPaymentSuccess({
            ...donationData,
            paymentId: 'stripe_' + Date.now(),
            status: 'completed'
          });
          onClose();
          setIsProcessing(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-5 z-50">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Complete Your Donation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
            ×
          </button>
        </div>

        {/* Payment Summary */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <strong className="text-xl text-gray-900">₹{donationData.amount?.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purpose:</span>
              <strong className="text-gray-900 capitalize">{donationData.purpose}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <strong className="text-gray-900 capitalize">{donationData.donationType}</strong>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">Select Payment Method</h4>
          
          <div className="space-y-3">
            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                    R
                  </div>
                  <span className="font-medium text-gray-900">Razorpay (UPI, Cards, Net Banking)</span>
                </div>
              </label>
            </div>

            <div className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'stripe' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                    S
                  </div>
                  <span className="font-medium text-gray-900">Stripe (International Cards)</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 p-6 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePayment} 
            disabled={isProcessing}
            className="flex-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 py-3 px-6 rounded-xl font-bold hover:from-orange-400 hover:to-yellow-500 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${donationData.amount?.toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;