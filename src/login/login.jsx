import React, { useState } from "react";
import "../css/login.css"
import googleLogo from "./Google_Icons-09-512.webp"; // Add Google logo image
import trustLogo from "./download (2).png"; // Add TrustNet logo image
import { useNavigate } from "react-router-dom";
import { auth , provider, signInWithPopup } from "../firebase/firebase.config";
import Swal from 'sweetalert2';
import 'animate.css';
import copilotLogo from "./copilit.png"
export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
 const navigate=useNavigate()
  const handleOtpChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };
const handleVerify = () => {
//   navigate("/homepage"); // <-- Route path defined in App.js
};
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
 const user = result.user;

localStorage.setItem("userName", user.displayName);  // ✅ MUST SET THIS

    Swal.fire({
      title: `Welcome, ${result.user.displayName || "User"}!`,
      text: "You've successfully signed in with Google",
      icon: "success",
      confirmButtonText: "Continue",
      timer: 2500,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      navigate("/homepage");
    });
  } catch (error) {
    console.error("Google Sign-in Error:", error);

    Swal.fire({
      title: "Oops...",
      text: "Google Sign-in failed. Please try again.",
      icon: "error",
      confirmButtonText: "Retry"
    });
  }
};
  return (
    <div className="login-container">
      <div className="login-card">
  <div className="branding-row">
  <img src={trustLogo} alt="TrustNet" className="trust-logo" />

  <div className="branding-text">
    <h2 className="title">TrustNet</h2>
    <p className="subtitle">Built on Trust</p>
    <p className="copilot-text">Made with Copilot</p>
  </div>

  <img src={copilotLogo} alt="Copilot" className="copilot-logo" />
</div>



        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google" />
          Sign in with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <label className="input-label">Mobile number</label>
       <input
  type="tel"
  placeholder="+91"
  className="input-field"
  value={mobile}
  onChange={(e) => {
    const onlyNums = e.target.value.replace(/[^0-9+]/g, ""); // allows only numbers and +
    setMobile(onlyNums);
  }}
/>

        <div className="otp-row">
          <span className="otp-label">Send OTP</span>
          <button className="send-otp-btn">Send OTP</button>
        </div>

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

        <button className="verify-btn" onClick={handleVerify}>
           Verify</button>
         <div className="footer-links">
          <a href="./privacy">Privacy Policy</a>
          <a href="./terms">Terms & Conditions</a>
          <a href="./contactus">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
