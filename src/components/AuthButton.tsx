
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthButton = () => {
  const { user, isAdmin, signOut } = useAuth();

  if (user && isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/admin">
          <Button variant="outline" size="sm" className="border-prep-burgundy text-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white">
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Button>
        </Link>
        <Button 
          onClick={signOut}
          variant="outline"
          size="sm"
          className="border-prep-burgundy text-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Link to="/auth">
      <Button 
        variant="outline"
        size="sm"
        className="border-prep-burgundy text-prep-burgundy hover:bg-prep-burgundy hover:text-prep-white"
      >
        <Shield className="h-4 w-4 mr-2" />
        Admin
      </Button>
    </Link>
  );
};

export default AuthButton;
