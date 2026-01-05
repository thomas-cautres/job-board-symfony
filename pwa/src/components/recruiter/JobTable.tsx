import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react";
import { useRecruiterJobsQuery, useDeleteJobMutation } from "@/hooks/useJobs";

export function JobTable() {
    const { data: jobs = [], isLoading, isError, error } = useRecruiterJobsQuery();
    const deleteJobMutation = useDeleteJobMutation();

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            deleteJobMutation.mutate(id);
        }
    };

    if (isLoading) {
        return <div className="text-center py-8 text-muted-foreground">Loading jobs...</div>;
    }

    if (isError) {
        return (
            <div className="text-center py-8 text-destructive bg-destructive/10 rounded-lg">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                <p>Failed to load jobs.</p>
                <p className="text-sm opacity-80">{error?.message}</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-primary/5">
                        <TableHead className="w-[300px] font-semibold">Title</TableHead>
                        <TableHead className="font-semibold">Location</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Salary</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                No jobs found. Create one to get started.
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobs.map((job) => (
                            <TableRow key={job.id} className="cursor-pointer hover:bg-primary/5 transition-colors group border-b border-primary/5">
                                <TableCell className="font-medium">
                                    <span className="group-hover:text-primary transition-colors font-semibold">{job.title}</span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{job.location}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal bg-secondary/50">
                                        {job.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground font-mono text-xs">{job.salary}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={job.status === 'OPEN' ? 'default' : 'secondary'}
                                        className={job.status === 'OPEN' ? 'bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200 shadow-none' : 'bg-gray-100 text-gray-500'}
                                    >
                                        <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", job.status === 'OPEN' ? "bg-green-500" : "bg-gray-400")} />
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-primary/10 data-[state=open]:bg-primary/10">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[160px]">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Edit functionality coming soon")}>
                                                <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive focus:bg-destructive/10" onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}>
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
