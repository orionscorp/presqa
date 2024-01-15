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
    CSelect
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import '../mahasiswa/App.css'
import swal from 'sweetalert';

const EditPertanyaanDsn = () => {
    const token = localStorage.getItem('token');

    const { id, weekid, dsnquestionid } = useParams()

    const [userLog, setUserLog] = useState([])

    const [pertanyaan, setPertanyaan] = useState({
        pertanyaan_dosen: "",
        pilihanA: null,
        pilihanB: null,
        pilihanC: null,
        jawaban_benar: null,
    })

    const history = useHistory();

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

    const getPertanyaan = () => {
        api
            .post(`/get-pertanyaan-dosen`, {
                id: dsnquestionid
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question[0])
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const editPertanyaan = (event) => {
        event.preventDefault()

        api.post(`/edit-pertanyaan-dosen`, {
            id: dsnquestionid,
            pertanyaan: pertanyaan.pertanyaan_dosen,
            pilihanA: pertanyaan.pilihanA,
            pilihanB: pertanyaan.pilihanB,
            pilihanC: pertanyaan.pilihanC,
            correct: pertanyaan.jawaban_benar,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async response => {
            // console.log(response);
            await swal("Good job!", "Update Question Success!", "success");
            history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/edit-question`)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUserRole()
        getPertanyaan()
    }, [])

    const handleChangeQuestion = (event) => {
        setPertanyaan(pertanyaan => ({
            ...pertanyaan,
            pertanyaan_dosen: event.target.value
        }));
    }

    const handleChangePilihanA = (event) => {
        setPertanyaan(pertanyaan => ({
            ...pertanyaan,
            pilihanA: event.target.value
        }));
    }

    const handleChangePilihanB = (event) => {
        setPertanyaan(pertanyaan => ({
            ...pertanyaan,
            pilihanB: event.target.value
        }));
    }

    const handleChangePilihanC = (event) => {
        setPertanyaan(pertanyaan => ({
            ...pertanyaan,
            pilihanC: event.target.value
        }));
    }

    const handleChangeCorrect = (event) => {
        if (event.target.value === "A") {
            setPertanyaan(pertanyaan => ({
                ...pertanyaan,
                jawaban_benar: pertanyaan.pilihanA
            }));
        } else if (event.target.value === "B") {
            setPertanyaan(pertanyaan => ({
                ...pertanyaan,
                jawaban_benar: pertanyaan.pilihanB
            }));
        } else if (event.target.value === "C") {
            setPertanyaan(pertanyaan => ({
                ...pertanyaan,
                jawaban_benar: pertanyaan.pilihanC
            }));
        } else {
            setPertanyaan(pertanyaan => ({
                ...pertanyaan,
                jawaban_benar: pertanyaan.jawaban_benar
            }));
        }
    }

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: `Update the following question?`,
            text: `${pertanyaan.pertanyaan_dosen}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    editPertanyaan(event)
                } else {
                    await swal("Submit Question Cancelled!");
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
                                                    <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/edit-question` }}>
                                                        <CButton color="danger">Back</CButton>
                                                    </CLink>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>

                                        <CCardBody>
                                            <CForm method="post"
                                                onSubmit={(event) => confirmEditQuestion(event)}
                                            >
                                                {
                                                    pertanyaan.pilihanA == null
                                                        ?
                                                        <></>
                                                        :
                                                        <>
                                                            <CRow>
                                                                <CCol>
                                                                    <span><h5>Please double check the correct answer! <text style={{ color: '#FF0000', }}>*</text></h5></span>
                                                                </CCol>
                                                            </CRow>
                                                            <br></br>
                                                        </>
                                                }
                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="3">
                                                            <CInputGroupText>Question</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Alexa"
                                                                // disabled
                                                                defaultValue={pertanyaan.pertanyaan_dosen}
                                                                onChange={(event) => handleChangeQuestion(event)}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                {
                                                    pertanyaan.pilihanA == null
                                                        ?
                                                        <></>
                                                        :
                                                        <>
                                                            <CRow>
                                                                <CInputGroup className="mb-3">
                                                                    <CCol md="3">
                                                                        <CInputGroupText>Option A</CInputGroupText>
                                                                    </CCol>
                                                                    <CCol xs="12" md="9">
                                                                        <CInput
                                                                            name="textarea-input"
                                                                            id="textarea-input"
                                                                            rows="9"
                                                                            placeholder="Answer Here..."
                                                                            // disabled
                                                                            // required
                                                                            defaultValue={pertanyaan.pilihanA}
                                                                            onChange={(event) => handleChangePilihanA(event)}
                                                                        />
                                                                    </CCol>
                                                                </CInputGroup>
                                                            </CRow>
                                                            <CRow>
                                                                <CInputGroup className="mb-3">
                                                                    <CCol md="3">
                                                                        <CInputGroupText>Option B</CInputGroupText>
                                                                    </CCol>
                                                                    <CCol xs="12" md="9">
                                                                        <CInput
                                                                            name="textarea-input"
                                                                            id="textarea-input"
                                                                            rows="9"
                                                                            placeholder="Answer Here..."
                                                                            // disabled
                                                                            // required
                                                                            defaultValue={pertanyaan.pilihanB}
                                                                            onChange={(event) => handleChangePilihanB(event)}
                                                                        />
                                                                    </CCol>
                                                                </CInputGroup>
                                                            </CRow>
                                                            <CRow>
                                                                <CInputGroup className="mb-3">
                                                                    <CCol md="3">
                                                                        <CInputGroupText>Option C</CInputGroupText>
                                                                    </CCol>
                                                                    <CCol xs="12" md="9">
                                                                        <CInput
                                                                            name="textarea-input"
                                                                            id="textarea-input"
                                                                            rows="9"
                                                                            placeholder="Answer Here..."
                                                                            // disabled
                                                                            // required
                                                                            defaultValue={pertanyaan.pilihanC}
                                                                            onChange={(event) => handleChangePilihanC(event)}
                                                                        />
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
                                                                            onChange={(e) => { handleChangeCorrect(e) }}
                                                                        >
                                                                            <option value={pertanyaan.jawaban_benar} hidden>{pertanyaan.jawaban_benar}</option>
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
                                                        </>
                                                }

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
            }
        </>
    )
}

export default EditPertanyaanDsn;