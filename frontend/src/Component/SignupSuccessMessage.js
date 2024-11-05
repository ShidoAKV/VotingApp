// SignupSuccessMessage.js
import React from 'react';

function SignupSuccessMessage({ onDismiss }) {
    return (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-green-200 dark:text-green-900" role="alert">
            Signup successful! Welcome to our community.
            <button onClick={onDismiss} className="ml-4 text-blue-500 hover:underline">Dismiss</button>
        </div>
    );
}

export default SignupSuccessMessage;
