import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchApplications, updateApplicationStatus } from "@/api/applications";
import type { JobApplication } from "@/types/jobs";

export const useApplicationsQuery = () => {
    return useQuery({
        queryKey: ['applications'],
        queryFn: fetchApplications,
    });
};

export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: JobApplication['status'] }) =>
            updateApplicationStatus(id, status),
        onMutate: async ({ id, status }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['applications'] });

            // Snapshot the previous value
            const previousApplications = queryClient.getQueryData<JobApplication[]>(['applications']);

            // Optimistically update to the new value
            if (previousApplications) {
                queryClient.setQueryData<JobApplication[]>(['applications'], (old) =>
                    old ? old.map(app => app.id === id ? { ...app, status } : app) : []
                );
            }

            // Return a context object with the snapshotted value
            return { previousApplications };
        },
        onError: (_err, _newApp, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousApplications) {
                queryClient.setQueryData(['applications'], context.previousApplications);
            }
        },
        onSettled: () => {
            // Always refetch after error or success:
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
};
