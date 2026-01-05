import type { JobApplication } from "@/types/jobs";
import { MOCK_JOBS } from "./jobs";


const MOCK_APPLICATIONS: JobApplication[] = [
    {
        id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        candidateName: "Alice Smith",
        candidateEmail: "alice.smith@example.com",
        jobTitle: "Senior Frontend Developer",
        status: "PENDING",
        appliedAt: "2023-12-01T10:00:00Z"
    },
    {
        id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
        candidateName: "Bob Johnson",
        candidateEmail: "bob.johnson@example.com",
        jobTitle: "Senior Frontend Developer",
        status: "REVIEWING",
        appliedAt: "2023-12-02T15:45:00Z"
    },
    {
        id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
        candidateName: "Charlie Brown",
        candidateEmail: "charlie.brown@example.com",
        jobTitle: "Backend Engineer (Symfony)",
        status: "REJECTED",
        appliedAt: "2023-11-25T09:30:00Z"
    }
];

export const fetchApplications = async (): Promise<JobApplication[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...MOCK_APPLICATIONS]), 500);
    });
};

export const updateApplicationStatus = async (id: string, status: JobApplication['status']): Promise<JobApplication> => {
    return new Promise((resolve, reject) => {
        const app = MOCK_APPLICATIONS.find(a => a.id === id);
        if (app) {
            app.status = status;
            setTimeout(() => resolve({ ...app }), 500);
        } else {
            setTimeout(() => reject(new Error("Application not found")), 500);
        }
    });
};

export const createApplication = async (application: {
    candidateName: string;
    candidateEmail: string;
    jobId: string;
    message: string
}): Promise<void> => {
    return new Promise((resolve) => {
        const newApp: JobApplication = {
            id: crypto.randomUUID(),
            candidateName: application.candidateName,
            candidateEmail: application.candidateEmail,
            jobTitle: MOCK_JOBS.find(j => j.id === application.jobId)?.title || 'Unknown Job',
            status: 'PENDING',
            appliedAt: new Date().toISOString()
        };
        MOCK_APPLICATIONS.unshift(newApp);
        setTimeout(() => resolve(), 1000);
    });
};
