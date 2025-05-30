import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type WaktuKuliahType = {
    id?: number;
    time: string;
    description: string;
};

export const columns = (onEdit: (row: WaktuKuliahType) => void, onDelete: (id: string) => void): ColumnDef<WaktuKuliahType>[] => [
    {
        id: 'rowNumber',
        header: 'No',
        cell: ({ row }) => <div className="">{row.index + 1}</div>,
    },
    { accessorKey: 'time', header: 'Waktu Kuliah' },
    { accessorKey: 'description', header: 'Keterangan Waktu Kuliah' },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button className="bg-blue-700 hover:bg-blue-600" size="sm" onClick={() => onEdit(row.original)}>
                    <Pencil />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(row.original.id!.toString())}>
                    <Trash2 />
                </Button>
            </div>
        ),
    },
];

export default columns;
