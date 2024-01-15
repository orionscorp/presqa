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
import { useState } from "react";
import { api } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddDosen = () => {
    const token = localStorage.getItem('token');

    // const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [notelp, setNotelp] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const createDosen = (event) => {
        event.preventDefault();

        api
            .post('/dosen',
                {
                    name: name,
                    notelp: notelp,
                    email: email,
                    password: password,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Lecturer success!", "success");
                history.push('/dosen/dosen-list')
                // console.log(response);
            })
            .catch(error => {
                swal("Oops", "Something went wrong", "warning");
            })
    }

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Confirm create for a new lecturer:",
            text: `Name: ${name}\nPhone Number: ${notelp}\nEmail: ${email}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    createDosen(event)
                } else {
                    await swal("Create Lecturer Cancelled!");
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
                                        <h2>Add Lecturer</h2>
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
                                                    onChange={(event) => setName(event.target.value)}
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
                                                    onChange={(event) => setNotelp(event.target.value)}
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
                                                    onChange={(event) => setEmail(event.target.value)}
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
                                                    onChange={(event) => setPassword(event.target.value)}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>
                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="success" className="px-4" type="submit">
                                                Create
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

export default AddDosen;