import React, { useState } from 'react';

const NGOotp = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('api/NGOAuth/NGOverifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        // Handle success
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={handleChange} required />
        </div>
        <button type="submit">Verify OTP</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default NGOotp;
