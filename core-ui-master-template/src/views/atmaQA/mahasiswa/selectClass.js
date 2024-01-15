import React, { useEffect, useState } from "react";
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
    CSelect
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SelectClass = () => {
    const token = localStorage.getItem('token');
    const [password, setPassword] = useState('');
    const [dataCourse, setDataCourse] = useState([])
    const [selected, setSelected] = useState({
        kelas_id: null,
    })

    const [userLog, setUserLog] = useState([])

    const history = useHistory();

    // console.log(selected);

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
                console.log(error);
            })
    }

    const handleClass = (event) => {
        event.preventDefault();

        api.post('/cek-kelas', {
            id: selected,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async response => {
            // console.log(selected);
            // console.log(response);
            if (password === response.data.kelas.password) {
                await api.post('/validate-enroll', {
                    kelas_id: selected,
                    mahasiswa_id: userLog.id,
                    enroll_code: password,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(async response => {
                    if (response.data.message == null) {
                        api.post('/set-enroll', {
                            kelas_id: selected,
                            mahasiswa_id: userLog.id,
                            enroll_code: password,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then(async response => {
                            // console.log(response);
                            await swal("Good job!", "Success!", "success");
                            history.push(`/class/student-class-list/${selected}`)
                        }).catch(error => {
                            console.log(error);
                        })
                    } else {
                        // console.log('okeh');
                        // await swal("Good job!", "Success!", "success");
                        history.push(`/class/student-class-list/${selected}`)
                    }
                })

            } else if (password !== response.data.kelas.password) {
                await swal("Alert!", "Password Incorrect!", "error");
            } else {
                await swal("Alert!", "Session Not Available!", "info");
            }
        })
    }

    useEffect(() => {
        const getDataCourse = () => {
            api
                .get(`/get-kelas-mhs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setDataCourse(response.data.kelas)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getDataCourse()
        getUserRole()
    }, [])


    return (
        <div className="c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm method="post"
                                        onSubmit={(event) => handleClass(event)}>
                                        <h3 className='text-center'>Select Class</h3>
                                        <br />
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-spreadsheet" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CSelect custom name="select" id="select"
                                                onChange={(event) => setSelected(event.target.value)}
                                                required
                                                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                                            >
                                                <option value="" hidden>Select Course</option>
                                                {
                                                    dataCourse.map((d, i) => {
                                                        return (
                                                            <option key={i} value={d.kelas_id}>{d.kelas_name} - {d.hari} {d.sesi} - Mr/Ms. {d.lecturer_name}</option>
                                                        )
                                                    })
                                                }
                                            </CSelect>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" placeholder="Enter Code" onChange={e => setPassword(e.target.value)} />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol className='text-right'>
                                                <CButton color="primary" type="submit">Submit</CButton>
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

export default SelectClass;