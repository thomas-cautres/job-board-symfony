import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "@/types/jobs";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow border-muted-foreground/10 group">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {job.title}
                    </CardTitle>
                    {job.createdAt && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded">
                            {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.type}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {job.description}
                </p>
                <div className="mt-4">
                    <Badge variant="secondary" className="font-normal text-xs">
                        {job.salary}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Button asChild className="w-full gap-2 transition-transform group-hover:translate-x-1" variant="outline">
                    <Link to={`/jobs/${job.id}`}>
                        View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
