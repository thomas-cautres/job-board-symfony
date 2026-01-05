import { JobTable } from '@/components/recruiter/JobTable';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export default function JobsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
                <Button asChild>
                    <Link to="/recruiter/jobs/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post New Job
                    </Link>
                </Button>
            </div>
            <JobTable />
        </div>
    );
}
