export interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    salary: string;
    status: 'OPEN' | 'CLOSED';
    createdAt: string;
}

export interface JobApplication {
    id: string;
    candidateName: string;
    candidateEmail: string;
    jobTitle: string;
    status: 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';
    appliedAt: string;
}
