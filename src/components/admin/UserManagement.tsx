
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const UserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      // First get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Then get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;
      
      // Combine the data
      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        roles: userRoles?.filter(role => role.user_id === profile.id) || []
      })) || [];
      
      return usersWithRoles;
    },
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      if (isAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User Role Updated",
        description: "User permissions have been updated successfully.",
      });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => {
              const isAdmin = user.roles?.some(role => role.role === 'admin');
              
              return (
                <Card key={user.id} className="border-l-4 border-l-prep-burgundy">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-prep-burgundy">
                            {user.first_name} {user.last_name}
                          </h3>
                          <Badge className={isAdmin ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                            {isAdmin ? (
                              <>
                                <Shield className="h-3 w-3 mr-1" />
                                Admin
                              </>
                            ) : (
                              <>
                                <User className="h-3 w-3 mr-1" />
                                User
                              </>
                            )}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-sm text-prep-dark-gray">
                            <strong>Email:</strong> {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-prep-dark-gray">
                            <Calendar className="h-4 w-4" />
                            Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button
                          onClick={() => toggleAdminMutation.mutate({ 
                            userId: user.id, 
                            isAdmin: isAdmin || false 
                          })}
                          variant={isAdmin ? "destructive" : "default"}
                          size="sm"
                          className={isAdmin ? "" : "bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"}
                        >
                          {isAdmin ? 'Remove Admin' : 'Make Admin'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {users?.length === 0 && (
              <div className="text-center py-8 text-prep-dark-gray">
                No users found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
