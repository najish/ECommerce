// components/UPIQRCode.jsx
import React from 'react';
import QRCode from 'react-qr-code'; // ✅ ESM-compatible QR component

const UPIQRCode = ({ upiId, payeeName, amount }) => {
  if (!upiId || !payeeName || !amount) return null;

  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Scan to Pay via UPI</h3>
      <QRCode value={upiUrl} size={200} />
      <p>
        <strong>Payee:</strong> {payeeName} <br />
        <strong>UPI ID:</strong> {upiId} <br />
        <strong>Amount:</strong> ₹{amount}
      </p>
    </div>
  );
};

export default UPIQRCode;
