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
    CFormGroup,
    CLabel,
    CInputRadio,
    CSelect
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

const AddPertanyaanDsn = () => {
    const token = localStorage.getItem('token');

    const { id, weekid } = useParams()

    const [kelas, setKelas] = useState([])
    // const [userLog, setUserLog] = useState([])
    // const [pilihanA, setpilihanA] = useState([])
    // const [pilihanB, setpilihanB] = useState([])
    // const [pilihanC, setpilihanC] = useState([])
    // const [correct, setCorrect] = useState([])

    const [questType, setQuestType] = useState('')

    const [numberOfQuestions, setNumberOfQuestions] = useState(0);

    // {
    // "0": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "1": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "2": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "3": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // "4": {"question": "", "option_A": "","option_B": "","option_C": "","option_D": "",
    // }
    const [questions, setQuestions] = useState({});


    const questionType = [
        {
            type: "Essay",
        },
        {
            type: "Multiple Choice",
        },
    ]

    const options = [
        {
            var: "A",
            type: "Option A",
        },
        {
            var: "B",
            type: "Option B",
        },
        {
            var: "C",
            type: "Option C",
        },
    ]

    const history = useHistory();

    const onChangeNumberOfQuestions = (e) => {
        const tempNumberOfQuestions = e.target.value;
        setNumberOfQuestions(tempNumberOfQuestions);
        if (tempNumberOfQuestions > 0) {
            if (questType === "Essay") {
                var obj = {};
                for (var i = 0; i < tempNumberOfQuestions; i++) {
                    obj[i] = {
                        "question": questions.hasOwnProperty(i) ? questions[i]["question"] : "",
                        "option_A": "",
                        "option_B": "",
                        "option_C": "",
                        "correct": "",
                    };
                }
                setQuestions(obj);
            } else {
                var obj = {};
                for (var i = 0; i < tempNumberOfQuestions; i++) {
                    obj[i] = {
                        "question": questions.hasOwnProperty(i) ? questions[i]["question"] : "",
                        "option_A": questions.hasOwnProperty(i) ? questions[i]["option_A"] : "",
                        "option_B": questions.hasOwnProperty(i) ? questions[i]["option_B"] : "",
                        "option_C": questions.hasOwnProperty(i) ? questions[i]["option_C"] : "",
                        "correct": questions.hasOwnProperty(i) ? questions[i]["correct"] : "",
                    };
                }
                setQuestions(obj);
            }
        } else {
            setQuestions([])
        }
    };

    function addQuestionEssay() {
        return Object.keys(questions).map((key) => {
            return (
                <>
                    <CRow key={key}>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Question {+key + 1}</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    placeholder="Alexa"
                                    required
                                    value={questions[key]["question"]} onChange={(e) => { handleChangeEditorSimple(e, key) }}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <hr></hr>
                </>
            );
        })
    }

    const handleChangeEditorSimple = (e, key) => {
        var new_questions = {
            "question": e.target.value,
            "option_A": "",
            "option_B": "",
            "option_C": "",
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    // const handleChangeEditorType = (e) => {
    //     var new_questions = {
    //         "question": e.target.value,
    //         "option_A": "",
    //         "option_B": "",
    //         "option_C": "",
    //     };
    //     setQuestions({ ...questions, [key]: new_questions })
    // }

    const handleChangeEditorMultiple = (e, key) => {
        var new_questions = {
            "question": e.target.value,
            "option_A": questions[key]['option_A'],
            "option_B": questions[key]['option_B'],
            "option_C": questions[key]['option_C'],
            "correct": questions[key]['correct'],
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    const handleChangeEditorA = (e, key) => {
        var new_questions = {
            "question": questions[key]['question'],
            "option_A": e.target.value,
            "option_B": questions[key]['option_B'],
            "option_C": questions[key]['option_C'],
            "correct": questions[key]['correct'],
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    const handleChangeEditorB = (e, key) => {
        var new_questions = {
            "question": questions[key]['question'],
            "option_A": questions[key]['option_A'],
            "option_B": e.target.value,
            "option_C": questions[key]['option_C'],
            "correct": questions[key]['correct'],
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    const handleChangeEditorC = (e, key) => {
        var new_questions = {
            "question": questions[key]['question'],
            "option_A": questions[key]['option_A'],
            "option_B": questions[key]['option_B'],
            "option_C": e.target.value,
            "correct": questions[key]['correct'],
        };
        setQuestions({ ...questions, [key]: new_questions })
    }

    const handleChangeEditorCorrect = (e, key) => {
        if (e.target.value === "A") {
            var new_questions = {
                "question": questions[key]['question'],
                "option_A": questions[key]['option_A'],
                "option_B": questions[key]['option_B'],
                "option_C": questions[key]['option_C'],
                "correct": questions[key]['option_A'],
            };
            setQuestions({ ...questions, [key]: new_questions })
        } else if (e.target.value === "B") {
            var new_questions = {
                "question": questions[key]['question'],
                "option_A": questions[key]['option_A'],
                "option_B": questions[key]['option_B'],
                "option_C": questions[key]['option_C'],
                "correct": questions[key]['option_B'],
            };
            setQuestions({ ...questions, [key]: new_questions })
        } else {
            var new_questions = {
                "question": questions[key]['question'],
                "option_A": questions[key]['option_A'],
                "option_B": questions[key]['option_B'],
                "option_C": questions[key]['option_C'],
                "correct": questions[key]['option_C'],
            };
            setQuestions({ ...questions, [key]: new_questions })
        }
    }

    const addQuestion = (event) => {
        event.preventDefault()

        const tempid = weekid;

        if (questType === "Essay") {
            api.post('/add-question-dsn', {
                //data
                pertanyaan: JSON.stringify(questions),
                id: tempid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async (response) => {
                await swal("Good job!", "Add Question(s) Success!", "success");
                history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}`)
            }).catch(error => {
                console.log(error);
            })
        } else {
            api.post('/add-multi-question-dsn', {
                //data
                pertanyaan: JSON.stringify(questions),
                id: tempid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(async (response) => {
                await swal("Good job!", "Add Question(s) Success!", "success");
                history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}`)
            }).catch(error => {
                console.log(error);
            })
        }
    }

    // const handleChangeEditor = (editor, index) => {
    //     setQuestions(questions.map((questions, i) => {
    //         if (i == index) {
    //             console.log('Lagi edit questions ' + i + ' ya bang?')
    //             console.log('Datanya adalah : ' + editor.getData());
    //             return editor.getData();
    //         } else {
    //             return questions
    //         }
    //     }));
    //     // setPertanyaan(editor.getData())
    // }

    function addQuestionMulti() {
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
                                    required
                                    value={questions[key]["question"]} onChange={(e) => { handleChangeEditorMultiple(e, key) }}
                                ></CInput>
                            </CCol>
                        </CInputGroup>
                    </CRow>

                    <CRow>
                        <CInputGroup className="mb-3">
                            <CCol md="3">
                                <CInputGroupText>Option A</CInputGroupText>
                            </CCol>
                            <CCol>
                                <CInput
                                    type="text"
                                    placeholder="Alexa"
                                    required
                                    value={questions[key]["option_A"]} onChange={(e) => { handleChangeEditorA(e, key) }}
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
                                    placeholder="Alexa"
                                    required
                                    value={questions[key]["option_B"]} onChange={(e) => { handleChangeEditorB(e, key) }}
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
                                    placeholder="Alexa"
                                    required
                                    value={questions[key]["option_C"]} onChange={(e) => { handleChangeEditorC(e, key) }}
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
                                <CSelect custom name="select" id="select"
                                    onChange={(e) => { handleChangeEditorCorrect(e, key) }}
                                    required
                                >
                                    <option value="" hidden>Select Answers</option>
                                    {
                                        options.map((d, i) => {
                                            return (
                                                <option key={i} value={d.var}>{d.type}</option>
                                            )
                                        })
                                    }
                                </CSelect>
                            </CCol>
                        </CInputGroup>
                    </CRow>
                    <hr></hr>
                </div>
            );
        })
    }

    // const getUserRole = () => {
    //     api
    //         .get('/user', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then(response => {
    //             setUserLog(response.data.userloggedin)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

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

    useEffect(() => {
        getDataKelas()
        // getUserRole()
    }, [])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: `Caution!`,
            text: `Please review your question(s) before submitting!`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    addQuestion(event)
                } else {
                    await swal("Submit Question(s) Cancelled!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // console.log(questType);

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
                                    <CCol md="2" className="text-right" xs="3">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}>
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
                                        <CCol>
                                            <span><h5>You can only submit question(s) once per week <text style={{ color: '#FF0000', }}>*</text></h5></span>
                                        </CCol>
                                    </CRow>
                                    <br></br>
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="3">
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

                                    <CFormGroup row>
                                        <CCol md="3">
                                            <CInputGroupText>Question Type </CInputGroupText>
                                        </CCol>
                                        <CCol>
                                            {
                                                questionType.map((d, i) => {
                                                    return (
                                                        <CFormGroup variant="checkbox" key={i}>
                                                            <CInputRadio className="form-check-input" id={i} name="radios" value={d.type}
                                                                onChange={(event) => { setQuestType(event.target.value) }}
                                                                required />
                                                            <CLabel variant="checkbox" htmlFor={i}>{d.type}</CLabel>
                                                        </CFormGroup>
                                                    )
                                                })
                                            }
                                        </CCol>
                                    </CFormGroup>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="3">
                                                <CInputGroupText>Number of Questions</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    minLength={1}
                                                    maxLength={2}
                                                    placeholder="Enter Number of Questions Here . . ."
                                                    defaultValue={numberOfQuestions === 0 ? "" : numberOfQuestions}
                                                    onChange={onChangeNumberOfQuestions}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    {
                                        questType === "Essay"
                                            ?
                                            addQuestionEssay()
                                            :
                                            (
                                                questType === "Multiple Choice"
                                                    ?
                                                    addQuestionMulti()
                                                    // <>a</>
                                                    :
                                                    <h5>Please Choose The Question Type Above</h5>
                                            )

                                    }

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="primary" className="px-4" type="submit">
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
        </div >
    )
}

export default AddPertanyaanDsn;