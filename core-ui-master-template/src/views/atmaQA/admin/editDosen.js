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
    // CInputGroupPrepend,
    CCardGroup,
    // CContainer,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const EditDosen = () => {
    const token = localStorage.getItem('token');

    const { id } = useParams();

    const [data, setData] = useState({
        dosen_name: '',
        notelp_dosen: '',
        email_dosen: '',
        password_dosen: '',
    })

    const history = useHistory();

    const updateDosen = (event) => {
        // console.log(data)
        event.preventDefault();

        api
            .put(`/dosen/${id}`,
                {
                    name: data.dosen_name,
                    notelp: data.notelp_dosen,
                    email: data.email_dosen,
                    password: data.password_dosen,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Update Lecturer success!", "success");
                history.push('/dosen/dosen-list')
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        const getData = () => {
            api
                .get(`/dosen/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.dosen)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
    }, [id])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: `Confirm edit for ${data.dosen_name}!`,
            text: `Name: ${data.dosen_name}\nPhone Number: ${data.notelp_dosen}\nEmail: ${data.email_dosen}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    updateDosen(event)
                } else {
                    await swal("Edit Lecturer Cancelled!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h2>Edit Lecturer</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: "/dosen/dosen-list" }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post"
                                    onSubmit={(event) => confirmEditQuestion(event)}
                                >
                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    required
                                                    defaultValue={data.dosen_name}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            dosen_name: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Phone Number</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="08xxxxxxxxxxx"
                                                    required
                                                    value={data.notelp_dosen}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            notelp_dosen: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Email</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="email"
                                                    placeholder="alexa@email.com"
                                                    required
                                                    value={data.email_dosen}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            email_dosen: event.target.value,
                                                        });
                                                    }}
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
                                                    type="password"
                                                    required
                                                    defaultValue={data.password_dosen}
                                                    onChange={(event) => {
                                                        setData({
                                                            ...data,
                                                            password_dosen: event.target.value,
                                                        });
                                                    }}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>
                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="success" className="px-4" type="submit">
                                                Update
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div>
    )
}

export default EditDosen;