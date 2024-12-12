import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

// Komponent for hjemmesiden
const HomePage = () => {
  return (
    <section className="flex flex-col items-center">
      {/* Toppbanner med melding */}
      <div className="flex items-center justify-center bg-red-600 text-white w-full h-12 text-lg font-semibold shadow-md">
        TEXT TRUMP TO 88022
      </div>

      {/* Velkomstbilde */}
      <div className="mb-8">
        <img
          src="src/assets/image/Welcome.jpeg"
          alt="Trumpverse Intro"
          className="max-w-full h-auto shadow-2xl"
        />
      </div>

      {/* Agenda-seksjonen */}
      <div className="max-w-3xl text-center px-4 py-6 bg-white rounded-lg shadow-lg my-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Agenda</h3>
        <p className="text-lg text-gray-700 mb-6">
          My fellow Americans, our mission is clear: to put America first and
          ensure our nation’s greatness for generations to come. Together, we’ve
          already accomplished so much—reviving our economy, securing our
          borders, strengthening our military, and standing up to global
          adversaries. But there is still more to do. We will continue to fight
          for fair trade, bring jobs back to our shores, and unleash American
          energy to lower costs and achieve true independence. We’ll protect our
          elections, our borders, and our freedoms. I am committed to defending
          your values, your families, and your future. Together, we will finish
          what we started and make America greater than ever before.
          <br />
          <span className="font-bold">Donald J. Trump</span>
        </p>

        {/* Bilde av Trump */}
        <div className="flex justify-center">
          <img
            src="src/assets/image/Trump-icon.jpg"
            alt="Trump Poster"
            className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md"
          />
        </div>
      </div>

      {/* Sosiale medier ikoner */}
      <div className="flex justify-center items-center gap-4">
        <FaInstagram className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <FaXTwitter className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <FaTiktok className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <FaSnapchat className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <FaFacebookF className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
        <FaYoutube className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
      </div>

      {/* Kontaktseksjon */}
      <div className="w-full bg-blue-950 border-t-2 border-red-700 text-white py-10 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-6">
            We’d love to hear from you! For inquiries, support, or feedback,
            feel free to get in touch.
          </p>
          <p className="text-lg mb-2">
            Email:{" "}
            <a
              href="mailto:contact@trumpverse.com"
              className="text-blue-400 hover:text-blue-500"
            >
              contact@trumpverse.com
            </a>
          </p>
          <p className="text-lg">
            Phone:{" "}
            <a
              href="tel:+1234567890"
              className="text-blue-400 hover:text-blue-500"
            >
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
