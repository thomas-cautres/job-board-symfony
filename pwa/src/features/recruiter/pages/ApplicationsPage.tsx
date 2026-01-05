import { ApplicationBoard } from '@/features/recruiter/components/ApplicationBoard';

export default function ApplicationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            </div>
            <ApplicationBoard />
        </div>
    );
}
