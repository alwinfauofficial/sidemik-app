import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { CourseType } from './Column';

export const useCourseType = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<CourseType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`course-type?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            console.error('Error fetching:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: Omit<CourseType, 'id'>, id?: number | undefined, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/course-type/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Jenis Mata Kuliah updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/course-type', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'Jenis Mata Kuliah created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit Jenis Mata Kuliah', type: 'error' });
            }
            throw error.response.status.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/course-type/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            window.location.reload();
            await fetchData();
            onSuccess?.();
            setToast({ message: 'Jenis Mata Kuliah deleted successfully', type: 'success' });
        } catch (err) {
            setToast({ message: 'Failed to delete Jenis Mata Kuliah', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };
    return { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, totalPages, setPage };
};
