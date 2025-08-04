import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, LayoutDashboard, Settings, ChevronUp, Home, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 8, y: 32 }); // Default position: left-2 top-8
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const moveCircle = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 100; // Move 100px at a time
    const maxX = window.innerWidth - 32; // 32px for button width
    const maxY = window.innerHeight - 32; // 32px for button height

    setPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'up':
          newY = Math.max(0, prev.y - step);
          break;
        case 'down':
          newY = Math.min(maxY, prev.y + step);
          break;
        case 'left':
          newX = Math.max(0, prev.x - step);
          break;
        case 'right':
          newX = Math.min(maxX, prev.x + step);
          break;
      }

      return { x: newX, y: newY };
    });
  };

  return (
    <div 
      className="fixed z-[9999]" 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Directional Controls */}
      <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
          onClick={() => moveCircle('up')}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
      </div>
      
      <div className={`absolute top-1/2 -left-8 transform -translate-y-1/2 flex flex-col space-y-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
          onClick={() => moveCircle('left')}
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
      </div>
      
      <div className={`absolute top-1/2 -right-8 transform -translate-y-1/2 flex flex-col space-y-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
          onClick={() => moveCircle('right')}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      
      <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          size="sm"
          variant="outline"
          className="h-6 w-6 p-0 bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
          onClick={() => moveCircle('down')}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>

      {/* Main Admin Button */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            className="h-8 w-8 rounded-full bg-yellow-500/80 hover:bg-yellow-400/90 text-black shadow-lg hover:shadow-xl transition-all duration-200 border border-yellow-400/60 backdrop-blur-sm"
          >
            <Shield className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-48 bg-gray-900 border-gray-700 text-white"
        >
          <DropdownMenuItem
            onClick={() => handleNavigate('/')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigate('/dashboard')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigate('/admin')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <Settings className="h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminMenu; 