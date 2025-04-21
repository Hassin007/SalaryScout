import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaSteam } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12 sm:py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800xt Job bg-clip-text text-transparent">
          About Me
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Profile Image - Replace with your image */}
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
          <img 
            src="/hassin.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Muhammad Hassin Saghir
          </h2>
          <h3 className="text-lg text-blue-600 dark:text-blue-400 mb-4">
            Developer
          </h3>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm a passionate Developer with expertise in 
              MERN Stack. I love building applications that 
              solve real-world problems.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I am a solo Developer with a strong focus on Development and GenAI. I enjoy working on projects that challenge my skills and allow me to learn new technologies.
              I have experience in React, Node.js, Django, Linux(Ubuntu).
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me at <a 
              href="https://steamcommunity.com/id/03100" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Steam"
            >
              <FaSteam size={20} />
            </a> or exploring new technologies. I'm always eager to learn and grow.
            </p>
          </div>

          {/* Skills/Tech Stack */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <FaCode className="mr-2 text-blue-500" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js','MongoDB', 'TailwindCSS', 'Python', 'Linux' , 'GenAi'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex gap-4">
            <a 
              href="https://github.com/Hassin007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/hsn9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a 
              href="https://steamcommunity.com/id/03100" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Steam"
            >
              <FaSteam size={20} />
            </a>
            <a 
              href="mailto:hassinsaghir6@gmail.com" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;