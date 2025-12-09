import { ApiClient } from "./client";
import type { Job, JobApplication } from "../types/jobs";

const MOCK_JOBS: Job[] = [
    {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "Senior Frontend Developer",
        description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building high-quality, responsive web applications.",
        location: "Remote",
        employmentType: "Full-time",
        salary: "€50,000 - €70,000",
        status: "OPEN",
        createdAt: "2023-11-15T09:00:00Z"
    },
    {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        title: "Backend Engineer (Symfony)",
        description: "Join our backend team to build robust APIs and microservices using Symfony and PHP.",
        location: "Paris, France",
        employmentType: "Full-time",
        salary: "€45,000 - €65,000",
        status: "OPEN",
        createdAt: "2023-11-20T14:30:00Z"
    },
    {
        id: "6b2a3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        title: "Product Designer",
        description: "We fit talented designers who can create beautiful and functional user interfaces.",
        location: "Lyon, France",
        employmentType: "Contract",
        salary: "€400/day",
        status: "CLOSED",
        createdAt: "2023-10-05T11:00:00Z"
    }
];

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

export const fetchJobs = async (): Promise<Job[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...MOCK_JOBS]), 500);
    });
};

export const createJob = async (job: Omit<Job, 'id' | 'createdAt' | 'status'>): Promise<Job> => {
    // Backend currently only accepts title and description via CreateJobDto
    const payload = {
        title: job.title,
        description: job.description
    };

    return ApiClient.request<Job>('/api/job', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
};

export const deleteJob = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
        const index = MOCK_JOBS.findIndex(j => j.id === id);
        if (index !== -1) {
            MOCK_JOBS.splice(index, 1);
        }
        setTimeout(() => resolve(), 500);
    });
};

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
