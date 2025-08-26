
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

const Invite = () => {
  const { inviteCode } = useParams<{ inviteCode: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Fetch invite details
  const { data: invite, isLoading, error } = useQuery({
    queryKey: ['invite', inviteCode],
    queryFn: async () => {
      if (!inviteCode) throw new Error('No invite code provided');
      
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('invite_code', inviteCode)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!inviteCode,
  });

  useEffect(() => {
    if (invite) {
      setEmail(invite.email);
    }
  }, [invite]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsSigningUp(true);

    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Use the invite to assign the role
        const { error: inviteError } = await supabase.rpc('use_invite', {
          p_invite_code: inviteCode,
          p_user_id: authData.user.id
        });

        if (inviteError) throw inviteError;

        toast({
          title: "Account Created Successfully!",
          description: "You can now sign in with your credentials.",
        });

        // Redirect to auth page
        navigate('/auth');
      }
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSigningUp(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Administrator</Badge>;
      case 'volunteer_math':
        return <Badge className="bg-blue-100 text-blue-800">Math Volunteer</Badge>;
      case 'volunteer_ela':
        return <Badge className="bg-green-100 text-green-800">ELA Volunteer</Badge>;
      case 'volunteer_adlo':
        return <Badge className="bg-purple-100 text-purple-800">ADLO Volunteer</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">User</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-prep-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-prep-burgundy" />
          <span className="text-prep-burgundy">Loading invite...</span>
        </div>
      </div>
    );
  }

  if (error || !invite) {
    return (
      <div className="min-h-screen bg-prep-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-red-600">Invalid Invite</CardTitle>
                <CardDescription>
                  This invite link is invalid, expired, or has already been used.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                >
                  Go to Homepage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Check if invite is expired or used
  const isExpired = new Date(invite.expires_at) < new Date();
  const isUsed = !!invite.used_at;

  if (isExpired || isUsed) {
    return (
      <div className="min-h-screen bg-prep-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-red-600">
                  {isUsed ? 'Invite Already Used' : 'Invite Expired'}
                </CardTitle>
                <CardDescription>
                  {isUsed 
                    ? 'This invite has already been used by another person.' 
                    : 'This invite has expired and is no longer valid.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                >
                  Go to Homepage
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prep-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-prep-burgundy font-lato text-2xl">
                Join SAYC Team
              </CardTitle>
              <CardDescription>
                You've been invited to join as {getRoleBadge(invite.role)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Invite;
