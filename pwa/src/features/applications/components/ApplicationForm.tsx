import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createApplication } from "@/api/jobs";
import { Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

const applicationSchema = z.object({
    candidateName: z.string().min(2, "Name is required"),
    candidateEmail: z.string().email("Invalid email address"),
    message: z.string().min(10, "Please tell us a bit about yourself (min 10 chars)"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
    jobId: string;
    jobTitle: string;
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
    });

    const mutation = useMutation({
        mutationFn: createApplication,
        onSuccess: () => {
            setIsSuccess(true);
        },
    });

    const onSubmit = (data: ApplicationFormValues) => {
        mutation.mutate({
            jobId,
            ...data
        });
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Application Sent!</h3>
                    <p className="text-muted-foreground text-sm">
                        Thanks for applying to <strong>{jobTitle}</strong>. We'll be in touch soon.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="candidateName">Full Name</Label>
                <Input
                    id="candidateName"
                    placeholder="John Doe"
                    {...register("candidateName")}
                    disabled={isSubmitting || mutation.isPending}
                />
                {errors.candidateName && <p className="text-sm text-destructive">{errors.candidateName.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="candidateEmail">Email Address</Label>
                <Input
                    id="candidateEmail"
                    type="email"
                    placeholder="john@example.com"
                    {...register("candidateEmail")}
                    disabled={isSubmitting || mutation.isPending}
                />
                {errors.candidateEmail && <p className="text-sm text-destructive">{errors.candidateEmail.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Cover Letter / Message</Label>
                <Textarea
                    id="message"
                    placeholder="Tell us why you're a great fit..."
                    className="min-h-[120px]"
                    {...register("message")}
                    disabled={isSubmitting || mutation.isPending}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>

            {mutation.isError && (
                <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
                    Something went wrong. Please try again.
                </div>
            )}

            <div className="flex justify-end pt-2">
                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || mutation.isPending}>
                    {(isSubmitting || mutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Application
                </Button>
            </div>
        </form>
    );
}
