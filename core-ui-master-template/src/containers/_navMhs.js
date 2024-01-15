// import React, { useEffect, useState } from 'react'
// import CIcon from '@coreui/icons-react'
// import { api } from 'src/plugins/api';

const NavMhs = () => {
    const token = localStorage.getItem("token");

    if (token) {
        return [
            // {
            //     _tag: 'CSidebarNavItem',
            //     name: 'Dashboard',
            //     to: '/dashboard',
            //     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
            //     badge: {
            //         color: 'info',
            //         text: 'NEW',
            //     }
            // },
            // {
            //     _tag: 'CSidebarNavItem',
            //     name: 'Login',
            //     to: '/loginAtma',
            //     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
            //     badge: {
            //         color: 'info',
            //         text: 'NEW',
            //     }
            // },

            // {
            //     _tag: 'CSidebarNavItem',
            //     name: 'Dashboard Mahasiswa',
            //     to: '/dashboard-atma',
            //     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
            //     badge: {
            //         color: 'info',
            //         text: 'NEW',
            //     }
            // },

            {
                _tag: 'CSidebarNavDropdown',
                name: ' Class',
                route: '/class',
                icon: 'cil-puzzle',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Select Class',
                        to: '/class/class-select',
                    },
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Enroll History',
                        to: '/class/student-class-list',
                    },
                ]
            },
        ]

    } else {
        // history.push('/login')
        // console.log('test');
    }
}

const _navMhs = NavMhs();

export default _navMhs