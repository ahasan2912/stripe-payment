import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h1>✅ Payment Successful</h1>
            <p>Thank you! Your payment has been completed successfully.</p>

            <Link to="/">
                <button style={{ marginTop: "20px", padding: "10px 20px" }}>
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default Success;