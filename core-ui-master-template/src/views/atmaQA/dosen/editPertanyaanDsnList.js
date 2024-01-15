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
    // CFormCheck,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const EditPertanyaanDsnList = () => {
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

    const [soal, setSoal] = useState([])

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

        const getSoal = () => {
            api.post(`/get-pertanyaan-dosen-per-minggu`, {
                id: weekid,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                setSoal(response.data.question)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            })
        }

        getData()
        getWeek()
        getSoal()
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
                                                    <h2>Questions List</h2>
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


                                        </CCardBody>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="8" xs="8">
                                                    <h3>Questions</h3>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                soal == null ?
                                                    <div>
                                                        No Data Found
                                                    </div>
                                                    :
                                                    // <>a</>
                                                    <CDataTable
                                                        items={soal}
                                                        fields={[
                                                            { key: "No" },
                                                            { key: "Question" },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={10}
                                                        pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
                                                            Question: (item) => <td>{item.pertanyaan_dosen}</td>,
                                                            'Action':
                                                                (item) => (
                                                                    <td>
                                                                        <CTooltip
                                                                            content="Edit Questions"
                                                                            placement="top"
                                                                        >
                                                                            <CLink
                                                                                className="card-header-action"
                                                                                to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}/edit-question/${item.pertanyaandsn_id}` }}>
                                                                                <CIcon content={freeSet.cilPencil} />
                                                                            </CLink>
                                                                        </CTooltip>
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

export default EditPertanyaanDsnList;