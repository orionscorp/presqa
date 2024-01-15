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
    CLabel,
    CFormGroup,
    CInputRadio,
    // CFormCheck,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddMinggu = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        kelas_name: '',
        hari: '',
        sesi: '',
    })

    const [matkul, setMatkul] = useState({
        matkul_name: '',
        dosen_name: '',
    })

    const { id } = useParams();

    const listMinggu = [
        {
            minggu_ke: "1",
        },
        {
            minggu_ke: "2",
        },
        {
            minggu_ke: "3",
        },
        {
            minggu_ke: "4",
        },
        {
            minggu_ke: "5",
        },
        {
            minggu_ke: "6",
        },
        {
            minggu_ke: "7",
        },
        {
            minggu_ke: "8",
        },
        {
            minggu_ke: "9",
        },
        {
            minggu_ke: "10",
        },
        {
            minggu_ke: "11",
        },
        {
            minggu_ke: "12",
        },
        {
            minggu_ke: "13",
        },
        {
            minggu_ke: "14",
        },
        {
            minggu_ke: "15",
        },
        {
            minggu_ke: "16",
        },
    ]

    const history = useHistory();

    const [minggu, setMinggu] = useState('')

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

    const addWeek = (event) => {
        event.preventDefault()

        const class_password = makeid(5);

        api.post('/add-week', {
            password_kelas: class_password,
            kelas_id: id,
            minggu_ke: minggu,
        }
            , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(async response => {
                await swal("Good job!", "Open Class Success!", "success");
                history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}`)
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
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

        getData();
    }, [id])

    // console.log(minggu);

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10">
                                        <h2>Open Class</h2>
                                    </CCol>
                                    <CCol md="2" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post" onSubmit={(event) => addWeek(event)}>
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Class Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    disabled
                                                    defaultValue={data.kelas_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Course</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Course Name"
                                                    disabled
                                                    defaultValue={matkul.matkul_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Lecture Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Lecture Name"
                                                    disabled
                                                    defaultValue={matkul.dosen_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Day</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Day"
                                                    disabled
                                                    defaultValue={data.hari}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Session</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Session"
                                                    disabled
                                                    defaultValue={data.sesi}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CFormGroup row>
                                        <CCol md="2">
                                            <CInputGroupText>Week - </CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            {
                                                listMinggu.map((d, i) => {
                                                    return (
                                                        <CFormGroup variant="checkbox" key={i}>
                                                            <CInputRadio className="form-check-input" id={i} name="radios" value={d.minggu_ke} onChange={(event) => setMinggu(event.target.value)}
                                                                required />
                                                            <CLabel variant="checkbox" htmlFor={i}>{d.minggu_ke}</CLabel>
                                                        </CFormGroup>
                                                    )
                                                })
                                            }
                                        </CCol>
                                    </CFormGroup>

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Open Class
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div >
    )
}

export default AddMinggu;