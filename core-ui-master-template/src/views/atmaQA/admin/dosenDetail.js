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
// import swal from 'sweetalert';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const DosenDetail = () => {
    const token = localStorage.getItem('token');

    const [data, setData] = useState({
        dosen_name: '',
        notelp_dosen: '',
        email_dosen: '',
    })
    // const history = useHistory();

    const { id } = useParams();

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
                    // swal("Oops", "Something went wrong", "warning");
                })
        }

        getData();
    }, [id, token])

    return (
        <div>
            <CRow className="justify-content-center">
                <CCol>
                    <CCardGroup>
                        <CCard>
                            <CCardHeader>
                                <CRow>
                                    <CCol md="10" xs="9">
                                        <h2>Lecturer Detail</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: "/dosen/dosen-list" }}>
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
                                                    defaultValue={data.dosen_name}
                                                // value={data.mahasiswa_name}
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
                                                    disabled
                                                    defaultValue={data.notelp_dosen}
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
                                                    defaultValue={data.email_dosen}
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

export default DosenDetail;