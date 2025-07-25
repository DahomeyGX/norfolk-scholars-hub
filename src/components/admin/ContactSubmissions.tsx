
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, Calendar, Mail, School } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ContactSubmissions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
      toast({
        title: "Status Updated",
        description: "Contact submission status has been updated.",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
      toast({
        title: "Submission Deleted",
        description: "Contact submission has been deleted.",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-prep-burgundy">Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions?.map((submission) => (
              <Card key={submission.id} className="border-l-4 border-l-prep-burgundy">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-prep-burgundy">{submission.name}</h3>
                        <Badge className={getStatusColor(submission.status || 'pending')}>
                          {submission.status || 'pending'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-prep-dark-gray">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-prep-dark-gray">
                          <School className="h-4 w-4" />
                          {submission.school}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-prep-dark-gray">
                          <Calendar className="h-4 w-4" />
                          {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-prep-dark-gray">
                          <Eye className="h-4 w-4" />
                          Heard about us: {submission.how_heard}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-prep-dark-gray whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <select
                        value={submission.status || 'pending'}
                        onChange={(e) => updateStatusMutation.mutate({ 
                          id: submission.id, 
                          status: e.target.value 
                        })}
                        className="text-sm border rounded p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="responded">Responded</option>
                      </select>
                      
                      <Button
                        onClick={() => deleteMutation.mutate(submission.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {submissions?.length === 0 && (
              <div className="text-center py-8 text-prep-dark-gray">
                No contact submissions yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSubmissions;
