import {
    CLink,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CCol,
    CRow,
    CTooltip,
    CButton,
    CBadge,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import parse from 'html-react-parser';
import './detailContainer.css'


const PertanyaanKelasMhs = () => {

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])

    const history = useHistory();

    const token = localStorage.getItem('token');

    const { classid, weekid } = useParams();

    const [week, setWeek] = useState([]);

    const [pertanyaan, setPertanyaan] = useState([])

    const [pinned, setPinned] = useState([])

    const [loading, setLoading] = useState(true)

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

    const searchPertanyaan = (event) => {
        api
            .post('/search-pertanyaan',
                {
                    name: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question)
            })
            .catch(error => {
                console.log(error);
            })
    }

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

    const getPertanyaanMhs = () => {
        // event.preventDefault()

        api
            .post(`/index-pertanyaan`, {
                mahasiswa_id: userLog.id,
                minggukelas_id: weekid,
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

    const getPinned = () => {
        // event.preventDefault()

        api
            .post(`/show-shown`, {
                minggukelas_id: weekid,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                // console.log(response);
                if (response.data == "") {
                    setPinned(null)
                } else {
                    setPinned(response.data.question)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteQuestion = (id, pty) => {
        swal({
            title: "Delete the following question?",
            content: {
                element: 'div',
                attributes: {
                    innerHTML: `${pty}`,
                },
            },
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    api
                        .post("/delete-pertanyaan", {
                            id: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(async (response) => {
                            await swal({ icon: "success", text: 'Question Deleted!' });
                            window.location.reload();
                        });
                } else {
                    await swal("Delete Question Cancelled!");
                    // window.location.reload();
                }
            })
            .catch((err) => {
                console.log("error");
            });
    }

    useEffect(() => {
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
                // setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })

        getDataKelas()
        getUserRole()
        getPinned()
    }, [weekid])

    useEffect(() => {
        getPertanyaanMhs()
    }, [userLog.id])

    return (
        <>
            {
                loading
                    ?
                    <h1>Loading...</h1>
                    :
                    <div>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h2>{kelas.kelas_name} - Week {week.week}</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: `/class/student-class-list/${classid}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <br></br>
                                </CRow>
                            </CCardHeader>
                            {
                                pinned == null
                                    ?
                                    <></>
                                    :
                                    <>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10" xs="9">
                                                    <h4>Pinned Questions</h4>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                pinned == null ?
                                                    <div>
                                                        No Data Found
                                                    </div>
                                                    :
                                                    <CDataTable
                                                        items={pinned}
                                                        fields={[
                                                            { key: "No" },
                                                            { key: "Question" },
                                                            { key: "Status" },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={4}
                                                        pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
                                                            Question: (item) => <td>
                                                                {
                                                                    // console.log(parse(item.question))
                                                                }
                                                                {
                                                                    // item.question.length > 25 ? `${parse(item.question).substring(0, 25)}...`
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
                                                                                        to={{ pathname: `/class/student-class-list/${classid}/${weekid}/pinned-question-detail/${item.pertanyaanmhs_id}` }}>
                                                                                        <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                                        Question Detail
                                                                                    </CLink>
                                                                                </CDropdownItem>
                                                                            </CDropdownMenu>
                                                                        </CDropdown>
                                                                    </td>
                                                                )
                                                        }}
                                                    />
                                            }

                                        </CCardBody>
                                    </>
                            }

                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h4>Your Questions</h4>
                                    </CCol>
                                    <CCol className="text-right" md="2" xs="3">
                                        <CTooltip
                                            content="Add Questions"
                                            placement="top"

                                        >
                                            <CButton
                                                className="card-header-action"
                                                style={{ backgroundColor: '#3c4b64' }}
                                                onClick={() => { history.push(`/class/student-class-list/${classid}/${weekid}/add-student-question`) }}>
                                                <CIcon content={freeSet.cilPlus} style={{ color: 'white' }} />
                                            </CButton>
                                        </CTooltip>
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
                                        <CDataTable
                                            items={pertanyaan}
                                            fields={[
                                                { key: "No" },
                                                { key: "Question" },
                                                { key: "Status" },
                                                { key: "Action" },
                                            ]}
                                            hover
                                            bordered
                                            size="sm"
                                            itemsPerPage={4}
                                            pagination
                                            scopedSlots={{
                                                No: (item, i) => <td>{i + 1}</td>,
                                                Question: (item) => <td>
                                                    {
                                                        // console.log(parse(item.question))
                                                    }
                                                    {
                                                        // item.question.length > 25 ? `${parse(item.question).substring(0, 25)}...`
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
                                                                            to={{ pathname: `/class/student-class-list/${classid}/${weekid}/question-detail/${item.pertanyaanmhs_id}` }}>
                                                                            <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                            Question Detail
                                                                        </CLink>
                                                                    </CDropdownItem>

                                                                    {
                                                                        item.jawaban_dosen == null ?
                                                                            <>
                                                                                <CDropdownItem>
                                                                                    <CLink
                                                                                        className="card-header-action"
                                                                                        to={{ pathname: `/class/student-class-list/${classid}/${weekid}/edit-question/${item.pertanyaanmhs_id}` }}>
                                                                                        <CIcon content={freeSet.cilPencil} className="mfe-2" />
                                                                                        Update Question
                                                                                    </CLink>
                                                                                </CDropdownItem>
                                                                                <CDropdownItem>
                                                                                    <CLink
                                                                                        className="card-header-action"
                                                                                        onClick={(event) => deleteQuestion(item.pertanyaanmhs_id, item.question)}
                                                                                    >
                                                                                        <CIcon content={freeSet.cilTrash}
                                                                                            className="mfe-2"
                                                                                        />
                                                                                        Delete Question
                                                                                    </CLink>
                                                                                </CDropdownItem>
                                                                            </>

                                                                            :
                                                                            <></>
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
                    </div >
            }
        </>
    )
}

export default PertanyaanKelasMhs;