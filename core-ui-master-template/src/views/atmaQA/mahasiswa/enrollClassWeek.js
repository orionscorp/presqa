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
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './detailContainer.css'
import '../../../scss/_variables.scss'

const EnrollClassWeek = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        kelas_name: '',
        matkul_name: '',
        dosen_name: ''
    })

    const [week, setWeek] = useState([])

    const { classid } = useParams();

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getData = () => {
            api
                .post(`/get-student-class-detail`, {
                    id: classid,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.kelas)
                    setWeek(response.data.week)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
    }, [classid])

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
                                                    <h2>Class Detail</h2>
                                                </CCol>
                                                <CCol md="2" xs="3" className="text-right">
                                                    <CLink to={{ pathname: "/class/student-class-list" }}>
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
                                                            <CInputGroupText>Course</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Course Name"
                                                                disabled
                                                                defaultValue={data.matkul_name}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Lecture Name</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Lecture Name"
                                                                disabled
                                                                defaultValue={data.dosen_name}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                            </CForm>

                                        </CCardBody>
                                        <CCardHeader>
                                            <CRow>
                                                <CCol md="10">
                                                    <h3>Weeks</h3>
                                                </CCol>
                                            </CRow>
                                        </CCardHeader>
                                        <CCardBody>
                                            {
                                                data == null ?
                                                    <div>
                                                        No Data Found
                                                    </div>

                                                    :
                                                    <CDataTable
                                                        items={week}
                                                        fields={[
                                                            { key: "No" },
                                                            { key: "Week" },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        itemsPerPage={4}
                                                        pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
                                                            Week: (item) => <td>Week - {item.minggu_ke}</td>,
                                                            'Action':
                                                                (item) => (
                                                                    <>
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
                                                                                            to={{ pathname: `/class/student-class-list/${classid}/${item.minggukelas_id}` }}>
                                                                                            <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                                            Class Detail
                                                                                        </CLink>
                                                                                    </CDropdownItem>
                                                                                    <CDropdownItem>
                                                                                        <CLink
                                                                                            className="card-header-action"
                                                                                            to={{ pathname: `/class/student-class-list/${classid}/quiz/${item.minggukelas_id}` }}>
                                                                                            <CIcon content={freeSet.cilSchool} className="mfe-2" />
                                                                                            Quiz
                                                                                        </CLink>
                                                                                    </CDropdownItem>
                                                                                </CDropdownMenu>
                                                                            </CDropdown>

                                                                        </td>
                                                                    </>
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

export default EnrollClassWeek;