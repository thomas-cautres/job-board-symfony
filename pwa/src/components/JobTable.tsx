import { useEffect, useState } from 'react';
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
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { fetchJobs, deleteJob } from "@/api/jobs";
import type { Job } from "@/types/jobs";

export function JobTable() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const loadJobs = async () => {
        setLoading(true);
        try {
            const data = await fetchJobs();
            setJobs(data);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this job?")) {
            await deleteJob(id);
            loadJobs();
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading jobs...</div>;
    }

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
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
                            <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-lg font-medium text-foreground">No jobs found</p>
                                    <p className="text-sm">Get started by creating a new job posting.</p>
                                </div>
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
