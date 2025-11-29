// src/components/Popup/Popup.jsx
import React, { useState } from 'react';
import './Popup.css';
import { useNavigate } from 'react-router-dom';
import qr from '../assets/scanner2.jpg'

const Popup = ({ isOpen, onClose }) => {
    const [openQR, setOpenQR] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const forward = () => {
        navigate('/donation');
        onClose();
    };

    const quickDonation = () => {
        setOpenQR(true);
    };

    const closeQR = () => {
        setOpenQR(false);
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="popup-close-btn"
                    aria-label="Close popup"
                >
                    <svg
                        className="close-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Main Content or QR View */}
                {!openQR ? (
                    <div className="popup-content">
                        {/* Header */}
                        <div className="popup-header">
                            <div className="popup-icon">
                                <svg
                                    className="icon"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </div>
                            <h2 className="popup-title">Welcome to MPCT! 🎉</h2>
                            <p className="popup-subtitle">Mahendra Pratap Charitable Trust</p>
                        </div>

                        {/* Body */}
                        <div className="popup-body">
                            <p className="popup-text">
                                Thank you for visiting our website. We are dedicated to social welfare,
                                education, and healthcare for underprivileged communities.
                            </p>
                            <p className="popup-text-small">
                                Join us in making a difference!
                            </p>
                        </div>

                        {/* Footer Section */}
                        <div className="popup-footer-section">
                            {/* Social Media */}
                            <div className="social-section">
                                <p className="follow-title">Follow Us</p>
                                <div className="social-icons">
                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/7081822600"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        style={{ background: "#25D366" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-5.99C.122 5.319 5.5 0 12.061 0c3.184 0 6.167 1.24 8.413 3.488a11.82 11.82 0 013.495 8.414c-.003 6.563-5.383 11.94-11.949 11.94a11.94 11.94 0 01-5.993-1.611L.057 24zM6.403 20.207c1.676.995 3.27 1.591 5.684 1.591 5.448 0 9.886-4.434 9.889-9.878.002-5.462-4.415-9.89-9.881-9.893-5.441 0-9.88 4.434-9.883 9.876 0 2.225.651 3.891 1.746 5.59l-.999 3.648 3.444-.934zm11.654-5.318c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.412.248-.694.248-1.289.173-1.413z" />
                                        </svg>
                                    </a>

                                    {/* YouTube */}
                                    <a
                                        href="https://youtube.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        style={{ background: "#FF0000" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a2.96 2.96 0 00-2.081-2.1C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.417.586A2.96 2.96 0 00.502 6.186 31.067 31.067 0 000 12a31.067 31.067 0 00.502 5.814 2.96 2.96 0 002.081 2.1C4.495 20.5 12 20.5 12 20.5s7.505 0 9.417-.586a2.96 2.96 0 002.081-2.1A31.067 31.067 0 0024 12a31.067 31.067 0 00-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon instagram-gradient"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.35 3.608 1.325.975.975 1.264 2.242 1.326 3.608.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.351 2.633-1.326 3.608-.975.975-2.242 1.264-3.608 1.326-1.265.058-1.645.069-4.849.069s-3.584-.011-4.849-.069c-1.366-.062-2.633-.351-3.608-1.326-.975-.975-1.264-2.242-1.326-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849C2.295 5.785 2.584 4.518 3.559 3.543 4.534 2.568 5.801 2.279 7.167 2.217 8.432 2.159 8.812 2.163 12 2.163zm0 1.838c-3.17 0-3.532.012-4.778.069-1.062.05-1.637.23-2.016.383-.508.197-.87.433-1.255.818-.385.385-.621.747-.818 1.255-.153.379-.333.954-.383 2.016-.057 1.246-.069 1.608-.069 4.778s.012 3.532.069 4.778c.05 1.062.23 1.637.383 2.016.197.508.433.87.818 1.255.385.385.747.621 1.255.818.379.153.954.333 2.016.383 1.246.057 1.608.069 4.778.069s3.532-.012 4.778-.069c1.062-.05 1.637-.23 2.016-.383.508-.197.87-.433 1.255-.818.385-.385.621-.747.818-1.255.153-.379.333-.954.383-2.016.057-1.246.069-1.608.069-4.778s-.012-3.532-.069-4.778c-.05-1.062-.23-1.637-.383-2.016-.197-.508-.433-.87-.818-1.255-.385-.385-.747-.621-1.255-.818-.379-.153-.954-.333-2.016-.383-1.246-.057-1.608-.069-4.778-.069zm0 3.612a5.389 5.389 0 110 10.778 5.389 5.389 0 010-10.778zm0 1.838a3.551 3.551 0 100 7.102 3.551 3.551 0 000-7.102zm4.406-.84a1.26 1.26 0 110 2.52 1.26 1.26 0 010-2.52z" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="social-caption">
                                    Follow the official WhatsApp channel for updates
                                </p>
                            </div>

                            {/* Quick Donate */}
                            <div className="donation-box">
                                <p className="donation-title">Click for Quick Donation</p>
                                <button
                                    className="quick-donate-btn"
                                    onClick={quickDonation}
                                >
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Quick Donate
                                </button>
                            </div>

                            {/* Brochure Download */}
                            <div className="brochure-section">
                                <a
                                    href="/brochure/ESRVS-9F.pdf"
                                    download="SRSV-Brochure.pdf"
                                    className="download-brochure-btn"
                                >
                                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Brochure
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    // QR Code View
                    <div className="qr-container">
                        <button
                            onClick={closeQR}
                            className="back-btn"
                        >
                            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>

                        <div className="qr-content">
                            <div className="qr-header">
                                <svg className="qr-header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="qr-title">Scan to Donate</h3>
                                <p className="qr-subtitle">Support our cause with UPI payment</p>
                            </div>

                            <div className="qr-code-box">
                                {/* Placeholder QR Code - Replace with your actual QR code image */}
                                <div className="qr-placeholder">
                                    {/* <svg className="qr-icon" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm0 8h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm-6-8h2v2h-2V9zm0 4h2v2h-2v-2z"/>
                                    </svg> */}
                                    <img src={qr} alt="" />
                                    <p className="qr-placeholder-text">Your QR Code Here</p>
                                    {/* <p className="qr-instruction-small">Replace this with your actual QR code image</p> */}
                                </div>
                                {/* 
                                To use an actual QR code image, replace the div above with:
                                <img 
                                    src="/path-to-your-qr-code.png" 
                                    alt="Donation QR Code" 
                                    className="qr-image"
                                />
                                */}
                            </div>

                            <div className="qr-info">
                                <p className="upi-id">
                                    <strong>UPI ID:</strong> 918736822600@sbi
                                </p>
                                <p className="qr-instruction">
                                    Scan with any UPI app (Google Pay, PhonePe, Paytm, etc.)
                                </p>
                            </div>

                            <button
                                className="full-donation-btn"
                                onClick={forward}
                            >
                                Go to Full Donation Page
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Popup;