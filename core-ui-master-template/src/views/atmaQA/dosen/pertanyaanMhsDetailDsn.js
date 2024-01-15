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
    CTextarea
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import DOMPurify from 'dompurify';
import '../mahasiswa/App.css'

const PertanyaanMhsDetailDsn = () => {
    const token = localStorage.getItem('token');

    const { id, weekid, questionid } = useParams()

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

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    useEffect(() => {
        getDataKelas()
        getUserRole()
        getPertanyaan()
    }, [])

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
                                                    <h2>Question Detail</h2>
                                                </CCol>
                                                <CCol md="2" xs="3" className="text-right">
                                                    <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}>
                                                        <CButton color="danger">Back</CButton>
                                                    </CLink>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>

                                        <CCardBody>
                                            <CForm method="post">
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
                                                    disabled
                                                    defaultValue={convertedText}
                                                /> */}
                                                            <div className="preview"
                                                                dangerouslySetInnerHTML={createMarkup(pertanyaan.pertanyaan_mhs)}>
                                                            </div>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Answer</CInputGroupText>
                                                        </CCol>
                                                        <CCol xs="12" md="10">
                                                            {
                                                                pertanyaan.jawaban_dosen == null ?
                                                                    <CTextarea
                                                                        name="textarea-input"
                                                                        id="textarea-input"
                                                                        rows="9"
                                                                        placeholder="Answer Here..."
                                                                        disabled
                                                                    // required
                                                                    // onChange={(event) => setPertanyaan(event.target.value)}
                                                                    />
                                                                    :
                                                                    <div className="preview"
                                                                        dangerouslySetInnerHTML={createMarkup(pertanyaan.jawaban_dosen)}>
                                                                    </div>
                                                            }


                                                        </CCol>
                                                    </CInputGroup>
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

export default PertanyaanMhsDetailDsn;