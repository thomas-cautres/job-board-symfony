import { ApiClient } from "./client";
import type { Job } from "../types/jobs";


export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
}

export const MOCK_JOBS: Job[] = [
    {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "Senior Frontend Developer",
        description: "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building high-quality, responsive web applications.",
        location: "Remote",
        type: "Full-time",
        salary: "€50,000 - €70,000",
        status: "OPEN",
        createdAt: "2023-11-15T09:00:00Z"
    },
    {
        id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
        title: "Backend Engineer (Symfony)",
        description: "Join our backend team to build robust APIs and microservices using Symfony and PHP.",
        location: "Paris, France",
        type: "Full-time",
        salary: "€45,000 - €65,000",
        status: "OPEN",
        createdAt: "2023-11-20T14:30:00Z"
    },
    {
        id: "6b2a3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        title: "Product Designer",
        description: "We fit talented designers who can create beautiful and functional user interfaces.",
        location: "Lyon, France",
        type: "Contract",
        salary: "€400/day",
        status: "CLOSED",
        createdAt: "2023-10-05T11:00:00Z"
    }
];

export const fetchCandidateJobs = async (page: number = 1): Promise<PaginatedResponse<Job>> => {
    return ApiClient.request<PaginatedResponse<Job>>(`/api/jobs/${page}`, {
        method: 'GET'
    });
};

export const fetchCandidateJob = async (id: string): Promise<Job> => {
    return ApiClient.request<Job>(`/api/jobs/${id}`, {
        method: 'GET'
    });
};

export const fetchRecruiterJobs = async (): Promise<Job[]> => {
    return ApiClient.requestSecured<Job[]>('/api/recruiter/jobs', {
        method: 'GET'
    });
};

export const createJob = async (job: Omit<Job, 'id' | 'createdAt' | 'status'>): Promise<Job> => {
    const payload = {
        title: job.title,
        description: job.description,
        salary: job.salary,
        type: job.type,
        location: job.location,
    };

    return ApiClient.requestSecured<Job>('/api/recruiter/job', {
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

