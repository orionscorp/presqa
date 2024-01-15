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

const MahasiswaList = () => {
    // const [modal, setModal] = useState(false)
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(true)

    const history = useHistory();

    const token = localStorage.getItem('token');

    // const handleModal = () => setModal(true)

    const getData = () => {
        api
            .get('/mahasiswa', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setData(response.data.mahasiswa)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }

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
                        .post("/delete-mahasiswa", {
                            id: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then(async (response) => {
                            await swal({ icon: "success", text: 'Student Deleted!' });
                            window.location.reload();
                        });
                } else {
                    await swal("Delete Student Cancelled!");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const searchMahasiswa = (event) => {
        api
            .post('/search-mahasiswa',
                {
                    npm: event.target.value,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                setData(response.data.mahasiswa)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData()
    }, [])

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
                                        <h3><b>Student</b></h3>
                                    </CCol>
                                    <CCol></CCol>
                                </CRow>
                                <CRow>
                                    <CCol md="4" xs="8">
                                        <CInputGroup>
                                            <CInput type="text" id="search" name="search" placeholder="Type to search by NPM ..."
                                                onChange={(event) => searchMahasiswa(event)}
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
                                            content="Add Mahasiswa"
                                            placement="top"
                                        >
                                            <CButton
                                                className="card-header-action"
                                                onClick={() => { history.push('/mahasiswa/mahasiswa-list/add-mahasiswa') }}>
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
                                                { key: "NPM" },
                                                { key: "Student_Name" },
                                                { key: "action" },
                                            ]}
                                            hover
                                            bordered
                                            size="sm"
                                            itemsPerPage={10}
                                            pagination
                                            scopedSlots={{
                                                No: (item, i) => <td>{i + 1}</td>,
                                                NPM: (item) => <td>{item.npm}</td>,
                                                Student_Name: (item) => <td>{item.mahasiswa_name}</td>,
                                                'action':
                                                    (item) => (
                                                        <td>
                                                            <CTooltip
                                                                content="Student Detail"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                    to={{ pathname: `/mahasiswa/mahasiswa-list/mahasiswa-detail/${item.mahasiswa_id}` }}>
                                                                    <CIcon content={freeSet.cilNewspaper} />
                                                                </CLink>
                                                            </CTooltip>
                                                            <CTooltip
                                                                content="Update Student"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                    to={{ pathname: `/mahasiswa/mahasiswa-list/edit-mahasiswa/${item.mahasiswa_id}` }}>
                                                                    <CIcon content={freeSet.cilPencil} />
                                                                </CLink>
                                                            </CTooltip>
                                                            <CTooltip
                                                                content="Delete Student"
                                                                placement="top"
                                                            >
                                                                <CLink
                                                                    className="card-header-action"
                                                                >
                                                                    <CIcon content={freeSet.cilTrash}
                                                                        onClick={(event) => deleteQuestion(item.mahasiswa_id, item.mahasiswa_name)} />
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

export default MahasiswaList;