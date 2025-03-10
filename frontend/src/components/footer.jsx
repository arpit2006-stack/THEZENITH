import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-20 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    
        <div>
          <h2 className="text-2xl font-bold">ZENITH</h2>
          <p className="mt-2 text-gray-400">Elevate your style with our premium fashion collection.</p>
        </div>

     
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li><a href="/Career" className="hover:text-white">Career</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact US</a></li>
            <li><a href="/t&c" className="hover:text-white">Term & Condition</a></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="mt-3 flex justify-center md:justify-start space-x-4">
            <a href="https://www.facebook.com/login/" className="text-gray-400 hover:text-white text-5xl">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/zenith.clothing._/" className="text-gray-400 hover:text-white text-5xl">
              <FaInstagram />
            </a>
            <a href="https://x.com/?lang=en" className="text-gray-400 hover:text-white text-5xl">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/" className="text-gray-400 hover:text-white text-5xl">
            <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ZENITH. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
