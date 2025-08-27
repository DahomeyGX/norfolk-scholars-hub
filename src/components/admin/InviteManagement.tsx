
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Copy, Plus, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

const InviteManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'volunteer_math' | 'volunteer_ela' | 'volunteer_adlo' | 'user'>('admin');

  // Fetch invites
  const { data: invites, isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Generate invite mutation
  const generateInviteMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) => {
      // Generate invite code
      const { data: codeData, error: codeError } = await supabase.rpc('generate_invite_code');
      if (codeError) throw codeError;
      
      const inviteCode = codeData;
      
      // Create invite record
      const { error } = await supabase
        .from('invites')
        .insert({
          email,
          role: role as any, // Type assertion to handle the enum type
          invite_code: inviteCode,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });
      
      if (error) throw error;
      
      return inviteCode;
    },
    onSuccess: (inviteCode) => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      setEmail('');
      setRole('admin');
      
      // Copy invite link to clipboard
      const inviteLink = `${window.location.origin}/invite/${inviteCode}`;
      navigator.clipboard.writeText(inviteLink);
      
      toast({
        title: "Invite Created!",
        description: "Invite link has been copied to your clipboard.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Creating Invite",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCreateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    generateInviteMutation.mutate({ email, role });
  };

  const copyInviteLink = (inviteCode: string) => {
    const inviteLink = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Invite Link Copied",
      description: "The invite link has been copied to your clipboard.",
    });
  };

  const getStatusBadge = (invite: any) => {
    if (invite.used_at) {
      return <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Used
      </Badge>;
    }
    
    if (new Date(invite.expires_at) < new Date()) {
      return <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Expired
      </Badge>;
    }
    
    return <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
      <Clock className="h-3 w-3" />
      Pending
    </Badge>;
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Create Team Invite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teammate@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as typeof role)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="volunteer_math">Math Volunteer</SelectItem>
                    <SelectItem value="volunteer_ela">ELA Volunteer</SelectItem>
                    <SelectItem value="volunteer_adlo">ADLO Volunteer</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={generateInviteMutation.isPending || !email}
              className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {generateInviteMutation.isPending ? 'Creating...' : 'Create Invite'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy">Pending & Recent Invites</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading invites...</div>
          ) : (
            <div className="space-y-4">
              {invites?.map((invite) => (
                <Card key={invite.id} className="border-l-4 border-l-prep-burgundy">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-prep-burgundy">
                            {invite.email}
                          </h3>
                          {getRoleBadge(invite.role)}
                          {getStatusBadge(invite)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-prep-dark-gray">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Created {formatDistanceToNow(new Date(invite.created_at), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Expires {format(new Date(invite.expires_at), 'MMM d, yyyy')}
                          </div>
                        </div>
                        
                        {invite.used_at && (
                          <div className="text-sm text-green-600 mt-2">
                            Used {formatDistanceToNow(new Date(invite.used_at), { addSuffix: true })}
                          </div>
                        )}
                      </div>
                      
                      {!invite.used_at && new Date(invite.expires_at) > new Date() && (
                        <Button
                          onClick={() => copyInviteLink(invite.invite_code)}
                          size="sm"
                          variant="outline"
                          className="ml-4"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {invites?.length === 0 && (
                <div className="text-center py-8 text-prep-dark-gray">
                  No invites created yet.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteManagement;
