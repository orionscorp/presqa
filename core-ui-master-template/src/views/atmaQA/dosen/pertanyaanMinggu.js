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
    CDataTable,
    CTooltip,
    CBadge,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import parse from 'html-react-parser';
import '../mahasiswa/detailContainer.css'

const PertanyaanMinggu = () => {
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

    const [validation, setValidation] = useState([])

    const [loading, setLoading] = useState(true)

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

        const validateQuestion = () => {
            api.post('/validate-dosen-question', {
                id: weekid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setValidation(response.data.question)
            }).catch(error => {
                console.log(error);
            })
        }

        const getPertanyaanMhs = () => {
            api.post('/get-pertanyaan-mhs', {
                minggukelas_id: weekid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setPertanyaan(response.data.question)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
        }

        getData()
        getWeek()
        validateQuestion()
        getPertanyaanMhs()
    }, [id])

    const pinQuestion = (id, pty) => {
        swal({
            title: "Do you want to pin the following question?",
            content: {
                element: 'div',
                attributes: {
                    innerHTML: `${pty}`,
                },
            },
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                api
                    .post('/set-shown', { id: id, }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async response => {
                        // setData(response.data.mahasiswa)
                        await swal("Good Job!", "Success!", "success");
                        window.location.reload();
                    })
                    .catch(error => {
                        swal("Oops", "Something went wrong", "warning");
                    })
            } else {
                await swal("Action cancelled!");
                // window.location.reload();
            }
        });
    }

    const unpinQuestion = (id, pty) => {
        swal({
            title: "Do you want to unpin the following question?",
            content: {
                element: 'div',
                attributes: {
                    innerHTML: `${pty}`,
                },
            },
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                api
                    .post('/set-shown', { id: id, }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(async response => {
                        // setData(response.data.mahasiswa)
                        await swal("Good Job!", "Success!", "success");
                        window.location.reload();
                    })
                    .catch(error => {
                        swal("Oops", "Something went wrong", "warning");
                    })
            } else {
                await swal("Action cancelled!");
                // window.location.reload();
            }
        });
    }

    // console.log(validation);

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
                                                <CCol md="10" xs="6">
                                                    <h2>Week {week.week}</h2>
                                                </CCol>
                                                <CCol md="2" xs="6" className="text-right">
                                                    <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}` }}>
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

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Status</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Session"
                                                                disabled
                                                                defaultValue={week.class_status}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>
                                            </CForm>


                                        </CCardBody>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="8" xs="7">
                                                    <h3>Questions</h3>
                                                </CCol>
                                                <CCol md="4" xs="5" className="text-right">
                                                    {
                                                        validation == null
                                                            ?
                                                            <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/add-question` }}>
                                                                <CButton color="primary">Add Question</CButton>
                                                            </CLink>
                                                            :
                                                            <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/question-list` }}>
                                                                <CButton color="primary">View Answers</CButton>
                                                            </CLink>
                                                    }

                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                pertanyaan == null ?
                                                    <div>
                                                        No Data Found
                                                    </div>
                                                    :
                                                    // <>a</>
                                                    <CDataTable
                                                        items={pertanyaan}
                                                        fields={[
                                                            { key: "No" },
                                                            { key: "NPM" },
                                                            { key: "Question" },
                                                            { key: 'Status' },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={10}
                                                        pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
                                                            NPM: (item) => <td> {item.npm} </td>,
                                                            Question: (item) => <td>
                                                                {
                                                                    // item.question.length > 25 ? `${item.question.substring(0, 25)}...`
                                                                    //     :
                                                                    parse(item.question)
                                                                }
                                                            </td>,
                                                            Status: (item) => <td>{
                                                                item.jawaban_dosen == null ? <CBadge color="danger">Unanswered</CBadge> : <CBadge color="success">Answered</CBadge>
                                                            }</td>,
                                                            'Action':
                                                                (item) => (
                                                                    <td>
                                                                        <CDropdown

                                                                            className="c-header-nav-items mx-2"
                                                                            direction="center"
                                                                        >
                                                                            <CDropdownToggle className="c-header-nav-link" caret={false}>

                                                                                <CTooltip
                                                                                    content="Details"
                                                                                    placement="top"
                                                                                >
                                                                                    <CLink
                                                                                        className="card-header-action"
                                                                                    >
                                                                                        <CIcon content={freeSet.cilOptions}
                                                                                        />
                                                                                    </CLink>
                                                                                </CTooltip>

                                                                            </CDropdownToggle>
                                                                            <CDropdownMenu className="pt-0"
                                                                                placement="left"
                                                                            >
                                                                                <CDropdownItem>
                                                                                    <CLink
                                                                                        className="card-header-action"
                                                                                        to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/question-detail/${item.pertanyaanmhs_id}` }}>
                                                                                        <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                                        Question detail
                                                                                    </CLink>
                                                                                </CDropdownItem>

                                                                                {
                                                                                    item.jawaban_dosen == null ?
                                                                                        <CDropdownItem>
                                                                                            <CLink
                                                                                                className="card-header-action"
                                                                                                to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/answer-question/${item.pertanyaanmhs_id}` }}>
                                                                                                <CIcon content={freeSet.cilPencil} className="mfe-2" />
                                                                                                Answer Question
                                                                                            </CLink>
                                                                                        </CDropdownItem>
                                                                                        :
                                                                                        <></>
                                                                                }

                                                                                {
                                                                                    item.status_pertanyaan == 'not shown' ?
                                                                                        <CDropdownItem>
                                                                                            <CLink
                                                                                                className="card-header-action"
                                                                                                onClick={() => pinQuestion(item.pertanyaanmhs_id, item.question)}
                                                                                            >
                                                                                                <CIcon content={freeSet.cilPin} className="mfe-2" />
                                                                                                Pin Question
                                                                                            </CLink>
                                                                                        </CDropdownItem>
                                                                                        :
                                                                                        <CDropdownItem>
                                                                                            <CLink
                                                                                                className="card-header-action"
                                                                                                onClick={() => unpinQuestion(item.pertanyaanmhs_id, item.question)}
                                                                                            >
                                                                                                <CIcon content={freeSet.cilEyedropper} className="mfe-2" />
                                                                                                Unpin Question
                                                                                            </CLink>
                                                                                        </CDropdownItem>
                                                                                }
                                                                            </CDropdownMenu>
                                                                        </CDropdown>
                                                                    </td>
                                                                )
                                                        }}
                                                    />
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

export default PertanyaanMinggu;