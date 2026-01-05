import { useCandidateJobsQuery } from "@/hooks/useJobs";
import { JobCard } from "@/components/candidate/JobCard";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CandidateJobsPage() {
    const { data: jobs = [], isLoading, isError } = useCandidateJobsQuery();
    const [searchTerm, setSearchTerm] = useState("");

    // Simple client-side filtering
    const filteredJobs = jobs.filter(job =>
        job.status === 'OPEN' && (
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (isLoading) {
        return <div className="container py-8 text-center text-muted-foreground">Loading opportunities...</div>;
    }

    if (isError) {
        return <div className="container py-8 text-center text-destructive">Failed to load jobs. Please try again later.</div>;
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-muted/10">
            <div className="bg-background border-b">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">Explore Opportunities</h1>
                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by title, keyword or company"
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Location" className="pl-9" />
                        </div>
                        <Button variant="outline" className="shrink-0 gap-2">
                            <Filter className="h-4 w-4" /> Filters
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-muted-foreground">
                            <p className="text-lg font-medium">No open positions found.</p>
                            <p className="text-sm">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
