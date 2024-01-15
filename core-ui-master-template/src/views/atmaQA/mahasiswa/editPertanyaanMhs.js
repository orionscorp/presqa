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
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './App.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const PertanyaanMhsDetail = () => {
    const token = localStorage.getItem('token');

    const { classid, weekid, questionid } = useParams()

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])
    const [pertanyaan, setPertanyaan] = useState({
        pertanyaan_mhs: "",
    })

    const history = useHistory();

    const [loading, setLoading] = useState(true)

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

    const getDataKelas = () => {
        api
            .post(`/cek-kelas-minggu`, {
                weekid: weekid,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setKelas(response.data.kelas)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getPertanyaan = () => {
        api
            .post(`/get-pertanyaan`, {
                pertanyaanmhs_id: questionid
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const updatePertanyaan = (event) => {
        event.preventDefault()

        api.put(`/pertanyaan/${questionid}`, {
            pertanyaan: pertanyaan.pertanyaan_mhs,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            await swal("Good job!", "Update Question success!", "success");
            history.push(`/class/student-class-list/${classid}/${weekid}`)
        }).catch(error => {
            console.log(error);
        })
    }

    const handleChangeEditor = (editor) => {
        setPertanyaan(pertanyaan => ({
            ...pertanyaan,
            pertanyaan_mhs: editor.getData()
        }))
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
        getPertanyaan()
    }, [])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Update the following question?",
            content: {
                element: 'div',
                attributes: {
                    innerHTML: `${pertanyaan.pertanyaan_mhs}`,
                },
            },
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    updatePertanyaan(event)
                } else {
                    await swal("Create Lecturer Cancelled!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            {
                loading
                    ?
                    <h1>Loading...</h1>
                    :
                    <div>
                        <CRow className="justify-content-center">
                            <CCol>
                                <CCardGroup>
                                    <CCard>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10" xs="9">
                                                    <h2>Edit Question</h2>
                                                </CCol>
                                                <CCol md="2" xs="3" className="text-right">
                                                    <CLink to={{ pathname: `/class/student-class-list/${classid}/${weekid}` }}>
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
                                                                disabled
                                                                defaultValue={kelas.kelas_name}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Question</CInputGroupText>
                                                        </CCol>
                                                        <CCol xs="12" md="10">
                                                            {/* <CTextarea
                                                    name="textarea-input"
                                                    id="textarea-input"
                                                    rows="9"
                                                    placeholder="Type your question here..."
                                                    defaultValue={pertanyaan.pertanyaan_mhs}
                                                    onChange={(event) => {
                                                        setPertanyaan({
                                                            ...pertanyaan,
                                                            pertanyaan_mhs: event.target.value,
                                                        });
                                                    }}
                                                /> */}
                                                            <CKEditor name="description" id="description"
                                                                editor={ClassicEditor}
                                                                data={pertanyaan.pertanyaan_mhs}
                                                                onChange={(event, editor) => { handleChangeEditor(editor) }}
                                                            />
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow className="text-center">
                                                    <CCol>
                                                        <CButton color="primary" className="px-4" type="submit">
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
            }
        </>
    )
}

export default PertanyaanMhsDetail;