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
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
// import CIcon from '@coreui/icons-react'
// import { freeSet } from '@coreui/icons'
// import parse from 'html-react-parser';

const KoreksiJawaban = () => {
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
                            "saran": data.saran_dosen
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

        getData()
        getWeek()
        nilaiJawaban()
    }, [id])


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
                                    // disabled
                                    required
                                    value={quiz[key]['score'] == null ? "-" : quiz[key]['score']}
                                    onChange={(event) => { handleChangeEditorScore(event, key) }}
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
                                    // disabled
                                    // required
                                    value={quiz[key]['saran'] == null ? "-" : quiz[key]['saran']}
                                    onChange={(event) => { handleChangeEditorSaran(event, key) }}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>

                    <hr></hr>
                </div>
            )
        })
    }

    const handleChangeEditorScore = (e, key) => {
        var new_questions = {
            "id": quiz[key]['id'],
            "pertanyaan": quiz[key]['pertanyaan'],
            "pilihanA": quiz[key]['pilihanA'],
            "pilihanB": quiz[key]['pilihanB'],
            "pilihanC": quiz[key]['pilihanC'],
            "jawaban": quiz[key]['jawaban'],
            "jawaban_mhs": quiz[key]['jawaban_mhs'],
            "score": e.target.value,
            "saran": quiz[key]['saran'],
        };
        setQuiz({ ...quiz, [key]: new_questions })
    }

    const handleChangeEditorSaran = (e, key) => {
        var new_questions = {
            "id": quiz[key]['id'],
            "pertanyaan": quiz[key]['pertanyaan'],
            "pilihanA": quiz[key]['pilihanA'],
            "pilihanB": quiz[key]['pilihanB'],
            "pilihanC": quiz[key]['pilihanC'],
            "jawaban": quiz[key]['jawaban'],
            "jawaban_mhs": quiz[key]['jawaban_mhs'],
            "score": quiz[key]['score'],
            "saran": e.target.value,
        };
        setQuiz({ ...quiz, [key]: new_questions })
    }

    const updateScore = (event) => {
        event.preventDefault();

        api.post('/koreksi-jawaban', {
            quiz: JSON.stringify(quiz),
            id: mid,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async response => {
            await swal("Good job!", "Submit Score Success!", "success");
            history.replace(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/question-list`)
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            {
                loadingpage
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
                                            <CForm method="post"
                                            // onSubmit={(event) => updateScore(event)}
                                            >
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

                                            <CCardHeader>
                                                <CRow>
                                                    <CCol md="8" sm="9">
                                                        <h2>Questions & Answers</h2>
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

                                            <CForm method="post"
                                                onSubmit={(event) => updateScore(event)}>
                                                <CCardBody>
                                                    {
                                                        loading ?
                                                            "Loading..."
                                                            :
                                                            quiz == null
                                                                ?
                                                                <h3>This student is yet to answer this quiz!</h3>
                                                                :
                                                                <div>
                                                                    {
                                                                        tampilSoal()
                                                                    }
                                                                    {/* <h2>Total Score : {nilai}</h2> */}
                                                                </div>

                                                    }

                                                    {
                                                        quiz == null
                                                            ?
                                                            <></>
                                                            :
                                                            <CRow className="text-center">
                                                                <CCol>
                                                                    <CButton color="success" className="px-4" type="submit">
                                                                        Submit
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                    }

                                                </CCardBody>
                                            </CForm>

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

export default KoreksiJawaban;