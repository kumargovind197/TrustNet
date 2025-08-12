import React, { useState } from "react";
import "../css/login.css";
import googleLogo from "./Google_Icons-09-512.webp";
import trustLogo from "./download (2).png";
import copilotLogo from "./copilit.png";
import { useNavigate } from "react-router-dom";
import {
  auth,
  provider,
  signInWithPopup
} from "../firebase/firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  // ✅ reCAPTCHA initialization only once
 const configureCaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth, // ← correct placement of auth
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => { console.log("reCAPTCHA solved"); },
        "expired-callback": () => { console.log("reCAPTCHA expired"); },
      }
    );
  }
};

  // ✅ Send OTP
  const sendOtp = async () => {
    if (!mobile.startsWith('+91') && !mobile.startsWith('+92')) {
      Swal.fire("Error", "Number must start with +91 or +92", "error");
      return;
    }

    if (mobile.length !== 13) {
      Swal.fire("Error", "Enter full number with +91 or +92", "error");
      return;
    }

    try {
      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, mobile, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
      Swal.fire("OTP Sent", `Sent to ${mobile}`, "success");
    } catch (error) {
      console.error("OTP send failed:", error);
      Swal.fire("Failed to send OTP", error.message, "error");
    }
  };

  // ✅ Handle OTP change
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      Swal.fire("Oops", "Enter a 6-digit OTP", "warning");
      return;
    }

    try {
      const result = await confirmationResult.confirm(code);
      localStorage.setItem("userName", result.user.phoneNumber);
      Swal.fire("Login Successful", "Redirecting...", "success");
      navigate("/homepage");
    } catch (error) {
      Swal.fire("Invalid OTP", "Please try again", "error");
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("userName", user.displayName);
      Swal.fire({
        title: `Welcome, ${user.displayName || "User"}!`,
        text: "You've successfully signed in with Google",
        icon: "success",
        timer: 2500
      }).then(() => {
        navigate("/homepage");
      });
    } catch (error) {
      Swal.fire("Google Sign-in failed", error.message, "error");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Branding */}
        <div className="branding-row">
          <img src={trustLogo} alt="TrustNet" className="trust-logo" />
          <div className="branding-text">
            <h2 className="title">TrustNet</h2>
            <p className="subtitle">Built on Trust</p>
            <p className="copilot-text">Made with Copilot</p>
          </div>
          <img src={copilotLogo} alt="Copilot" className="copilot-logo" />
        </div>

        {/* Google login */}
        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={isSigningIn}
        >
          <img src={googleLogo} alt="Google" />
          Sign in with Google
        </button>

        <div className="divider"><span>or</span></div>

        {/* Phone input */}
        <label className="input-label">Mobile number</label>
        <input
          type="tel"
          placeholder="+91XXXXXXXXXX"
          className="input-field"
          value={mobile}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9+]/g, "");
            setMobile(onlyNums);
          }}
        />

        {/* Send OTP */}
        <div className="otp-row">
          <span className="otp-label">Send OTP</span>
          <button className="send-otp-btn" onClick={sendOtp}>
            Send OTP
          </button>
        </div>

        {/* OTP inputs */}
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="otp-box"
            />
          ))}
        </div>

        {/* Verify OTP */}
        <button className="verify-btn" onClick={verifyOtp} disabled={!otpSent}>
          Verify
        </button>

        {/* Footer */}
        <div className="footer-links">
          <a href="./privacy">Privacy Policy</a>
          <a href="./terms">Terms & Conditions</a>
          <a href="./contactus">Contact Us</a>
        </div>
      </div>

      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
