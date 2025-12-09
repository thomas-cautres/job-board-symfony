import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/api/jobs";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";

export default function JobCreatePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        employmentType: "",
        salary: "",
        description: "",
    });

    const createJobMutation = useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] }); // Assuming 'jobs' key is used for list
            navigate('/jobs');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API currently only supports title and description
        // Passing other fields to the object to satisfy type, but they are filtered in api/jobs.ts
        // or we can cast it. better to pass full object and let api layer handle it.
        createJobMutation.mutate({
            ...formData,
            status: 'OPEN', // Default, ignored by backendDto
        } as any);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>
                        Fill out the form below to publish a new job opening.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {createJobMutation.isError && (
                        <div className="mb-6 p-4 rounded-md bg-destructive/15 text-destructive flex items-center gap-2 text-sm font-medium">
                            <AlertCircle className="h-4 w-4" />
                            <span>{createJobMutation.error.message || "Failed to create job. Please try again."}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Senior Frontend Developer"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                disabled={createJobMutation.isPending}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. Remote, Paris, etc. (Not saved to DB yet)"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                disabled={createJobMutation.isPending}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Employment Type</Label>
                                <Input
                                    id="employmentType" // Match state key 'employmentType' not 'type' 
                                    placeholder="e.g. Full-time (Not saved to DB yet)"
                                    required
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    disabled={createJobMutation.isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input
                                    id="salary"
                                    placeholder="e.g. €50k - €70k (Not saved to DB yet)"
                                    required
                                    value={formData.salary}
                                    onChange={handleChange}
                                    disabled={createJobMutation.isPending}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                className="min-h-[150px]"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                disabled={createJobMutation.isPending}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button" onClick={() => navigate('/jobs')} disabled={createJobMutation.isPending}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createJobMutation.isPending}>
                                {createJobMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {createJobMutation.isPending ? 'Creating...' : 'Create Job'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
