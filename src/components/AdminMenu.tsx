import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Shield, LayoutDashboard, Settings, ChevronUp, Home } from 'lucide-react';

const AdminMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-8 left-2 z-[9999]">
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