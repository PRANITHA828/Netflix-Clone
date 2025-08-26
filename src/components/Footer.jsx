// src/components/Footer.js
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center">
    <div className="bg-black text-white flex  p-4 gap-6">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
      </div>
      <div>
      <h2 className="mb-4">Contact Us</h2>
      </div>
    </footer>
  );
}
