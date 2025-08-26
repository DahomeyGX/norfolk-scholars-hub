
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Session {
  id: string;
  session_date: string;
  session_time: string;
  session_end_time: string;
  is_active: boolean;
  notes?: string;
}

const SessionManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [newSession, setNewSession] = useState({
    session_date: '',
    session_time: '11:00',
    session_end_time: '15:00',
    is_active: true,
    notes: ''
  });

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['admin-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('session_date', { ascending: true });
      
      if (error) throw error;
      return data as Session[];
    },
  });

  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: typeof newSession) => {
      const { error } = await supabase
        .from('sessions')
        .insert([sessionData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sessions'] });
      setNewSession({
        session_date: '',
        session_time: '11:00',
        session_end_time: '15:00',
        is_active: true,
        notes: ''
      });
      toast({
        title: "Session Created",
        description: "New session has been added successfully.",
      });
    },
  });

  const updateSessionMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Session> }) => {
      const { error } = await supabase
        .from('sessions')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sessions'] });
      setEditingSession(null);
      toast({
        title: "Session Updated",
        description: "Session has been updated successfully.",
      });
    },
  });

  const deleteSessionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sessions'] });
      toast({
        title: "Session Deleted",
        description: "Session has been removed successfully.",
      });
    },
  });

  const handleCreateSession = () => {
    if (!newSession.session_date) {
      toast({
        title: "Error",
        description: "Please select a session date.",
        variant: "destructive",
      });
      return;
    }
    createSessionMutation.mutate(newSession);
  };

  const handleUpdateSession = (session: Session, updates: Partial<Session>) => {
    updateSessionMutation.mutate({ id: session.id, updates });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading sessions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label htmlFor="new-date">Date</Label>
              <Input
                id="new-date"
                type="date"
                value={newSession.session_date}
                onChange={(e) => setNewSession(prev => ({ ...prev, session_date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="new-start-time">Start Time</Label>
              <Input
                id="new-start-time"
                type="time"
                value={newSession.session_time}
                onChange={(e) => setNewSession(prev => ({ ...prev, session_time: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="new-end-time">End Time</Label>
              <Input
                id="new-end-time"
                type="time"
                value={newSession.session_end_time}
                onChange={(e) => setNewSession(prev => ({ ...prev, session_end_time: e.target.value }))}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleCreateSession}
                className="bg-prep-burgundy hover:bg-prep-burgundy/90 text-prep-white w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Manage Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions?.map((session) => (
              <Card key={session.id} className="border-l-4 border-l-prep-burgundy">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-prep-burgundy">
                          {format(parseISO(session.session_date), 'EEEE, MMMM d, yyyy')}
                        </h3>
                        <Badge className={session.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {session.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-prep-dark-gray">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.session_time} - {session.session_end_time}
                        </div>
                      </div>
                      
                      {session.notes && (
                        <p className="text-sm text-prep-dark-gray mt-2">{session.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleUpdateSession(session, { is_active: !session.is_active })}
                        size="sm"
                        variant="outline"
                        className={session.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}
                      >
                        {session.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        onClick={() => deleteSessionMutation.mutate(session.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {sessions?.length === 0 && (
              <div className="text-center py-8 text-prep-dark-gray">
                No sessions found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManagement;
