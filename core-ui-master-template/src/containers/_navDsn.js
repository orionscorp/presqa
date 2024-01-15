// import React, { useEffect, useState } from 'react'
// import CIcon from '@coreui/icons-react'
// import { api } from 'src/plugins/api';

const NavDsn = () => {
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
            //     name: 'Dashboard Dosen',
            //     to: '/dashboard-atma',
            //     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
            //     badge: {
            //         color: 'info',
            //         text: 'NEW',
            //     }
            // },

            {
                _tag: 'CSidebarNavDropdown',
                name: ' Course',
                route: '/course',
                icon: 'cil-puzzle',
                _children: [
                    // {
                    //     _tag: 'CSidebarNavItem',
                    //     name: 'Course List',
                    //     to: '/course/course-list',
                    // },
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Class List',
                        to: '/lecturer-class/lecturer-class-list',
                    },
                ]
            },
        ]

    } else {
        // history.push('/login')
    }
}

const _navDsn = NavDsn();

export default _navDsn