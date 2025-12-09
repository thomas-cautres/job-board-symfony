import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchJobs, createJob, deleteJob } from "@/api/jobs";

export const useJobsQuery = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
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
