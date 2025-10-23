import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface RoleRequest {
  id: string;
  user_id: string;
  role: string;
  status: string;
  requested_at: string;
  profiles?: {
    email: string;
    full_name: string | null;
  };
}

const AdminRoleApprovals = () => {
  const [requests, setRequests] = useState<RoleRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoleRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        id,
        user_id,
        role,
        status,
        requested_at,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .order("requested_at", { ascending: false });

    if (error) {
      toast.error("Failed to load role requests");
      console.error(error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoleRequests();
  }, []);

  const handleApproval = async (requestId: string, newStatus: "approved" | "rejected") => {
    const { error } = await supabase
      .from("user_roles")
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
        reviewed_by: (await supabase.auth.getUser()).data.user?.id,
      })
      .eq("id", requestId);

    if (error) {
      toast.error(`Failed to ${newStatus === "approved" ? "approve" : "reject"} request`);
      console.error(error);
    } else {
      toast.success(`Request ${newStatus} successfully`);
      fetchRoleRequests();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Role Approvals</h1>
          <p className="text-muted-foreground">Manage user role requests</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No role requests found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {request.profiles?.full_name || "Unknown User"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{request.profiles?.email}</p>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Requested Role</p>
                        <p className="text-muted-foreground capitalize">{request.role}</p>
                      </div>
                      <div>
                        <p className="font-medium">Requested At</p>
                        <p className="text-muted-foreground">
                          {new Date(request.requested_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApproval(request.id, "approved")}
                          className="flex-1"
                          variant="default"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleApproval(request.id, "rejected")}
                          className="flex-1"
                          variant="destructive"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminRoleApprovals;
