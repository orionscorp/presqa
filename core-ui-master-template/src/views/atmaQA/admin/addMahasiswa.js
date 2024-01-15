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

const AddMahasiswa = () => {
    const token = localStorage.getItem('token');

    // const [data, setData] = useState([])
    const [name, setName] = useState('')
    const [npm, setNpm] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory();

    const createMahasiswa = (event) => {
        event.preventDefault();

        api
            .post('/mahasiswa',
                {
                    name: name,
                    npm: npm,
                    email: email,
                    password: password,
                }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(async response => {
                await swal("Good job!", "Add Student success!", "success");
                history.push('/mahasiswa/mahasiswa-list')
                // console.log(response);
            })
            .catch(error => {
                // console.log(error);
                swal("Oops", "Something went wrong", "warning");
            })
    }

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Confirm create for a new student:",
            text: `Name: ${name}\nNPM: ${npm}\nEmail: ${email}`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    createMahasiswa(event)
                } else {
                    await swal("Create Student Cancelled!");
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
                                        <h2>Add Student</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: "/mahasiswa/mahasiswa-list" }}>
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
                                                <CInputGroupText>NPM</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="190xxxxxx"
                                                    required
                                                    onChange={(event) => setNpm(event.target.value)}
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

export default AddMahasiswa;