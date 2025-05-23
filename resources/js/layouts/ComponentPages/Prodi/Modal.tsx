import { Button } from '@/components/ui/button';
import { FormSelectInput, FormTextInput } from '@/components/ui/Components_1/FormInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/swicth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useStudyProgram } from './useStudy-program';

type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    submit: (data: Omit<any, 'id'>, id?: number) => void;
    defaultValues?: any;
};
const schema = z.object({
    sp_code: z.string().min(1),
    idn_sp_name: z.string().min(3),
    eng_sp_name: z.string().min(3),
    sp_short_name: z.string().min(1),
    sp_address: z.string().nullable(),
    sp_phone: z.string().nullable(),
    sp_email_address: z.string().nullable(),
    sp_web_address: z.string().nullable(),
    sp_description: z.string().nullable(),
    sp_vision: z.string().nullable(),
    sp_mission: z.string().nullable(),
    sp_competencies: z.string().nullable(),
    program_learning_outcomes: z.string().nullable(),
    max_semester: z.number().positive(),
    faculty_id: z.string(),
    final_project_types_id: z.string(),
    status: z.boolean(),
});

type FormInputs = z.infer<typeof schema>;

const ModalForm = ({ open, onOpenChange, submit, defaultValues }: ModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                sp_code: defaultValues.sp_code || '',
                idn_sp_name: defaultValues.idn_sp_name || '',
                eng_sp_name: defaultValues.eng_sp_name || '',
                sp_short_name: defaultValues.sp_short_name || '',
                sp_address: defaultValues.sp_address || '',
                sp_phone: defaultValues.sp_phone || '',
                sp_email_address: defaultValues.sp_email_address || '',
                sp_web_address: defaultValues.sp_web_address || '',
                sp_description: defaultValues.sp_description || '',
                sp_vision: defaultValues.sp_vision || '',
                sp_mission: defaultValues.sp_mission || '',
                sp_competencies: defaultValues.sp_competencies || '',
                program_learning_outcomes: defaultValues.program_learning_outcomes || '',
                max_semester: defaultValues.max_semester || null,
                faculty_id: String(defaultValues.faculty_id) || '',
                final_project_types_id: String(defaultValues.final_project_types_id) || '',
                status: Boolean(defaultValues.status),
            });
        } else {
            reset({
                sp_code: '',
                idn_sp_name: '',
                eng_sp_name: '',
                sp_short_name: '',
                sp_address: '',
                sp_phone: '',
                sp_email_address: '',
                sp_web_address: '',
                sp_description: '',
                sp_vision: '',
                sp_mission: '',
                sp_competencies: '',
                program_learning_outcomes: '',
                max_semester: null,
                faculty_id: '',
                final_project_types_id: '',
                status: true,
            });
        }
    }, [defaultValues, reset]);

    const { Facultas, AcademicPeriod, fecthRelasi } = useStudyProgram();

    useEffect(() => {
        fecthRelasi();
    }, []);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const result = await submit(data, defaultValues?.id);
            if (result != null && !isSubmitting && !defaultValues) {
                reset({
                    sp_code: '',
                    idn_sp_name: '',
                    eng_sp_name: '',
                    sp_short_name: '',
                    sp_address: '',
                    sp_phone: '',
                    sp_email_address: '',
                    sp_web_address: '',
                    sp_description: '',
                    sp_vision: '',
                    sp_mission: '',
                    sp_competencies: '',
                    program_learning_outcomes: '',
                    max_semester: null,
                    faculty_id: '',
                    final_project_types_id: '',
                    status: true,
                });
            }
        } catch (error: any) {
            const errorsData = error?.data;
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden p-6">
                <DialogHeader>
                    <DialogTitle>{defaultValues ? 'Edit Study-Program' : 'Add Study-Program'}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] pr-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Controller
                                name="faculty_id"
                                control={control}
                                render={({ field }) => (
                                    <FormSelectInput
                                        id="faculty_id"
                                        label={<> Fakultas <span className="text-red-500">*</span></>}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        error={errors.faculty_id?.message}
                                    >
                                        {Facultas.map((Fakultas: any) => (
                                            <SelectItem key={Fakultas.id} value={String(Fakultas.id)}>
                                                {Fakultas.name}
                                            </SelectItem>
                                        ))}
                                    </FormSelectInput>
                                )}
                            />
                            <FormTextInput
                                id="sp_code"
                                placeholder="Masukan Kode prodi"
                                label={<> kode <span className="text-red-500">*</span></>}
                                {...register('sp_code')}
                                error={errors.sp_code?.message}
                            />
                            <FormTextInput
                                id="idn_sp_name"
                                placeholder="Masukan Nama Prodi"
                                label={<> Nama Prodi (ID) <span className="text-red-500">*</span></>}
                                {...register('idn_sp_name')}
                                error={errors.idn_sp_name?.message}
                            />
                            <FormTextInput
                                id="eng_sp_name"
                                label={<> Nama Prodi (ENG) <span className="text-red-500">*</span></>}
                                placeholder="Masukan Nama Prodi dalam b.ing"
                                {...register('eng_sp_name')}
                                error={errors.eng_sp_name?.message}
                            />
                            <FormTextInput
                                id="sp_short_name"
                                label={<> Singkatan <span className="text-red-500">*</span></>}
                                placeholder="Masukan singkatan prodi"
                                type="text"
                                {...register('sp_short_name')}
                                error={errors.sp_short_name?.message}
                            />
                            {/* <FormTextInput
                                id="sp_address"
                                label="Address"
                                type="text"
                                {...register('sp_address')}
                                error={errors.sp_address?.message}
                            />
                            <FormTextInput id="sp_phone" label="Phone" {...register('sp_phone')} error={errors.sp_phone?.message} />
                            <FormTextInput
                                id="sp_email_address"
                                label="Email"
                                type="email"
                                {...register('sp_email_address')}
                                error={errors.sp_email_address?.message}
                            />
                            <FormTextInput
                                id="sp_web_address"
                                label="Website"
                                type="url"
                                {...register('sp_web_address')}
                                error={errors.sp_web_address?.message}
                            />
                            <FormTextInput
                                id="sp_competencies"
                                label="Competencies"
                                {...register('sp_competencies')}
                                error={errors.sp_competencies?.message}
                            />
                            <FormTextInput
                                id="program_learning_outcomes"
                                label="Learning Outcomes"
                                {...register('program_learning_outcomes')}
                                error={errors.program_learning_outcomes?.message}
                            /> */}
                            <FormTextInput
                                id="max_semester"
                                label={<> MAX Semester <span className="text-red-500">*</span></>}
                                type="number"
                                placeholder="Masukan Jumlah max semester"
                                {...register('max_semester', { valueAsNumber: true })}
                                error={errors.max_semester?.message}
                            />
                            {/* <FormTextInput
                                id="sp_vision"
                                label="Vissi"
                                type="textarea"
                                {...register('sp_vision')}
                                error={errors.sp_vision?.message}
                            />
                            <FormTextInput
                                id="sp_mission"
                                label="Missi"
                                type="textarea"
                                {...register('sp_mission')}
                                error={errors.sp_mission?.message}
                            />
                            <FormTextInput
                                id="sp_description"
                                label="Keterangan"
                                type="textarea"
                                {...register('sp_description')}
                                error={errors.sp_description?.message}
                            /> */}
                            <div className="pt-2">
                                <Label>Status</Label>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-center gap-4">
                                            <Switch checked={field.value} onCheckedChange={field.onChange} id="status" />
                                            <Label htmlFor="status">{field.value ? 'Active' : 'Non Aktif'}</Label>
                                        </div>
                                    )}
                                />
                            </div>
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
