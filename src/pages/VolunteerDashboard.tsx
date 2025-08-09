
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, LogOut, CheckCircle, XCircle, HelpCircle, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const VolunteerDashboard = () => {
  const { user, volunteerType, signOut } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  // Fetch scheduled sessions
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['scheduled-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scheduled_sessions')
        .select('*')
        .order('session_date', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch volunteer's availability responses
  const { data: availability } = useQuery({
    queryKey: ['volunteer-availability', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('volunteer_availability')
        .select('*')
        .eq('volunteer_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Update availability mutation
  const updateAvailabilityMutation = useMutation({
    mutationFn: async ({ sessionId, status, notes }: { sessionId: string; status: string; notes?: string }) => {
      const { data, error } = await supabase
        .from('volunteer_availability')
        .upsert({
          volunteer_id: user?.id!,
          session_id: sessionId,
          status,
          notes: notes || null,
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteer-availability'] });
      setSelectedSession(null);
      setNotes('');
      toast({
        title: "Availability Updated",
        description: "Your availability has been recorded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSignOut = async () => {
    await signOut();
  };

  const getAvailabilityForSession = (sessionId: string) => {
    return availability?.find(a => a.session_id === sessionId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'attending':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'not_attending':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'maybe':
        return <HelpCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'attending':
        return <Badge className="bg-green-100 text-green-800">Will Attend</Badge>;
      case 'not_attending':
        return <Badge className="bg-red-100 text-red-800">Cannot Attend</Badge>;
      case 'maybe':
        return <Badge className="bg-yellow-100 text-yellow-800">Maybe</Badge>;
      default:
        return <Badge variant="outline">Not Responded</Badge>;
    }
  };

  if (sessionsLoading) {
    return <div className="min-h-screen bg-prep-white flex items-center justify-center">
      <div className="text-prep-burgundy">Loading sessions...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-prep-white">
      {/* Header */}
      <div className="bg-prep-burgundy text-prep-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-gill-sans">SAYC Volunteer Dashboard</h1>
            <p className="text-prep-white/80">
              Welcome back, {user?.email} - {volunteerType?.toUpperCase()} Volunteer
            </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sessions List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-prep-burgundy flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  2025-2026 Session Schedule
                </CardTitle>
                <CardDescription>
                  Mark your availability for each scheduled tutoring session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions?.map((session) => {
                    const sessionAvailability = getAvailabilityForSession(session.id);
                    const isPastSession = parseISO(session.session_date) < new Date();
                    
                    return (
                      <Card 
                        key={session.id} 
                        className={`border-l-4 ${isPastSession ? 'opacity-60 border-l-gray-300' : 'border-l-prep-burgundy'}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div>
                                  <h3 className="font-semibold text-prep-burgundy">
                                    {format(parseISO(session.session_date), 'EEEE, MMMM d, yyyy')}
                                  </h3>
                                  <div className="flex items-center text-sm text-prep-dark-gray">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {session.session_time} - {session.session_end_time}
                                  </div>
                                </div>
                                {sessionAvailability && getStatusIcon(sessionAvailability.status)}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {sessionAvailability ? getStatusBadge(sessionAvailability.status) : getStatusBadge('')}
                                {isPastSession && <Badge variant="outline" className="text-gray-600">Past Session</Badge>}
                              </div>
                              
                              {sessionAvailability?.notes && (
                                <p className="text-sm text-prep-dark-gray mt-2 italic">
                                  "{sessionAvailability.notes}"
                                </p>
                              )}
                            </div>
                            
                            {!isPastSession && (
                              <Button
                                onClick={() => setSelectedSession(session.id)}
                                variant="outline"
                                size="sm"
                                className="ml-4"
                              >
                                {sessionAvailability ? 'Update' : 'Respond'}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Availability Response Form */}
          <div>
            {selectedSession ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-prep-burgundy">Update Availability</CardTitle>
                  <CardDescription>
                    Let us know if you can attend this session
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button
                      onClick={() => updateAvailabilityMutation.mutate({ 
                        sessionId: selectedSession, 
                        status: 'attending', 
                        notes 
                      })}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      disabled={updateAvailabilityMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      I will be there
                    </Button>
                    
                    <Button
                      onClick={() => updateAvailabilityMutation.mutate({ 
                        sessionId: selectedSession, 
                        status: 'maybe', 
                        notes 
                      })}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                      disabled={updateAvailabilityMutation.isPending}
                    >
                      <HelpCircle className="h-4 w-4 mr-2" />
                      I might be there
                    </Button>
                    
                    <Button
                      onClick={() => updateAvailabilityMutation.mutate({ 
                        sessionId: selectedSession, 
                        status: 'not_attending', 
                        notes 
                      })}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={updateAvailabilityMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      I cannot attend
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-prep-dark-gray">
                      Optional Notes
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional notes or comments..."
                      className="mt-1"
                    />
                  </div>
                  
                  <Button
                    onClick={() => {
                      setSelectedSession(null);
                      setNotes('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-prep-burgundy flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Quick Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-prep-burgundy">Your Role</h3>
                      <p className="text-prep-dark-gray">{volunteerType?.toUpperCase()} Volunteer</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-prep-burgundy">Session Time</h3>
                      <p className="text-prep-dark-gray">Saturdays, 11:00 AM - 3:00 PM</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-prep-burgundy">Next Steps</h3>
                      <p className="text-prep-dark-gray text-sm">
                        Click "Respond" next to any session to mark your availability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
