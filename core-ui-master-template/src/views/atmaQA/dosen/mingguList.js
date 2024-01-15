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
import swal from 'sweetalert';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import '../mahasiswa/detailContainer.css'

const MingguList = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        kelas_name: '',
        hari: '',
        sesi: '',
        password_kelas: '',
    })

    const [matkul, setMatkul] = useState({
        matkul_name: '',
        dosen_name: '',
    })

    const [week, setWeek] = useState([])

    const { id } = useParams();

    const [loading, setLoading] = useState(true)


    const updateStatus = (id, week) => {
        swal({
            title: "Warning",
            text: `Do You Want To Update Week ${week} Status?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    api
                        .post("/update-status-kelas", {
                            id: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(async (response) => {
                            await swal({ icon: "success", text: 'Status Updated!' });
                            window.location.reload();
                        });
                } else {
                    await swal("Status Update Cancelled!");
                    // window.location.reload();
                }
            })
            .catch((err) => {
                console.log("error");
            });
    }

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
                .post(`/get-week`, {
                    id: id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setWeek(response.data.week)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
        getWeek();
    }, [id])

    const role = localStorage.getItem('role')

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
                                                    <h2>Class Detail</h2>
                                                </CCol>
                                                {
                                                    role == 'admin'
                                                        ?
                                                        <CCol md="2" xs="3" className="text-right">
                                                            <CLink to={{ pathname: "/class/class-list" }}>
                                                                <CButton color="danger">Back</CButton>
                                                            </CLink>
                                                        </CCol>
                                                        :
                                                        <CCol md="2" xs="3" className="text-right">
                                                            <CLink to={{ pathname: "/lecturer-class/lecturer-class-list" }}>
                                                                <CButton color="danger">Back</CButton>
                                                            </CLink>
                                                        </CCol>
                                                }

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
                                                                defaultValue={matkul.matkul_name}
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
                                                                defaultValue={matkul.dosen_name}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Day</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Day"
                                                                disabled
                                                                defaultValue={data.hari}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Session</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Session"
                                                                disabled
                                                                defaultValue={data.sesi}
                                                            ></CInput>
                                                        </CCol>
                                                    </CInputGroup>
                                                </CRow>

                                                <CRow>
                                                    <CInputGroup className="mb-3">
                                                        <CCol md="2">
                                                            <CInputGroupText>Password</CInputGroupText>
                                                        </CCol>
                                                        <CCol>
                                                            <CInput
                                                                type="text"
                                                                placeholder="Session"
                                                                disabled
                                                                defaultValue={data.password_kelas}
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
                                                            { key: "Class_Status" },
                                                            { key: "Action" },
                                                        ]}
                                                        hover
                                                        bordered
                                                        size="sm"
                                                        // itemsPerPage={4}
                                                        // pagination
                                                        scopedSlots={{
                                                            No: (item, i) => <td>{i + 1}</td>,
                                                            Week: (item) => <td>Week - {item.week}</td>,
                                                            Class_Status: (item) => <td>{item.class_status}</td>,
                                                            // Schedule: (item) => <td>{item.hari} - {item.sesi}</td>,
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
                                                                                        to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${item.id}` }}>
                                                                                        <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                                        Class Detail
                                                                                    </CLink>
                                                                                </CDropdownItem>
                                                                                <CDropdownItem>
                                                                                    <CLink
                                                                                        className="card-header-action"
                                                                                        onClick={(event) => updateStatus(item.id, item.week)}
                                                                                    >
                                                                                        <CIcon content={freeSet.cilReload} className="mfe-2"
                                                                                        />
                                                                                        Update Class Status
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
                                    </CCard>
                                </CCardGroup>
                            </CCol>
                        </CRow>
                    </div >
            }
        </>
    )
}

export default MingguList;