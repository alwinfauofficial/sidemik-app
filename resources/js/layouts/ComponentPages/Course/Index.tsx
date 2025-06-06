import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/Components_1/DataTable';
import ConfirmDeleteDialog from '@/components/ui/Components_1/DeleteModal';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CourseType, columns } from './Column';
import ModalForm from './Modal';
import { useCourse } from './useCourse';
import { FormSelectInput } from '@/components/ui/Components_1/FormInput';
import { SelectItem } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: ' Mata Kuliah',
        href: '/course',
    },
];

const CoursePages = () => {
    const { data, isLoading, toast, fetchData, handleSubmit, handleDelete, setToast, page, setPage, totalPages, filterProdi, selectedProdiId, Prodi, setSelectedProdiId } = useCourse();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CourseType | undefined>();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
    const [prodiFilter, setProdiFilter] = useState("");


    // Toggle select row
    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    // Toggle select all rows
    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = data?.map((d) => d.id!).filter(Boolean) || [];
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const allSelected = data && data.length > 0 && selectedIds.length === data.length;

    // Hapus banyak data
    const handleBulkDelete = async () => {
        for (const id of selectedIds) {
            await handleDelete(id);
        }
        setSelectedIds([]);
        setBulkDeleteOpen(false);
    };
    

    useEffect(() => {
        fetchData(1, prodiFilter);
        filterProdi();
    }, [prodiFilter]);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mata Kuliah" />
            <div className="m-6">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-2xl font-bold">Mata Kuliah</h2>
                    <div className="flex items-center gap-4">
                        <FormSelectInput
                                        id="prodiFilter"
                                        value={prodiFilter}
                                        onValueChange={(value) => setProdiFilter(String(value))}
                                    >
                                        {Prodi.map((data: any) => (
                                            <SelectItem key={data.id} value={String(data.id)}>
                                                {data.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                        {selectedIds.length > 0 && (
                    <Button
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => setBulkDeleteOpen(true)}
                    >
                        <Trash2 /> Delete Selected ({selectedIds.length})
                    </Button>
                    )}
                    <Button
                    onClick={() => {
                        setEditing(undefined);
                        setModalOpen(true);
                    }}
                    className="flex items-center rounded bg-green-600 p-3 font-bold text-white hover:bg-green-500"
                    >
                    <CirclePlus className="h-6 w-6" /> Add Mata Kuliah
                    </Button>
                </div>

                </div>
                <DataTable
                columns={columns(
                    (row) => {
                        setEditing(row);
                        setModalOpen(true);
                    },
                    (id) => setDeleteId(parseInt(id)),
                    selectedIds,
                    toggleSelect,
                    toggleSelectAll,
                    allSelected
                )}
                data={data || []}
                isLoading={isLoading}
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                    setPage(newPage);
                    fetchData(newPage);
                }}
            />
                <ModalForm
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    submit={(values, id) =>
                        handleSubmit(values, id, () => {
                            setModalOpen(false);
                        })
                    }
                    defaultValues={editing}
                />
                <ConfirmDeleteDialog
                open={deleteId !== null}
                onCancel={() => setDeleteId(null)}
                onConfirm={() => {
                    if (!deleteId) return;
                    handleDelete(deleteId, () => {
                        setDeleteId(null);
                    });
                }}
                isLoading={isLoading}
            />

            
            <ConfirmDeleteDialog
                open={bulkDeleteOpen}
                onCancel={() => setBulkDeleteOpen(false)}
                onConfirm={() => {
                    handleBulkDelete();
                }}
                isLoading={isLoading}
            />
            </div>
        </AppLayout>
    );
};

export default CoursePages;
