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
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { api } from "src/plugins/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';

const KelasList = () => {

    const [data, setData] = useState([])

    const history = useHistory();

    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token');

    const getData = () => {
        api
            .get('/kelas', {
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
            .post('/search-kelas',
                {
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

    useEffect(() => {
        getData()
    }, [])

    const deleteQuestion = (id, name) => {
        swal({
            title: "Confirm Delete!",
            text: `Confirm delete for ${name}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    api
                        .post("/delete-kelas", {
                            id: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(async (response) => {
                            await swal({ icon: "success", text: 'Class Deleted!' });
                            window.location.reload();
                        });
                } else {
                    await swal("Delete Class Cancelled!");
                    window.location.reload();
                }
            })
            .catch((error) => {
                // swal("Delete Class Cancelled!");
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
                                                onClick={() => { history.push('/class/class-list/add-class') }}>
                                                <CIcon content={freeSet.cilPlus} />
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
                                            itemsPerPage={10}
                                            pagination
                                            scopedSlots={{
                                                No: (item, i) => <td>{i + 1}</td>,
                                                Class_Name: (item) => <td>{item.kelas_name}</td>,
                                                Schedule: (item) => <td>{item.hari} - {item.sesi}</td>,
                                                'Action':
                                                    (item) => (
                                                        <td>
                                                            <CTooltip
                                                                content="Class Detail"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                    to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${item.kelas_id}` }}>
                                                                    <CIcon content={freeSet.cilNewspaper} />
                                                                </CLink>
                                                            </CTooltip>
                                                            <CTooltip
                                                                content="Update Class"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                    to={{ pathname: `/class/class-list/edit-class/${item.kelas_id}` }}>
                                                                    <CIcon content={freeSet.cilPencil} />
                                                                </CLink>
                                                            </CTooltip>
                                                            <CTooltip
                                                                content="Delete Class"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                >
                                                                    <CIcon content={freeSet.cilTrash}
                                                                        onClick={(event) => deleteQuestion(item.kelas_id, item.kelas_name)}
                                                                    />
                                                                </CLink>
                                                            </CTooltip>
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

export default KelasList;