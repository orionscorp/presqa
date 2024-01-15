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

const PertanyaanMinggu = () => {
    const token = localStorage.getItem('token');

    const { classid, weekid } = useParams();

    const history = useHistory();

    const [week, setWeek] = useState([])

    const [masiLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState({})

    const [userLog, setUserLog] = useState([])

    const [eligibility, setEligibility] = useState(null)

    const [cekQuestions, setCekQuestions] = useState({})

    const [totalNilai, setTotalNilai] = useState(0)

    const [loadingPage, setLoadingPage] = useState(true)

    function addQuestionEssay() {
        // {"1": "asjkd", "2": "2"}
        return Object.keys(questions).map((key) => {
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
                                    placeholder="Alexa"
                                    // required
                                    disabled
                                    value={questions[key]["pertanyaan_dosen"]}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Answer {+key + 1}</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    // placeholder="Alexa"
                                    required
                                    value={questions[key]['jawaban']}
                                    onChange={(e) => { handleChangeEditorSimple(e, key) }}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <hr></hr>
                </div>
            );
        })
    }

    function addQuestionMulti() {
        // {"1": "asjkd", "2": "2"}
        return Object.keys(questions).map((key) => {
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
                                    placeholder="Alexa"
                                    // required
                                    disabled
                                    value={questions[key]["pertanyaan_dosen"]}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Answer {+key + 1}</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CFormGroup variant="checkbox" >
                                    <CInputRadio className="form-check-input" id={"a" + key} name={"radios" + key}
                                        value={questions[key]["pilihanA"]}
                                        onChange={(event) => { handleChangeEditorSimple(event, key) }}
                                    // required
                                    />
                                    <CLabel variant="checkbox" htmlFor={"a" + key}>
                                        A. {questions[key]["pilihanA"]}
                                    </CLabel>
                                </CFormGroup>

                                <CFormGroup variant="checkbox" >
                                    <CInputRadio className="form-check-input" id={"b" + key} name={"radios" + key}
                                        value={questions[key]["pilihanB"]}
                                        onChange={(event) => { handleChangeEditorSimple(event, key) }}
                                    // required
                                    />
                                    <CLabel variant="checkbox" htmlFor={"b" + key}>
                                        B. {questions[key]["pilihanB"]}
                                    </CLabel>
                                </CFormGroup>

                                <CFormGroup variant="checkbox">
                                    <CInputRadio className="form-check-input" id={"c" + key} name={"radios" + key}
                                        value={questions[key]["pilihanC"]}
                                        onChange={(event) => { handleChangeEditorSimple(event, key) }}
                                    // required
                                    />
                                    <CLabel variant="checkbox" htmlFor={"c" + key}>
                                        C. {questions[key]["pilihanC"]}
                                    </CLabel>
                                </CFormGroup>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <hr></hr>
                </div>
            );
        })
    }

    function tampilJawaban() {
        return Object.keys(cekQuestions).map((key) => {
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
                                    placeholder="Alexa"
                                    // required
                                    disabled
                                    value={cekQuestions[key]["pertanyaan"]}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Your Answer</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    // placeholder="Alexa"
                                    // required
                                    disabled
                                    value={cekQuestions[key]['jawaban']}
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
                                    // placeholder="Alexa"
                                    // required
                                    disabled
                                    value={cekQuestions[key]['benar'] == null ? "-" : cekQuestions[key]['benar']}
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
                                    // placeholder="Alexa"
                                    // required
                                    disabled
                                    value={cekQuestions[key]['skor']}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>

                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Lecturer's Comment</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    // placeholder="Alexa"
                                    // required
                                    disabled
                                    value={cekQuestions[key]['saran'] == null ? "-" : cekQuestions[key]['saran']}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <hr></hr>
                </div>

            )
        })
    }

    const handleChangeEditorSimple = (e, key) => {
        var new_questions = {
            "id": questions[key]["id"],
            "pertanyaan_dosen": questions[key]["pertanyaan_dosen"],
            "pilihanA": questions[key]["pilihanA"],
            "pilihanB": questions[key]["pilihanB"],
            "pilihanC": questions[key]["pilihanC"],
            "jawaban": e.target.value,
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    const addJawaban = (event) => {
        event.preventDefault();

        api.post('/add-jawaban', {
            jawaban: JSON.stringify(questions),
            id: userLog.id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async response => {
            await swal("Good job!", "Submit Answer Success!", "success");
            history.replace(`/class/student-class-list/${classid}`)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
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

        api.post('/get-quiz', {
            id: weekid,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // console.log();
            // response.data.question = [{"id": "1", "pertanyaan_dosen": "something", ...}, {"id": "2", ...}]
            if (response.data.question == null) {
                setQuestions(null)
                setLoading(false)
            } else {
                const newObj = response.data.question.map(data => {
                    return {
                        "id": data.pertanyaandsn_id,
                        "pertanyaan_dosen": data.pertanyaan_dosen,
                        "pilihanA": data.pilihanA,
                        "pilihanB": data.pilihanB,
                        "pilihanC": data.pilihanC,
                        "jawaban": "",
                    }
                });
                setQuestions(newObj);
                setLoading(false);
            }
        }).catch(error => {
            console.log(error);
        })

        const getUserRole = () => {
            api
                .get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setUserLog(response.data.userloggedin)

                    api.post('/cek-jawab', {
                        id: weekid,
                        mid: response.data.userloggedin.id
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then(response => {
                        setEligibility(response.data.success)
                    }).catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getUserRole()
        getWeek()
    }, [classid])

    useEffect(() => {
        if (eligibility == false) {
            const finished = () => {
                // event.preventDefault()

                api.post('/nilai-jawaban', {
                    id: weekid,
                    mid: userLog.id,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    // console.log(response);
                    const newObj = response.data.nilai.map(data => {
                        return {
                            "jawaban": data.jawaban,
                            "benar": data.jawaban_benar,
                            "pertanyaan": data.pertanyaan_dosen,
                            "saran": data.saran_dosen,
                            "skor": data.score,
                        }
                    });
                    setCekQuestions(newObj);
                    setTotalNilai(response.data.sum)
                    setLoadingPage(false)
                }).catch(error => {
                    console.log(error);
                })
            }

            finished()
        } else {
            setLoadingPage(false)
        }

    }, [eligibility])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: `Caution!`,
            text: `Please double check your answer before submitting!`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    addJawaban(event)
                } else {
                    await swal("Submit Answer Cancelled!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // console.log(questions);

    return (
        <>
            {
                loadingPage
                    ?
                    <h1>
                        Loading...
                    </h1>
                    :
                    <div>
                        <CRow className="justify-content-center">
                            <CCol>
                                <CCardGroup>
                                    <CCard>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10" xs="9">
                                                    <h2>Week {week.week}</h2>
                                                </CCol>
                                                <CCol md="2" xs="3" className="text-right">
                                                    <CLink to={{ pathname: `/class/student-class-list/${classid}` }}>
                                                        <CButton color="danger">Back</CButton>
                                                    </CLink>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        {questions == null
                                            ?
                                            <h3>The Lecturer has yet to make a quiz, please wait patiently...</h3>
                                            :
                                            <CCardBody>
                                                <CForm method="post"
                                                    onSubmit={(event) => confirmEditQuestion(event)}
                                                >
                                                    {
                                                        masiLoading ?
                                                            "Loading..."
                                                            :
                                                            eligibility == null ?
                                                                "Loading..."
                                                                :
                                                                eligibility ?
                                                                    'pilihanA' in questions[0]
                                                                        ?
                                                                        questions[0]["pilihanA"] == null ?
                                                                            addQuestionEssay()
                                                                            :
                                                                            addQuestionMulti()
                                                                        :
                                                                        "bruh"
                                                                    :
                                                                    tampilJawaban()
                                                    }

                                                    {
                                                        eligibility ?
                                                            <CRow className="text-center">
                                                                <CCol>
                                                                    <CButton color="success" className="px-4" type="submit">
                                                                        Submit
                                                                    </CButton>
                                                                </CCol>
                                                            </CRow>
                                                            :
                                                            <CRow className="text-center">
                                                                <CCol>
                                                                    <h4>Your Score is {totalNilai}</h4>
                                                                </CCol>
                                                            </CRow>
                                                    }

                                                </CForm>
                                            </CCardBody>
                                        }

                                    </CCard>
                                </CCardGroup>
                            </CCol>
                        </CRow>
                    </div >
            }
        </>
    )
}

export default PertanyaanMinggu;