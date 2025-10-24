import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 relative overflow-hidden transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ 
            duration: 0.2, 
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-md bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0"
        animate={{ 
          opacity: theme === 'light' ? [0, 0.3, 0] : [0, 0.2, 0],
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
    </Button>
  );
};

export default ThemeToggle; 