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
import { MoreHorizontal, Pencil, Trash, AlertCircle } from "lucide-react";
import { useJobsQuery, useDeleteJobMutation } from "@/hooks/useJobs";

export function JobTable() {
    const { data: jobs = [], isLoading, isError, error } = useJobsQuery();
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
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No jobs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobs.map((job) => (
                            <TableRow key={job.id} className="cursor-pointer hover:bg-muted/50 transition-colors group">
                                <TableCell className="font-medium">
                                    <span className="group-hover:text-primary transition-colors">{job.title}</span>
                                </TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.employmentType}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell>
                                    <Badge variant={job.status === 'OPEN' ? 'default' : 'secondary'} className={job.status === 'OPEN' ? 'bg-green-500 hover:bg-green-600' : ''}>
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Edit functionality coming soon")}>
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive cursor-pointer focus:text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}>
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
