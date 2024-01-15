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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const AddPertanyaanMhs = () => {
    const token = localStorage.getItem('token');

    const { classid, weekid } = useParams()

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])
    const [pertanyaan, setPertanyaan] = useState('')


    const history = useHistory();

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

    const createQuestion = (event) => {
        event.preventDefault();

        api
            .post('/pertanyaan',
                {
                    pertanyaan: pertanyaan,
                    mahasiswa_id: userLog.id,
                    minggukelas_id: weekid,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Question success!", "success");
                history.push(`/class/student-class-list/${classid}/${weekid}`)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChangeEditor = (editor) => {
        setPertanyaan(editor.getData())
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
    }, [])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Create the following question?",
            content: {
                element: 'div',
                attributes: {
                    innerHTML: `${pertanyaan}`,
                },
            },
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    createQuestion(event)
                } else {
                    await swal("Create Lecturer Cancelled!");
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
                                        <h2>Add Question</h2>
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
                                                <CKEditor name="description" id="description"
                                                    editor={ClassicEditor}
                                                    // data={this.props.description}
                                                    onChange={(event, editor) => { handleChangeEditor(editor) }}
                                                />
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol>
                                                {
                                                    userLog.stats === "0"
                                                        ?
                                                        <h4>You're asking as <b>Anonymous</b></h4>
                                                        :
                                                        <h4>You're asking as <b>{userLog.name}</b></h4>
                                                }

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

export default AddPertanyaanMhs;