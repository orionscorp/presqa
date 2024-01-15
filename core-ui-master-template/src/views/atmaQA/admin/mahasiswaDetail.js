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
} from "@coreui/react";
import { useState, useEffect } from "react";
import { api } from "src/plugins/api";
// import swal from 'sweetalert';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const MahasiswaDetail = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        mahasiswa_name: '',
        npm: '',
        email_mahasiswa: '',
    })
    // const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        const getData = () => {
            api
                .get(`/mahasiswa/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setData(response.data.mahasiswa)
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getData();
    }, [id])

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h2>Student Detail</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: "/mahasiswa/mahasiswa-list" }}>
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
                                                <CInputGroupText>Name</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CInput
                                                    type="text"
                                                    placeholder="Alexa"
                                                    disabled
                                                    defaultValue={data.mahasiswa_name}
                                                // value={data.mahasiswa_name}
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
                                                    disabled
                                                    defaultValue={data.npm}
                                                // value={data.npm}
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
                                                    disabled
                                                    defaultValue={data.email_mahasiswa}
                                                // value={data.email_mahasiswa}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
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

export default MahasiswaDetail;