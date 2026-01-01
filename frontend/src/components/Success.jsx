import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';

const Success = () => {
    const [paymentInfo, setPaymentInfo] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const sessionId = query.get("session_id");

        if (sessionId) {
            axiosInstance.get(`/session/${sessionId}`)
                .then(res => setPaymentInfo(res.data));
        }
    }, []);
    return (
        <div>
            <h1>Payment Successful ✅</h1>
            {paymentInfo && (
                <>
                    <p>Payment ID: {paymentInfo.payment_intent}</p>
                    <p>Amount: {paymentInfo.amount_total / 100}</p>
                    <p>Currency: {paymentInfo.currency}</p>
                    <p>Status: {paymentInfo.payment_status}</p>
                </>
            )}
            <Link className='bg-blue-400 p-2 rounded-md mt-10' to='/'>Back Home</Link>
        </div>
    );
};

export default Success;