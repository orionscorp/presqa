import React, { useEffect, useState } from 'react'
import {
  // CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import swal from "sweetalert";
import { api } from 'src/plugins/api';
import { freeSet } from '@coreui/icons'

import avatar from '../iconAtma/6.jpg'

import profileanon from '../iconAtma/profileanon.png'
import profile from '../iconAtma/profile.jpg'

const TheHeaderDropdown = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')

  const logout = () => {
    swal({
      title: "Warning",
      text: "Do you want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        api
          .post('/logout', { token: token, }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async response => {
            // setData(response.data.mahasiswa)
            await swal("Good Job!", "Logout Success!", "success");
            localStorage.clear('token');
            window.location.reload();
          })
          .catch(error => {
            swal("Oops", "Something went wrong", "warning");
          })
      } else {
        await swal("Logout cancelled!");
        window.location.reload();
      }
    });
  }

  const changeStatus = () => {
    swal({
      title: "Warning",
      text: "Do you want to change your visibility?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        api
          .post('/change-status-mahasiswa', { id: userLog.id, }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async response => {
            // setData(response.data.mahasiswa)
            await swal("Good Job!", "Change Status Success!", "success");
            window.location.reload();
          })
          .catch(error => {
            swal("Oops", "Something went wrong", "warning");
          })
      } else {
        await swal("Change status cancelled!");
        window.location.reload();
      }
    });
  }

  const [userLog, setUserLog] = useState([])

  // console.log(userLog);

  useEffect(() => {
    const getUserRole = () => {
      api
        .get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setUserLog(response.data.userloggedin)
        })
        .catch(error => {
          swal("Oops", "Something went wrong", "warning");
        })
    }

    getUserRole()
  }, [token])

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          {
            userLog.stats === "0"
              ?
              <CImg
                src={profileanon}
                className="c-avatar-img"
                alt="photo"
              />
              :
              <CImg
                src={profile}
                className="c-avatar-img"
                alt="photo"
              />
          }

        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon content={freeSet.cilUser} className="mfe-2" />
          {userLog.name}
        </CDropdownItem>

        <CDropdownItem>
          <CIcon content={freeSet.cilLaptop} className="mfe-2" />
          {role}
        </CDropdownItem>
        {
          role === "mahasiswa"
            ?
            <CDropdownItem onClick={(e) => changeStatus()}>
              <CIcon content={freeSet.cilTransfer} className="mfe-2" />
              {
                userLog.stats === "0"
                  ?
                  "Anonymous"
                  :
                  "Visible"
              }
            </CDropdownItem>
            :
            <></>
        }
        <CDropdownItem divider />
        <CDropdownItem onClick={(e) => logout()}>
          <CIcon content={freeSet.cilAccountLogout} className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown >
  )
}

export default TheHeaderDropdown
