import { FaGithub, FaLinkedin, FaSteam } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  const footerLinks = [
    { href: "/", label: "Privacy Policy" },
    { href: "/", label: "Terms of Service" },
    { href: "/", label: "Contact Us" },
  ];

  const socialLinks = [
    { 
      icon: <FaGithub className="text-xl" />, 
      href: "https://github.com/Hassin007", 
      label: "GitHub" 
    },
    { 
      icon: <FaLinkedin className="text-xl" />, 
      href: "https://www.linkedin.com/in/hsn9", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaSteam className="text-xl" />, 
      href: "https://steamcommunity.com/id/03100", 
      label: "Steam" 
    },
  ];

    const handleLogoClick = () => {
        navigate("/");
    }
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section - Replace with your SVG */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label="SalaryScout Logo"
              onClick={handleLogoClick}
            >
              {/* Placeholder for your SVG logo - replace with your actual SVG */}
              <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <img 
                  src="/stocks.svg" 
                  alt="SalaryScout Logo" 
                  className="w-8 h-8"
                />
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">
                  SalaryScout
                </span>
              </h2>
            </motion.div>
            <p className="text-blue-200 text-sm text-center md:text-left max-w-xs">
              Empowering your career decisions with accurate salary data.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-green-300 mb-2">Resources</h3>
              {footerLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-green-300 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-green-300 mb-2">Connect</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="text-white hover:text-green-300 transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} SalaryScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;