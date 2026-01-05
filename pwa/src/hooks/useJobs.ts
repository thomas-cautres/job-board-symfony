import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCandidateJobs, fetchCandidateJob, fetchRecruiterJobs, createJob, deleteJob } from "@/api/jobs";

export const useCandidateJobsQuery = (page: number = 1) => {
    return useQuery({
        queryKey: ['candidate-jobs', page],
        queryFn: () => fetchCandidateJobs(page),
    });
};

export const useCandidateJobQuery = (id: string) => {
    return useQuery({
        queryKey: ['candidate-job', id],
        queryFn: () => fetchCandidateJob(id),
        enabled: !!id,
    });
};

export const useRecruiterJobsQuery = () => {
    return useQuery({
        queryKey: ['recruiter-jobs'],
        queryFn: fetchRecruiterJobs,
    });
};

export const useCreateJobMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });
};

export const useDeleteJobMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });
};
