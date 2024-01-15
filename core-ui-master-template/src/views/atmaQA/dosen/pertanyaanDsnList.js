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
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import '../mahasiswa/detailContainer.css'

const PertanyaanDsnList = () => {
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
    const [mahasiswa, setMahasiswa] = useState([])

    const [tipeSoal, setTipeSoal] = useState('')

    const [loading, setLoading] = useState(true)

    const [edit, setEdit] = useState(false)

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

        const showMhs = () => {
            api.post('/show-mhs', {
                id: weekid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                // console.log(response);
                setMahasiswa(response.data.mhs)
            }).catch(error => {
                console.log(error);
            })
        }

        const cekTipeSoal = () => {
            api.post('/cek-tipe-soal', {
                id: weekid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                // console.log(response);
                setTipeSoal(response.data.tipe)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
        }

        const cekJawaban = () => {
            api.post('/cek-semua-jawab', {
                id: weekid
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                // console.log(response);
                if (response.data.success == false) {
                    setEdit(false);
                } else {
                    setEdit(true)
                }
            }).catch(error => {
                console.log(error);
            })
        }

        getData()
        getWeek()
        showMhs()
        cekTipeSoal()
        cekJawaban()
    }, [id])

    // console.log(week);

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
                                                    <h2>Answers List</h2>
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
                                                                defaultValue={data.kelas_name}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>
                                            </CForm>


                                        </CCardBody>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="8" xs="8">
                                                    <h3>Student List</h3>
                                                </CCol>
                                                <CCol md="4" xs="4" className="text-right">
                                                    <CRow>
                                                        {
                                                            edit == false
                                                                ?
                                                                <CCol>
                                                                    <CLink
                                                                        to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/view-lecture-question` }}
                                                                    >
                                                                        <CTooltip
                                                                            content="View Questions"
                                                                            placement="top">
                                                                            <CButton
                                                                                // color="info"
                                                                                style={{ backgroundColor: "#3c4b64" }}
                                                                            ><CIcon content={freeSet.cilNewspaper}
                                                                                style={{ color: "white" }}
                                                                                /></CButton>
                                                                        </CTooltip>
                                                                    </CLink>
                                                                </CCol>
                                                                :
                                                                <>
                                                                    <CCol style={{ paddingRight: 0 }}>
                                                                        <CLink
                                                                            to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/view-lecture-question` }}
                                                                        >
                                                                            <CTooltip
                                                                                content="View Questions"
                                                                                placement="top">
                                                                                <CButton
                                                                                    // color="info"
                                                                                    style={{ backgroundColor: "#3c4b64" }}
                                                                                ><CIcon content={freeSet.cilNewspaper}
                                                                                    style={{ color: "white" }}
                                                                                    /></CButton>
                                                                            </CTooltip>
                                                                        </CLink>
                                                                    </CCol>
                                                                    <CCol md="3" xs="7" className="text-right" style={{ paddingLeft: "15px" }}>
                                                                        <CLink
                                                                            to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/edit-question` }}
                                                                        >
                                                                            <CTooltip
                                                                                content="Edit Questions"
                                                                                placement="top">
                                                                                <CButton
                                                                                    // color="info"
                                                                                    style={{ backgroundColor: "#3c4b64" }}
                                                                                ><CIcon content={freeSet.cilPencil}
                                                                                    style={{ color: "white" }}
                                                                                    /></CButton>
                                                                            </CTooltip>
                                                                        </CLink>
                                                                    </CCol>
                                                                </>
                                                        }

                                                    </CRow>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                mahasiswa == null ?
                                                    <div>
                                                        No Data Found
                                                    </div>
                                                    :
                                                    // <>a</>
                                                    <CDataTable
                                                        items={mahasiswa}
                                                        fields={[
                                                            { key: "No" },
                                                            { key: "npm" },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={10}
                                                        pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
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
                                                                                        to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/view-student-answer/${item.mahasiswa_id}` }}>
                                                                                        <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                                        View Answers
                                                                                    </CLink>
                                                                                </CDropdownItem>

                                                                                {
                                                                                    tipeSoal == "Essay" ?
                                                                                        <CDropdownItem>
                                                                                            <CLink
                                                                                                className="card-header-action"
                                                                                                to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/answer-correction/${item.mahasiswa_id}` }}>
                                                                                                <CIcon content={freeSet.cilPencil} className="mfe-2" />
                                                                                                Mark Answers
                                                                                            </CLink>
                                                                                        </CDropdownItem>
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
                                </CCardGroup>
                            </CCol>
                        </CRow>
                    </div >
            }
        </>
    )
}

export default PertanyaanDsnList;