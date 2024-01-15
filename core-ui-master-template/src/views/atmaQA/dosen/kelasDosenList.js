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
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import swal from 'sweetalert';
import '../mahasiswa/detailContainer.css'

const KelasDosenList = () => {

    const [data, setData] = useState([])
    const [userLog, setUserLog] = useState([])

    const [loading, setLoading] = useState(true)

    const history = useHistory();

    const token = localStorage.getItem('token');

    const getData = () => {
        api
            .post('/get-dosen-kelas', {
                id: userLog.id,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setData(response.data.kelas)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchKelas = (event) => {
        api
            .post('/search-kelas-dsn',
                {
                    did: userLog.id,
                    name: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                setData(response.data.kelas)
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

    useEffect(() => {
        getUserRole()
    }, [])

    useEffect(() => {
        getData()
    }, [userLog])

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
                                    <CCol md="11">
                                        <h3><b>Class</b></h3>
                                    </CCol>
                                    <CCol></CCol>
                                </CRow>
                                <CRow>
                                    <CCol md="4" xs="8">
                                        <CInputGroup>
                                            <CInput type="text" id="search" name="search" placeholder="Type to search by class name ..."
                                                onChange={(event) => searchKelas(event)}
                                            />
                                            <CInputGroupAppend>
                                                <CTooltip content={`Search`} placement={`top`}>
                                                    <CButton className="btn-sm" type="submit" style={{ backgroundColor: "#3c4b64" }}><CIcon name="cil-magnifying-glass"
                                                        style={{ color: "white" }}></CIcon></CButton>
                                                </CTooltip>
                                            </CInputGroupAppend>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol></CCol>
                                    <CCol md="1" xs="2">
                                        <CTooltip
                                            content="Add Class"
                                            placement="top"
                                        >
                                            <CButton
                                                className="card-header-action"
                                                style={{ backgroundColor: '#3c4b64' }}
                                                onClick={() => { history.push('/lecturer-class/lecturer-class-list/add-class') }}>
                                                <CIcon content={freeSet.cilPlus} style={{ color: 'white' }} />
                                            </CButton>
                                        </CTooltip>
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
                                        // <>ada data</>
                                        <CDataTable
                                            items={data}
                                            fields={[
                                                { key: "No" },
                                                { key: "Class_Name" },
                                                { key: "Schedule" },
                                                { key: "Action" },
                                            ]}
                                            hover
                                            bordered
                                            size="sm"
                                            itemsPerPage={4}
                                            pagination
                                            scopedSlots={{
                                                No: (item, i) => <td>{i + 1}</td>,
                                                Class_Name: (item) => <td>{item.kelas_name}</td>,
                                                Schedule: (item) => <td>{item.hari} - {item.sesi}</td>,
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
                                                                            to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${item.kelas_id}` }}>
                                                                            <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                            Class Detail
                                                                        </CLink>
                                                                    </CDropdownItem>
                                                                    <CDropdownItem>
                                                                        <CLink
                                                                            className="card-header-action"
                                                                            to={{ pathname: `/lecturer-class/lecturer-class-list/edit-class/${item.kelas_id}` }}>
                                                                            <CIcon content={freeSet.cilPencil} className="mfe-2" />
                                                                            Update Class
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
                    </div>
            }
        </>
    )
}

export default KelasDosenList;