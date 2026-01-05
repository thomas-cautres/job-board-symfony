import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCandidateJobs, fetchRecruiterJobs, createJob, deleteJob } from "@/api/jobs";

export const useCandidateJobsQuery = () => {
    return useQuery({
        queryKey: ['candidate-jobs'],
        queryFn: fetchCandidateJobs,
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
