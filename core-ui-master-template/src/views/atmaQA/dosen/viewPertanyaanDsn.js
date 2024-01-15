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
    // CFormCheck,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewPertanyaanDsn = () => {
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

    const { id, weekid } = useParams();

    const history = useHistory();

    const [week, setWeek] = useState([])
    const [pertanyaan, setPertanyaan] = useState([])

    const [loading, setLoading] = useState(true)

    const [quiz, setQuiz] = useState({})

    // console.log(weekid);
    // console.log(id);

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

        const getWeek = () => {
            api
                .post(`/getOne-week`, {
                    weekid: weekid
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setWeek(response.data.week)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        const showQuiz = () => {
            api.post('/show-quiz', {
                id: weekid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                // console.log(response);
                const newObj = response.data.question.map(data => {
                    return {
                        "id": data.pertanyaandsn_id,
                        "pertanyaan": data.pertanyaan_dosen,
                        "pilihanA": data.pilihanA,
                        "pilihanB": data.pilihanB,
                        "pilihanC": data.pilihanC,
                        "jawaban": data.jawaban_benar,
                    }
                });
                setQuiz(newObj);
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
        }

        showQuiz()
        getData();
        getWeek()
    }, [id])

    // console.log(quiz);

    function tampilSoal() {
        return Object.keys(quiz).map((key) => {
            return (
                <div key={key}>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Question {+key + 1}</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    // placeholder="Alexa"
                                    disabled
                                    value={quiz[key]["pertanyaan"]}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Correct Answer</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    disabled
                                    value={quiz[key]['jawaban'] == null ? "-" : quiz[key]['jawaban']}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>

                    {
                        quiz[key]['pilihanA'] == null
                            ?
                            <></>
                            :
                            <div>
                                <CRow>
                                    <CInputGroup className="mb-3">
                                        <CCol md="3">
                                            <CInputGroupText>Option A</CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            <CInput
                                                type="text"
                                                disabled
                                                value={quiz[key]['pilihanA']}
                                            ></CInput>
                                        </CCol>
                                    </CInputGroup>
                                </CRow>

                                <CRow>
                                    <CInputGroup className="mb-3">
                                        <CCol md="3">
                                            <CInputGroupText>Option B</CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            <CInput
                                                type="text"
                                                disabled
                                                value={quiz[key]['pilihanB']}
                                            ></CInput>
                                        </CCol>
                                    </CInputGroup>
                                </CRow>

                                <CRow>
                                    <CInputGroup className="mb-3">
                                        <CCol md="3">
                                            <CInputGroupText>Option C</CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            <CInput
                                                type="text"
                                                disabled
                                                value={quiz[key]['pilihanC']}
                                            ></CInput>
                                        </CCol>
                                    </CInputGroup>
                                </CRow>
                            </div>

                    }
                    <hr></hr>
                </div>
            )
        })
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
                                        <h2>View Questions</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/question-list` }}>
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
                                                    defaultValue={data.kelas_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>
                                </CForm>

                                <CCardHeader>
                                    <CRow>
                                        <CCol md="8" sm="9">
                                            <h2>Questions</h2>
                                        </CCol>
                                        {/* <CCol md="4" sm="3" className="text-right">
                                            <CLink
                                            // to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}
                                            >
                                                <CButton color="primary">View Question</CButton>
                                            </CLink>
                                        </CCol> */}
                                    </CRow>
                                </CCardHeader>
                                <CCardBody>
                                    {
                                        loading ?
                                            "Loading..."
                                            :
                                            tampilSoal()
                                    }
                                </CCardBody>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div >
    )
}

export default ViewPertanyaanDsn;