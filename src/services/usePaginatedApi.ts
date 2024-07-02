import { useMemo } from "react";
import useSWR from "swr";

interface PaginatedApi {
    page: number
    limit: number
    endpoint: string
}

export default function usePaginatedApi({ page, limit, endpoint }: PaginatedApi) {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error } = useSWR(`/api/${endpoint}?page=${page}&limit=${limit}`, fetcher, {
        revalidateOnMount: true,
        keepPreviousData: true,
    });

    const isLoading = !data && !error;
    const loadingState = isLoading ? 'loading' : 'idle';

    const rowsPerPage = limit;
    const pages = useMemo(() => {
        return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
    }, [data?.total, rowsPerPage]);

    return { data, error, pages, loadingState };
}