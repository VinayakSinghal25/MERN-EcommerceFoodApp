import React from 'react';

const TermsAlertModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg p-6 shadow-lg z-10">
                <h2 className="text-lg font-bold mb-4">Alert</h2>
                <p className="mb-4">Please accept the Terms and Conditions to proceed.</p>
                <button 
                    onClick={onClose} 
                    className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default TermsAlertModal;