import React from 'react';
import { Link } from 'react-router-dom';

const Cancle = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h1>❌ Payment Cancelled</h1>
            <p>Your payment was cancelled. You can try again.</p>

            <Link to="/">
                <button style={{ marginTop: "20px", padding: "10px 20px" }}>
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default Cancle;