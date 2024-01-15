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

const ViewJawabanMhs = () => {
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

    const { id, weekid, mid } = useParams();

    const history = useHistory();

    const [week, setWeek] = useState([])

    const [loading, setLoading] = useState(true)

    const [quiz, setQuiz] = useState({})

    const [npm, setNpm] = useState('')

    const [nilai, setNilai] = useState('')

    const [loadingpage, setloadingpage] = useState(true)

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

        const nilaiJawaban = () => {
            api.post('/nilai-jawaban', {
                id: weekid,
                mid: mid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                // console.log(response);
                if (response.data.nilai == null) {
                    setQuiz(null)
                    setLoading(false)
                    setloadingpage(false)
                } else {
                    const newObj = response.data.nilai.map(data => {
                        return {
                            "id": data.pertanyaandsn_id,
                            "pertanyaan": data.pertanyaan_dosen,
                            "pilihanA": data.pilihanA,
                            "pilihanB": data.pilihanB,
                            "pilihanC": data.pilihanC,
                            "jawaban": data.jawaban_benar,
                            "jawaban_mhs": data.jawaban,
                            "score": data.score,
                            "saran": data.saran_dosen,
                        }
                    });
                    setQuiz(newObj);
                    setNpm(response.data.npm)
                    setNilai(response.data.sum)
                    setLoading(false)
                    setloadingpage(false)
                }

            }).catch(error => {
                console.log(error);
            })
        }

        getData();
        getWeek()
        nilaiJawaban()
    }, [id])

    // console.log(week);

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
                                    disabled
                                    value={quiz[key]["pertanyaan"]}
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
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Student's Answer</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    disabled
                                    value={quiz[key]['jawaban_mhs'] == null ? "-" : quiz[key]['jawaban_mhs']}
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
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Score</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    disabled
                                    value={quiz[key]['score'] == null ? "-" : quiz[key]['score']}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Comment</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    disabled
                                    value={quiz[key]['saran'] == null ? "-" : quiz[key]['saran']}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>

                    <hr></hr>
                </div>
            )
        })
    }

    return (
        <>
            {
                loadingpage ?
                    <h1>Loading...</h1>
                    :
                    < div >
                        <CRow className="justify-content-center">
                            <CCol>
                                <CCardGroup>
                                    <CCard>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10" xs="9">
                                                    <h2>View Answers</h2>
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
                                                            <CInputGroupText>NPM</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Alexa"
                                                                disabled
                                                                defaultValue={npm.npm}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>
                                            </CForm>


                                        </CCardBody>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="8" sm="9">
                                                    <h3>Questions & Answers</h3>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                loading ?
                                                    "Loading..."
                                                    :
                                                    quiz != null
                                                        ?
                                                        <div>
                                                            {
                                                                tampilSoal()
                                                            }
                                                            <h2>Total Score : {nilai}</h2>
                                                        </div>
                                                        :
                                                        <h3>This student is yet to answer this quiz!</h3>
                                            }
                                        </CCardBody>
                                    </CCard>
                                </CCardGroup>
                            </CCol>
                        </CRow>
                    </div >
            }
        </>

    )
}

export default ViewJawabanMhs;