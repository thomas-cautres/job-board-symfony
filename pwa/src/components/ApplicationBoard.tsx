import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchApplications, updateApplicationStatus } from '@/api/jobs';
import type { JobApplication } from '@/types/jobs';
import { Check, X } from "lucide-react";

export function ApplicationBoard() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await fetchApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleStatusUpdate = async (id: string, status: JobApplication['status']) => {
        try {
            await updateApplicationStatus(id, status);
            // Optimistic update
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status } : app
            ));
        } catch (error) {
            console.error("Failed to update status", error);
            loadApplications(); // Revert on error
        }
    };

    const getStatusColor = (status: JobApplication['status']) => {
        switch (status) {
            case 'ACCEPTED': return 'default'; // dark/success
            case 'REJECTED': return 'destructive';
            case 'REVIEWING': return 'secondary';
            default: return 'outline';
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading applications...</div>;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {applications.length === 0 ? (
                <div className="col-span-full text-center py-16 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                    <p className="text-lg font-medium text-foreground">No applications yet</p>
                    <p className="text-sm">Candidates will appear here once they apply.</p>
                </div>
            ) : (
                applications.map((app) => (
                    <Card key={app.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 border-muted-foreground/10 group">
                        <CardHeader className="flex flex-row items-start gap-4 pb-3 space-y-0">
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.candidateName}`} />
                                <AvatarFallback className="bg-primary/5 text-primary">{app.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <CardTitle className="text-base font-semibold truncate" title={app.candidateName}>{app.candidateName}</CardTitle>
                                    <Badge variant={getStatusColor(app.status)} className="shrink-0">{app.status}</Badge>
                                </div>
                                <CardDescription className="text-xs truncate font-medium text-primary/80">{app.jobTitle}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-4">
                            <div className="grid gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className="font-medium text-foreground text-xs uppercase tracking-wide opacity-70">Email</span>
                                    <span className="truncate" title={app.candidateEmail}>{app.candidateEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground text-xs uppercase tracking-wide opacity-70">Applied</span>
                                    <span>{new Date(app.appliedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-3 pb-4 flex gap-2 justify-end border-t border-muted/50 bg-muted/5 mt-auto">
                            {app.status === 'PENDING' && (
                                <Button size="sm" variant="outline" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer shadow-sm" onClick={() => handleStatusUpdate(app.id, 'REVIEWING')}>
                                    Review Application
                                </Button>
                            )}
                            {['PENDING', 'REVIEWING'].includes(app.status) && (
                                <>
                                    <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20 cursor-pointer shadow-sm" onClick={() => handleStatusUpdate(app.id, 'REJECTED')}>
                                        <X className="mr-2 h-4 w-4" /> Reject
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 cursor-pointer shadow-sm" onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}>
                                        <Check className="mr-2 h-4 w-4" /> Accept
                                    </Button>
                                </>
                            )}
                            {['ACCEPTED', 'REJECTED'].includes(app.status) && (
                                <div className="w-full text-center text-xs text-muted-foreground py-2 italic font-medium bg-muted/20 rounded-sm">
                                    {app.status === 'ACCEPTED' ? 'Candidate Accepted' : 'Candidate Rejected'}
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                ))
            )}
        </div>
    );
}
