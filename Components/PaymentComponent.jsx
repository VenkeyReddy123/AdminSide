// PaymentComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card

    const handlePaymentInitiation = () => {
        alert('ss')
        axios.post('http://127.0.0.1:8000/api/initiate-payment/', { method: paymentMethod })
            .then(response => {
                const { data } = response;
                setPaymentData(data);
            })
            .catch(error => {
                console.error('Error initiating payment:', error);
            });
    };

    return (
        <div>
            <div>
                <label>
                    <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    Card
                </label>
                <label>
                    <input type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                    UPI
                </label>
                <label>
                    <input type="radio" name="paymentMethod" value="qr" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} />
                    QR Code
                </label>
                <label>
                    <input type="radio" name="paymentMethod" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                    Net Banking
                </label>
            </div>
            <button onClick={handlePaymentInitiation}>Initiate Payment</button>
            {paymentData && (
                <div>
                    <p>Payment ID: {paymentData.id}</p>
                    <p>Amount: {paymentData.amount}</p>
                    <p>Currency: {paymentData.currency}</p>
                   
                </div>
            )}
        </div>
    );
};

export default PaymentComponent;
