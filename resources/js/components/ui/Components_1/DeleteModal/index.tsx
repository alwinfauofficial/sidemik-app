import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

type ConfirmDeleteDialogProps = {
    open: boolean;
    onConfirm: () => void ;
    onCancel: () => void;
    isLoading? : boolean
    title?: string;
    description?: string;
};

const ConfirmDeleteDialog = ({ open, onConfirm, onCancel, isLoading, title , description}: ConfirmDeleteDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title ? title :"Are you sure?"}</DialogTitle>
                </DialogHeader>
                <DialogDescription> {description ? description : 'This action cannot be undone. Are you sure you want to delete this data?'}</DialogDescription>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? "Deleting... ": 'Yes, delete it'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
