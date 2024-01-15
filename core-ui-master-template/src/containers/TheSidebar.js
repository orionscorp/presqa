import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  // CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { api } from 'src/plugins/api'
import swal from "sweetalert";
// import './style.css'
import '../scss/_variables.scss';
// import CIcon from '@coreui/icons-react'

import atmaQA from '../iconAtma/iconPutih.png'

// sidebar nav config
import navigation from './_nav'
import navigationDosen from './_navDsn'
import navigationMhs from './_navMhs'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const token = localStorage.getItem('token');

  const [data, setData] = useState([]);

  // const getData = () => {

  // };

  const setNav = () => {
    // event.preventDefault();

    if (data.role === "admin") {
      return navigation;
    } else if (data.role === "dosen") {
      return navigationDosen;
    } else {
      return navigationMhs;
    }
  }

  useEffect(() => {
    api
      .get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // console.log(response);
        setData(response.data.userloggedin)
      })
      .catch(error => {
        swal("Oops", "Something went wrong", "warning");
      })


  }, [token])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    // style={{ 'color': 'red', '--cui-sidebar-brand-color': '#000000', "--cui-sidebar-border-width": 100, '--cui-backdrop-bg': '#000000', '--cui-sidebar-padding-y': '20px' }}
    >
      <CSidebarBrand className="d-md-down-none" to="/"
      // style={{ 'color': 'red', '--cui-sidebar-brand-color': '#000000', "--cui-sidebar-border-width": 100, '--cui-backdrop-bg': '#000000', '--cui-sidebar-padding-y': '20px' }}

      >

        <CImg
          className="c-sidebar-brand-full"
          src={atmaQA}
          height={35} />

        <CImg
          className="c-sidebar-brand-minimized"
          src={atmaQA}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav
      // className="sidebar"
      >

        <CCreateElement
          items={setNav()}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}

        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
