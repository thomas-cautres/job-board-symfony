import { useParams, Link } from "react-router-dom";
import { useCandidateJobQuery } from "@/hooks/useJobs";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Banknote, Calendar, ArrowLeft } from "lucide-react";
import { ApplicationForm } from "@/components/candidate/ApplicationForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function JobDetailsPage() {
    const { id } = useParams();
    const { data: job, isLoading } = useCandidateJobQuery(id || '');

    if (isLoading) {
        return <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">Loading job details...</div>;
    }

    if (!job) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Job not found</h2>
                <Button asChild variant="outline">
                    <Link to="/jobs">Back to Jobs</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button asChild variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
                <Link to="/jobs">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
                </Link>
            </Button>

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{job.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Banknote className="h-4 w-4" />
                            {job.salary}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            Posted on {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none dark:prose-invert">
                    <h3 className="text-xl font-semibold mb-3">About the role</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                        {job.description}
                    </p>
                </div>

                <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg border">
                    <div>
                        <h3 className="font-semibold mb-1">Interested in this role?</h3>
                        <p className="text-sm text-muted-foreground">Apply now to start your journey.</p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="lg">Apply Now</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Apply for {job.title}</DialogTitle>
                                <DialogDescription>
                                    Fill out the form below to submit your application.
                                </DialogDescription>
                            </DialogHeader>
                            <ApplicationForm jobId={job.id} jobTitle={job.title} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
