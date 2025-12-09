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
import { useCreateJobMutation } from "@/hooks/useJobs";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    location: z.string().min(2, "Location is required"),
    employmentType: z.string().min(2, "Employment type is required"),
    salary: z.string().min(1, "Salary range is required"),
    description: z.string().min(3, "Description must be at least 10 characters"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function JobCreatePage() {
    const navigate = useNavigate();
    const createJobMutation = useCreateJobMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            location: "",
            employmentType: "",
            salary: "",
            description: "",
        },
    });

    const onSubmit = (data: JobFormValues) => {
        // API currently only supports title and description
        createJobMutation.mutate({
            ...data,
            status: 'OPEN',
        } as any, {
            onSuccess: () => navigate('/jobs')
        });
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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. Senior Frontend Developer"
                                {...register("title")}
                                disabled={isSubmitting || createJobMutation.isPending}
                            />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. Remote, Paris, etc."
                                {...register("location")}
                                disabled={isSubmitting || createJobMutation.isPending}
                            />
                            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="employmentType">Employment Type</Label>
                                <Input
                                    id="employmentType"
                                    placeholder="e.g. Full-time"
                                    {...register("employmentType")}
                                    disabled={isSubmitting || createJobMutation.isPending}
                                />
                                {errors.employmentType && <p className="text-sm text-destructive">{errors.employmentType.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary Range</Label>
                                <Input
                                    id="salary"
                                    placeholder="e.g. €50k - €70k"
                                    {...register("salary")}
                                    disabled={isSubmitting || createJobMutation.isPending}
                                />
                                {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the role, responsibilities, and requirements..."
                                className="min-h-[150px]"
                                {...register("description")}
                                disabled={isSubmitting || createJobMutation.isPending}
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button" onClick={() => navigate('/jobs')} disabled={isSubmitting || createJobMutation.isPending}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting || createJobMutation.isPending}>
                                {(isSubmitting || createJobMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting || createJobMutation.isPending ? 'Creating...' : 'Create Job'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
