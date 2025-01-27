import React from "react";

const Snackbar = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "green",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
            }}
        >
            {message}
            <button
                style={{
                    marginLeft: "20px",
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                }}
                onClick={onClose}
            >
                ✖
            </button>
        </div>
    );
};
export default Snackbar
