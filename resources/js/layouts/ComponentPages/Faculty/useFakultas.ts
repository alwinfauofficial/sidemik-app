import { useAxios } from '@/hooks/useAxios';
import { useState } from 'react';
import { FakultasType } from './Column';

export const useFakultas = () => {
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<FakultasType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [academicPeriods, setAcademicPeriods] = useState<any[]>([]);

    const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`faculty?page=${currentPage}&limit=5`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get faculty', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAcademicPeriods = async () => {
        try {
            const res: any = await get('/academic-period');
            setAcademicPeriods(res.data);
        } catch (err) {
            console.error('Error fetching academic periods:', err);
        }
    };

    const handleSubmit = async (data: Omit<FakultasType, 'id'>, id?: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            if (id) {
                const res: any = await put(`/faculty/${id}`, data);
                setData((prev) => prev.map((p: any) => (p.id === id ? res.data : p)));
                await fetchData();
                onSuccess?.();
                setToast({ message: 'faculty updated successfully', type: 'success' });
                return res;
            } else {
                const res: any = await post('/faculty', data);
                setData((prev) => [...prev, res.data]);
                await fetchData();
                onSuccess?.();
                setToast({ message: 'faculty created successfully', type: 'success' });
                return res;
            }
        } catch (error: any) {
            if (error.response.status === 500) {
                setToast({ message: 'Failed to submit faculty', type: 'error' });
            }
            throw error.response.data;
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number, onSuccess?: () => void) => {
        try {
            setIsLoading(true);
            await del(`/faculty/${id}`);
            setData((prev) => prev.filter((item) => item.id !== id));
            await fetchData();
            setToast({ message: 'Faculty deleted successfully', type: 'success' });
            window.location.reload();
        } catch (err) {
            setToast({ message: 'Failed to delete Faculty', type: 'error' });
        } finally {
            setIsLoading(false);
            onSuccess?.();
        }
    };
    return {
        data,
        isLoading,
        toast,
        fetchData,
        handleSubmit,
        handleDelete,
        setToast,
        page,
        totalPages,
        setPage,
        academicPeriods,
        fetchAcademicPeriods,
    };
};
