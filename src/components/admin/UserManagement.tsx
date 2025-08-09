
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Calendar, BookOpen, Calculator, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const UserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [roleUpdates, setRoleUpdates] = useState<Record<string, string>>({});

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

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      // First remove all existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;
      
      // Add the new role (if not 'user', as 'user' is the default)
      if (newRole !== 'user') {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
        
        if (insertError) throw insertError;
      } else {
        // Add default user role
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'user' });
        
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setRoleUpdates({});
      toast({
        title: "User Role Updated",
        description: "User permissions have been updated successfully.",
      });
    },
  });

  const getUserPrimaryRole = (roles: any[]) => {
    if (roles.some(r => r.role === 'admin')) return 'admin';
    if (roles.some(r => r.role === 'volunteer_math')) return 'volunteer_math';
    if (roles.some(r => r.role === 'volunteer_ela')) return 'volunteer_ela';
    if (roles.some(r => r.role === 'volunteer_adlo')) return 'volunteer_adlo';
    return 'user';
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3 mr-1" />;
      case 'volunteer_math':
        return <Calculator className="h-3 w-3 mr-1" />;
      case 'volunteer_ela':
        return <BookOpen className="h-3 w-3 mr-1" />;
      case 'volunteer_adlo':
        return <Users className="h-3 w-3 mr-1" />;
      default:
        return <User className="h-3 w-3 mr-1" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "flex items-center";
    switch (role) {
      case 'admin':
        return <Badge className={`${baseClasses} bg-red-100 text-red-800`}>
          {getRoleIcon(role)}Admin
        </Badge>;
      case 'volunteer_math':
        return <Badge className={`${baseClasses} bg-blue-100 text-blue-800`}>
          {getRoleIcon(role)}Math Volunteer
        </Badge>;
      case 'volunteer_ela':
        return <Badge className={`${baseClasses} bg-green-100 text-green-800`}>
          {getRoleIcon(role)}ELA Volunteer
        </Badge>;
      case 'volunteer_adlo':
        return <Badge className={`${baseClasses} bg-purple-100 text-purple-800`}>
          {getRoleIcon(role)}ADLO Volunteer
        </Badge>;
      default:
        return <Badge className={`${baseClasses} bg-gray-100 text-gray-800`}>
          {getRoleIcon(role)}User
        </Badge>;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'volunteer_math': return 'Math Volunteer';
      case 'volunteer_ela': return 'ELA Volunteer';
      case 'volunteer_adlo': return 'ADLO Volunteer';
      case 'user': return 'User';
      default: return 'User';
    }
  };

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
              const currentRole = getUserPrimaryRole(user.roles);
              const pendingRole = roleUpdates[user.id];
              
              return (
                <Card key={user.id} className="border-l-4 border-l-prep-burgundy">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-prep-burgundy">
                            {user.first_name} {user.last_name}
                          </h3>
                          {getRoleBadge(currentRole)}
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
                      
                      <div className="ml-4 flex items-center gap-2">
                        <Select
                          value={pendingRole || currentRole}
                          onValueChange={(value) => 
                            setRoleUpdates(prev => ({...prev, [user.id]: value}))
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="volunteer_math">Math Volunteer</SelectItem>
                            <SelectItem value="volunteer_ela">ELA Volunteer</SelectItem>
                            <SelectItem value="volunteer_adlo">ADLO Volunteer</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {pendingRole && pendingRole !== currentRole && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => updateRoleMutation.mutate({ 
                                userId: user.id, 
                                newRole: pendingRole 
                              })}
                              size="sm"
                              className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => setRoleUpdates(prev => {
                                const newUpdates = {...prev};
                                delete newUpdates[user.id];
                                return newUpdates;
                              })}
                              size="sm"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
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
