import React, { useState } from "react";
// import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardImg,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { api } from "src/plugins/api";
import swal from "sweetalert";
import Logo from '../../iconAtma/prepitem.png'
import { HOST_URL } from "src/plugins/api";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      // console.log(response);
      if (response.data.user.dosen_id == null && response.data.user.mahasiswa_id == null) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'admin');
        // window.location.href = '/';
        window.location.assign(`${HOST_URL}:3000/mahasiswa/mahasiswa-list`);
        // window.location.assign(`${HOST_URL}/mahasiswa/mahasiswa-list`);
        // history.push('/')
      } else if (response.data.user.dosen_id != null && response.data.user.mahasiswa_id == null) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'dosen');
        window.location.href = 'http://127.0.0.1:3000/lecturer-class/lecturer-class-list';
        // window.location.assign(`${HOST_URL}/lecturer-class/lecturer-class-list`);
      } else {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', 'mahasiswa');
        // window.location.assign(`${HOST_URL}/class/class-select`);
        window.location.href = 'http://127.0.0.1:3000/class/class-select';
        // history.push('/class/class-select')
      }

      // localStorage.setItem('role', response.data.role);

      // window.location.href = '/';
    } catch (error) {
      // console.log(error)
      swal("Warning", "Invalid Email or Password", "warning");
      setError('Invalid email or password');
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6" xs="12">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CCard className='d-flex justify-content-center mb-4 border-0' style={{ height: '175', width: '60%', marginLeft: '20%' }}>
                    <CCardImg className='card-img-top p-4' orientation="top" src={Logo}></CCardImg>
                  </CCard>
                  <CForm onSubmit={(e) => handleSubmit(e)}>
                    <h3 className='text-center'>Log in</h3>
                    <br />
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" onChange={e => setEmail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol className='text-right'>
                        <CButton color="primary" type="submit">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LoginForm;