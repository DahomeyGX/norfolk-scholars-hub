import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ContactSubmissions from '@/components/admin/ContactSubmissions';
import UserManagement from '@/components/admin/UserManagement';
import SessionManagement from '@/components/admin/SessionManagement';
import InviteManagement from '@/components/admin/InviteManagement';
import { Users, MessageSquare, Settings, LogOut, Calendar, CheckCircle, XCircle, HelpCircle, Mail } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch volunteer counts
  const { data: volunteerStats } = useQuery({
    queryKey: ['volunteer-stats'],
    queryFn: async () => {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role');
      
      const mathVolunteers = roles?.filter((r: any) => r.role === 'volunteer_math').length || 0;
      const elaVolunteers = roles?.filter((r: any) => r.role === 'volunteer_ela').length || 0;
      const adloVolunteers = roles?.filter((r: any) => r.role === 'volunteer_adlo').length || 0;
      
      return {
        math: mathVolunteers,
        ela: elaVolunteers,
        adlo: adloVolunteers,
        total: mathVolunteers + elaVolunteers + adloVolunteers
      };
    },
  });

  // Fetch upcoming sessions
  const { data: upcomingSessions } = useQuery({
    queryKey: ['upcoming-sessions-admin'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')
        .gte('session_date', today)
        .eq('is_active', true)
        .order('session_date', { ascending: true })
        .limit(5);
      
      if (error) {
        console.error('Error fetching sessions:', error);
        return [];
      }
      
      return sessions || [];
    },
  });

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-prep-white">
      {/* Header */}
      <div className="bg-prep-burgundy text-prep-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-gill-sans">SAYC Admin Dashboard</h1>
            <p className="text-prep-white/80">Welcome back, {user?.email}</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="bg-transparent border-prep-white text-prep-white hover:bg-prep-white hover:text-prep-burgundy"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
            <TabsTrigger value="contacts">Contact Forms</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Volunteers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{volunteerStats?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">Active volunteers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admin Status</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <Badge variant="default" className="bg-prep-burgundy">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">System operational</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Button
                    onClick={() => setActiveTab('sessions')}
                    className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Sessions
                  </Button>
                  <Button
                    onClick={() => setActiveTab('volunteers')}
                    className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Volunteer Status
                  </Button>
                  <Button
                    onClick={() => setActiveTab('invites')}
                    className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Manage Invites
                  </Button>
                  <Button
                    onClick={() => setActiveTab('contacts')}
                    className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Review Contact Forms
                  </Button>
                  <Button
                    onClick={() => setActiveTab('users')}
                    className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <SessionManagement />
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">{volunteerStats?.math || 0}</div>
                  <p className="text-sm text-prep-dark-gray">Math Volunteers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{volunteerStats?.ela || 0}</div>
                  <p className="text-sm text-prep-dark-gray">ELA Volunteers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-purple-600">{volunteerStats?.adlo || 0}</div>
                  <p className="text-sm text-prep-dark-gray">ADLO Volunteers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-prep-burgundy">{volunteerStats?.total || 0}</div>
                  <p className="text-sm text-prep-dark-gray">Total Volunteers</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-prep-burgundy flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(upcomingSessions) && upcomingSessions.map((session: any) => (
                    <Card key={session.id} className="border-l-4 border-l-prep-burgundy">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-prep-burgundy">
                              {format(parseISO(session.session_date), 'EEEE, MMMM d, yyyy')}
                            </h3>
                            <p className="text-sm text-prep-dark-gray">{session.session_time} - {session.session_end_time}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {(!upcomingSessions || (Array.isArray(upcomingSessions) && upcomingSessions.length === 0)) && (
                    <div className="text-center py-8 text-prep-dark-gray">
                      No upcoming sessions found.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites">
            <InviteManagement />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactSubmissions />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
