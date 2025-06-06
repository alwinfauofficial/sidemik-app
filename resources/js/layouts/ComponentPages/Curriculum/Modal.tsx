import { Button } from '@/components/ui/button';

import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCurriculum } from './useCurriculum';
import { Label } from '@/components/ui/label';
import YearPicker from '@/components/ui/Components_1/YearPicker';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};

const schema = z.object({
    code: z.string({ message: 'Code Harus Diisi' }),
    curriculum_year: z.string().regex(/^\d{4}$/, { message: 'kurikulum harus berupa 4 digit tahun (misal: 2025)' }),
    sks_required: z.number({ message: 'SKS wajib Diisi' }).positive('SKS harus diisi dengan bilangan positive'),
    sks_elective: z.number({ message: 'SKS wajib Diisi' }).positive('SKS harus diisi dengan bilangan positive'),
    // description: z.string().nullable(),
    study_programs_id: z.string({ message: 'Prodi wajib diisi' }),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                code: defaultValues.code || '',
                curriculum_year: defaultValues.curriculum_year || '',
                sks_required: defaultValues.sks_required || null,
                sks_elective: defaultValues.sks_elective || null,
                // description: defaultValues.description || '',
                study_programs_id: String(defaultValues.study_programs_id) || '',
            });
        } else {
            reset({
                code: '',
                curriculum_year: '',
                sks_required: null,
                sks_elective: null,
                // description: '',
                study_programs_id: '',
            });
        }
    }, [defaultValues, reset]);

    const { Prodi, fecthRelasi } = useCurriculum();

    useEffect(() => {
        fecthRelasi();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    code: '',
                    curriculum_year: '',
                    sks_required: null,
                    sks_elective: null,
                    // description: '',
                    study_programs_id: '',
                });
            }
        } catch (error: any) {
            const errorsData = error?.response.data;
            let lastErrorMessage = '';
            let firstErrorMessage = error.meta.message;

            Object.entries(errorsData).forEach(([field, messages], index) => {
                const messageText = (messages as string[])[0];
                lastErrorMessage = messageText;
            });

            let finalErrorMessage = firstErrorMessage.includes('Duplicate record') ? firstErrorMessage : lastErrorMessage;

            setError('root', {
                type: 'manual',
                message: finalErrorMessage,
            });
        }
    };
    const handleYearChange = (year: number) => {
        setValue('curriculum_year', String(year));
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Kurikulum' : 'Add Kurikulum'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="pt-1">
                                <Label>
                                    Tahun Kurikulum <span className="text-red-500">* </span>
                                </Label>
                                <div className="flex justify">
                                    <YearPicker 
                                    startYear={new Date().getFullYear() - 5}
                                    endYear={new Date().getFullYear() + 2}
                                    value={parseInt(defaultValues?.curriculum_year || new Date().getFullYear().toString())}
                                    onSelect={handleYearChange}
                                    />
                                </div>
                            </div>

                            <Controller
                                name="study_programs_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="study_programs_id"
                                        label={
                                            <>
                                            Prodi <span style={{color: 'red'}}>*</span>
                                            </>
                                        }
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.study_programs_id?.message}
                                    >
                                        {Prodi.map((Study: any) => (
                                            <SelectItem key={Study.id} value={String(Study.id)}>
                                                {Study.idn_sp_name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="code"
                                placeholder="Masukan Kode Kurikulum"
                                label={
                                    <>
                                    Kode <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                {...register('code')}
                                error={errors.code?.message}
                            />
                            <FormTextInput
                                id="sks_required"
                                label={
                                    <>
                                    SKS Wajib <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Jumlah SKS "
                                type="number"
                                {...register('sks_required', { valueAsNumber: true })}
                                error={errors.sks_required?.message}
                            />
                            <FormTextInput
                                id="sks_elective"
                                label={
                                    <>
                                    SKS Pilihan <span style={{color: 'red'}}>*</span>
                                    </>
                                }
                                placeholder="Masukan Jumlah SKS pilihan"
                                type="number"
                                {...register('sks_elective', { valueAsNumber: true })}
                                error={errors.sks_elective?.message}
                            />
                            {/* <FormTextInput
                                    id="description"
                                    label="Keterangan"
                                    type="textarea"
                                    {...register('description')}
                                    error={errors.description?.message}
                                />  */}
                            {errors.root && <p className="text-red-600">{errors.root.message}</p>}
                            <Button
                                type="submit"
                                className={`mb-5 rounded px-4 py-2 font-bold text-white ${
                                    defaultValues ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-500 hover:bg-green-600'
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : defaultValues ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
export default ModalForm;
