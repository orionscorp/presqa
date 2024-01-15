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
    CSelect,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditKelasDosen = () => {
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

    const { id } = useParams();

    const history = useHistory();

    const [data, setData] = useState({
        kelas_name: '',
        hari: '',
        sesi: '',
    })

    const [matkul, setMatkul] = useState({
        matkul_name: '',
        dosen_name: '',
        matkul_id: '',
    })

    const [course, setCourse] = useState([])

    const updateKelas = (event) => {
        event.preventDefault();

        api
            .put(`/kelas/${id}`,
                {
                    name: data.kelas_name,
                    matkul_id: matkul.matkul_id,
                    hari: data.hari,
                    sesi: data.sesi,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Update Class success!", "success");
                history.push('/lecturer-class/lecturer-class-list')
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChangeCourse = (event) => {
        setMatkul(matkul => ({
            ...matkul,
            matkul_id: event.target.value,
            matkul_name: event.target.value,
            dosen_name: event.target.value,
        }));
    }

    const handleChangeDay = (event) => {
        setData(data => ({
            ...data,
            hari: event.target.value,
        }));
    }

    const handleChangeSession = (event) => {
        setData(data => ({
            ...data,
            sesi: event.target.value,
        }));
    }

    useEffect(() => {
        const getData = () => {
            api
                .get(`/kelas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.kelas)
                    setMatkul(response.data.matkul)
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

        getData();
        getAllCourse();
    }, [id])

    useEffect(() => {
        getCourse()
    }, [matkul.matkul_id])

    const [oneCourse, setOneCourse] = useState('')
    const [oneDosen, setOneDosen] = useState('')

    const getCourse = () => {
        api
            .get(`/matkul/${matkul.matkul_id}`, {
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
            title: "Confirm edit for:",
            text: `Name: ${data.kelas_name}\nCourse: ${oneCourse.matkul_name}\nLecturer: ${oneDosen.dosen_name}\nSchedule: ${data.hari} - ${data.sesi}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    updateKelas(event)
                } else {
                    await swal("Edit Class Cancelled!");
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
                                        <h2>Edit Class</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: "/lecturer-class/lecturer-class-list" }}>
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
                                                    placeholder="Alexa"
                                                    required
                                                    defaultValue={data.kelas_name}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            kelas_name: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Course</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => handleChangeCourse(event)}
                                                >
                                                    <option value={matkul.matkul_id} hidden>{matkul.matkul_name} - {matkul.dosen_name}</option>
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
                                                <CInputGroupText>Day</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => handleChangeDay(event)}
                                                >
                                                    <option value={data.hari} hidden>{data.hari}</option>
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
                                                <CInputGroupText>Session</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name="select" id="select"
                                                    onChange={(event) => handleChangeSession(event)}
                                                >
                                                    <option value={data.sesi} hidden>{data.sesi}</option>
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
                                                Update
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

export default EditKelasDosen;