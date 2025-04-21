import { useNavigate, NavLink } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Find a Job" },
    { to: "/salary", label: "Estimate Salary by Niche" },
    { to: "/company-salary", label: "Estimate Salary by Company" },
  ];

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo Section with explicit click handler */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
          >
              <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <img 
                  src="/stocks.svg" 
                  alt="SalaryScout Logo" 
                  className="w-8 h-8"
                />
              </div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200">
              SalaryScout
              </span>
              <span className="text-blue-200 text-sm font-normal ml-2 hidden sm:inline-block">
                Your Career Compass
              </span>
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-md font-semibold"
                      : "text-white hover:bg-white/20"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;