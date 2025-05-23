'use client';

import {
    BookA,
    BookCheckIcon,
    BookCopy,
    BookOpen,
    CircleHelp,
    DatabaseIcon,
    DollarSign,
    HistoryIcon,
    InboxIcon,
    LaptopMinimalCheck,
    LayersIcon,
    LibraryIcon,
    LucideHandshake,
    LucideIcon,
    LucideLandmark,
    NewspaperIcon,
    Repeat2,
    Settings2,
    SwatchBookIcon,
    TrophyIcon,
    UserPlus2Icon,
    Users,
    Library ,
    Users2,
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-project';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import { NavItem } from '@/types';

export interface AppData {
    teams: {
        name: string;
        logo: LucideIcon;
        plan: string;
    }[];
    navMain: NavItem[];
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
    }[];
}

const data: AppData = {
    teams: [
        {
            // Sistem Informasi Akademik
            name: 'SIDEMIK',
            logo: LayersIcon,
            plan: 'Enterprise',
        },
        {
            // Sistem Informasi Keuangan
            name: 'SIMKEU',
            logo: DollarSign,
            plan: 'Growth',
        },
        {
            // Sistem Informasi Kepagawaian
            name: 'SIMPEG',
            logo: Users2,
            plan: 'Business',
        },
        {
            // Sistem Informasi Seleksi Penerimaan Mahasiswa Baru
            name: 'SIPEMA',
            logo: UserPlus2Icon,
            plan: 'Professional',
        },
        {
            // Sistem Informasi Pencegahan dan Penanganan Kekerasan Perguruan Tinggi
            name: 'SIPPKPT',
            logo: LucideHandshake,
            plan: 'Premium',
        },
        {
            // Sistem Informasi Akreditasi
            name: 'SIMASI',
            logo: TrophyIcon,
            plan: 'Enterprise',
        },
        {
            // Sistem Informasi Computer Based Test
            name: 'SICBT',
            logo: LaptopMinimalCheck,
            plan: 'Free',
        },
        {
            // Sistem Informasi Merdeka Belajar Kampus Merdeka
            name: 'SIMBKM',
            logo: Repeat2,
            plan: 'Free',
        },
    ],
    
    navMain: [
        {
            title: 'Akademik',
            url: '#',
            icon: Library ,
            items: [
                {
                    title: 'Academic Year',
                    url: '/academic-year',
                },
                {
                    title: 'Academic Period',
                    url: '/academic-period',
                },
                {
                    title: 'Fakultas',
                    url: '/faculty',
                },
                {
                    title: 'Progaram Studi',
                    url: '/study-program',
                },
                {
                    title: 'Kurikulum',
                    url: '/curriculum',
                },
                {
                    title: 'Stambuk',
                    url: '/stambuk',
                },
                {
                    title: 'Jenis Mata Kuliah',
                    url: '/course-type',
                },
                {
                    title: 'Kelompok Mata Kuliah',
                    url: '/course-group',
                },
                {
                    title: 'Mata Kuliah Pilihan',
                    url: '/elective-course-groups',
                },
                {
                    title: 'Mata Kuliah',
                    url: '/course',
                },
            ]
        },
        {
            title: 'Resource',
            url: '#',
            icon: DatabaseIcon,
            isActive: false,
            items: [
                {
                    title: 'Students',
                    url: '/students',
                },
                {
                    title: 'Room',
                    url: '#',
                },
                {
                    title: 'Class',
                    url: '/class',
                },
                {
                    title: 'Student Batch',
                    url: '#',
                },
                {
                    title: 'Final Project Type',
                    url: '/final-project-type',
                },
            ],
        },
        {
            title: 'Supplementary Data',
            url: '#',
            icon: LucideLandmark,
            items: [
                {
                    title: 'Profile University',
                    url: 'resources/university-profile',
                },
                
                {
                    title: 'Waktu Kuliah',
                    url: '/waktu-kuliah',
                },
                {
                    title: 'Jam Kuliah',
                    url: '/jam-kuliah',
                },
                {
                    title: 'Univ Level Academic',
                    url: '/univ-level-education',
                },
                
            ],
        },

        {
            title: 'Employee',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'Pegawai',
                    url: '/employee',
                },
                {
                    title: 'Jabatan Struktural',
                    url: '/structural-position',
                },
                {
                    title: 'Jabatan Fungsional',
                    url: '/functional-position',
                },
                {
                    title: 'Status Dosen',
                    url: '/lecture-status',
                },
                {
                    title: 'Status Tendik',
                    url: '/staff-status',
                },
                {
                    title: 'Divisi Tendik',
                    url: '/staff-division',
                },
                
                // {
                //     title: 'Administrative Staff',
                //     url: '#',
                // },
                // {
                //     title: 'Employee Document',
                //     url: '/employee-document',
                // },
                // {
                //     title: 'Document Type',
                //     url: '/document-type',
                // },
                // {
                //     title: 'Active Statuses',
                //     url: '/active-status',
                // },
                // {
                //     title: 'Employee Relationship',
                //     url: '/employee-relationship',
                // },
                // {
                //     title: 'Academic Position',
                //     url: '/academic-position',
                // },
                // {
                //     title: 'Academic Position Types',
                //     url: '/academic-position-types',
                // },
                
            ],
        },
        {
            title: 'Assessment',
            url: '#',
            icon: BookCheckIcon,
            items: [
                {
                    title: 'Midterm Exam',
                    url: '#',
                },
                {
                    title: 'Final Exam',
                    url: '#',
                },
            ],
        },
        {
            title: 'Correspondence',
            url: '#',
            icon: SwatchBookIcon,
            items: [
                {
                    title: 'Certificate of Enrollment',
                    url: '#',
                },
                {
                    title: 'Letter of Resignation',
                    url: '#',
                },
                {
                    title: 'Leave of Absence Letter',
                    url: '#',
                },
            ],
        },
        {
            title: 'Report Academic',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
            ],
        },
        {
            title: 'Questionnaire',
            url: '#',
            icon: InboxIcon,
            items: [
                {
                    title: 'Lecture',
                    url: '#',
                },
                {
                    title: 'Head of Study Program',
                    url: '#',
                },
            ],
        },
        {
            title: 'News Management',
            url: '#',
            icon: NewspaperIcon,
            items: [
                {
                    title: 'News',
                    url: '#',
                },
                {
                    title: 'News Category',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Payments',
                    url: '#',
                },
                {
                    title: 'Application',
                    url: '#',
                },
                {
                    title: 'Notification',
                    url: '#',
                },
            ],
        },
        {
            title: 'Accreditation',
            url: '#',
            icon: BookA,
            items: [
                {
                    title: 'Accreditation Prodi',
                    url: '/prodi-accreditation',
                },
                {
                    title: 'Accreditation Agency',
                    url: '/accreditation-agency',
                },
            ],
        },
        {
            title: 'Education',
            url: '#',
            icon: BookCopy,
            items: [
                {
                    title: 'Education Level',
                    url: '/education-level',
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Documentation',
            url: '#',
            icon: LibraryIcon,
        },
        {
            name: 'History',
            url: '#',
            icon: HistoryIcon,
        },
        {
            name: 'Help Center',
            url: '#',
            icon: CircleHelp,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <SidebarMenu>
                    <SidebarMenuItem>
                        {/* <SidebarMenuButton size={'lg'} asChild>
                            <Link href={'/dashboard'}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
