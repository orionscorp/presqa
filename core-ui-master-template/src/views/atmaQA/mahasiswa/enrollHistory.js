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
    CDropdownItem
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './detailContainer.css'

const EnrollHistory = () => {

    const [data, setData] = useState([])
    const [userLog, setUserLog] = useState([])

    const history = useHistory();

    const token = localStorage.getItem('token');

    const [loading, setLoading] = useState(true)

    const getData = () => {
        api
            .post('/get-enroll-history', {
                id: userLog.id,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                // console.log(response);
                setData(response.data.enroll)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const searchKelas = (event) => {
        api
            .post('/search-kelas-mhs',
                {
                    mid: userLog.id,
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
    }, [userLog.id])

    // console.log(userLog);

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
                                    <CCol md="4">
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
                                                                            to={{ pathname: `/class/student-class-list/${item.kelas_id}` }}>
                                                                            <CIcon content={freeSet.cilNewspaper} className="mfe-2" />
                                                                            Class Detail
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

export default EnrollHistory;