import React from "react";
import {
    CButton,
    CCard,
    CCol,
    CCardHeader,
    CLink,
    CRow,
    CCardBody,
    CForm,
    CInputGroup,
    CInput,
    CInputGroupText,
    CCardGroup,
    // CFormGroup,
    // CLabel,
    CSelect,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import CIcon from '@coreui/icons-react'

const AddKelas = () => {
    const hariList = [
        {
            hari: "Monday",
        },
        {
            hari: "Tuesday",
        },
        {
            hari: "Wednesday",
        },
        {
            hari: "Thursday",
        },
        {
            hari: "Friday",
        },
    ]

    const sesiList = [
        {
            sesi: "Session 1",
        },
        {
            sesi: "Session 2",
        },
        {
            sesi: "Session 3",
        },
        {
            sesi: "Session 4",
        },
    ]

    const token = localStorage.getItem('token');

    const [name, setName] = useState('')
    const [matkul, setMatkul] = useState('')
    const [hari, setHari] = useState('')
    const [sesi, setSesi] = useState('')

    const [course, setCourse] = useState([])

    const [oneCourse, setOneCourse] = useState('')
    const [oneDosen, setOneDosen] = useState('')

    const history = useHistory();

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const createKelas = (event) => {
        event.preventDefault();

        const class_password = makeid(5);

        api
            .post('/kelas',
                {
                    name: name,
                    matkul_id: matkul,
                    hari: hari,
                    sesi: sesi,
                    password_kelas: class_password,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Class success!", "success");
                history.push('/class/class-list')
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getAllCourse = () => {
        api
            .get(`/matkul`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setCourse(response.data.matkul)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getAllCourse();
    }, [])

    useEffect(() => {
        getCourse()
    }, [matkul])

    const getCourse = () => {
        api
            .get(`/matkul/${matkul}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setOneCourse(response.data.matkul)
                setOneDosen(response.data.dosen)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Confirm create for a new class!",
            text: `Name: ${name}\nCourse: ${oneCourse.matkul_name}\nLecturer: ${oneDosen.dosen_name}\nSchedule: ${hari} - ${sesi}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    createKelas(event)
                } else {
                    await swal("Create Class Cancelled!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h2>Add Class</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right" xs="3">
                                        <CLink to={{ pathname: "/class/class-list" }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post"
                                    onSubmit={(event) => confirmEditQuestion(event)}
                                >
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Class Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Aljabar Linear A"
                                                    required
                                                    onChange={(event) => setName(event.target.value)}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Choose Course</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => setMatkul(event.target.value)}
                                                    required
                                                >
                                                    <option value="" hidden>Select Course</option>
                                                    {
                                                        course.map((d, i) => {
                                                            return (
                                                                <option key={i} value={d.matkul_id}>{d.matkul_name} - {d.dosen_name}</option>
                                                            )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Choose Day</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => setHari(event.target.value)}
                                                    required
                                                >
                                                    <option value="" hidden>Select Day</option>
                                                    {
                                                        hariList.map((d, i) => {
                                                            return (
                                                                <option key={i} value={d.hari}>{d.hari}</option>
                                                            )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Choose Session</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => setSesi(event.target.value)}
                                                    required
                                                >
                                                    <option value="" hidden>Select Session</option>
                                                    {
                                                        sesiList.map((d, i) => {
                                                            return (
                                                                <option key={i} value={d.sesi}>{d.sesi}</option>
                                                            )
                                                        })
                                                    }
                                                </CSelect>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="success" className="px-4" type="submit">
                                                Create
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div>
    )
}

export default AddKelas;