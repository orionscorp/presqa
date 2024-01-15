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
import { useState, useEffect, useRef } from "react";
import { HOST_PORT, HOST_URL, api, BACKEND_URL } from "src/plugins/api";
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import DOMPurify from 'dompurify';
import '../mahasiswa/App.css'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons'

const JawabanDosen = () => {
    const token = localStorage.getItem('token');

    const { id, weekid, questionid } = useParams()

    const [kelas, setKelas] = useState([])
    const [userLog, setUserLog] = useState([])
    const [pertanyaan, setPertanyaan] = useState({
        pertanyaan_mhs: "",
    })

    const [recordState, setRecordState] = useState(false)

    const [jawaban, setJawaban] = useState('')

    const history = useHistory();

    const answerQuestion = (event) => {
        event.preventDefault()

        api.post('/answer-question-mhs', {
            id: questionid,
            jawaban: jawaban,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async response => {
            await swal("Good job!", "Answer Question Success!", "success");
            history.push(`/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}`)
        }).catch(error => {
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

    const getDataKelas = () => {
        api
            .post(`/cek-kelas-minggu`, {
                weekid: weekid,
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setKelas(response.data.kelas)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getPertanyaan = () => {
        api
            .post(`/get-pertanyaan`, {
                pertanyaanmhs_id: questionid
            }
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            .then(response => {
                setPertanyaan(response.data.question)
            })
            .catch(error => {
                console.log(error);
            })
    }

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleChangeEditor = (editor) => {
        setJawaban(editor.getData())
    }

    let mediaRecorder = ""
    let audio_constraints = {}
    const threshold = 500

    function blobToBase64(blob) {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    const getAudioSelection = async () => {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(devices.filter(device => device.kind === 'audioinput'))
    };

    const audioOptionsOnChangeHandler = () => {
        // console.log(audioOptions.current.value)
        audio_constraints = {
            audio: {
                ...audio_constraints,
                deviceId: {
                    exact: audioOptions.current.value
                }
            }
        };
        startStream(audio_constraints);
    }

    // 2
    const startStream = async (audio_constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(audio_constraints);
        handleStream(stream);
    }

    // 1
    const audioRecordHandler = (event) => {
        if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            audio_constraints = {
                audio: {
                    ...audio_constraints,
                    deviceId: {
                        exact: audioOptions.current.value
                    }
                }
            };

            const btnStart = document.getElementById('btn-startrecord');
            const btnStop = document.getElementById('btn-stoprecord');

            if (event.currentTarget.classList.contains('btn-startrecord')) {
                btnStart.classList.add('d-none')
                btnStop.classList.remove('d-none')
                startStream(audio_constraints);
            } else {
                mediaRecorder.stop()
                btnStart.classList.remove('d-none')
                btnStop.classList.add('d-none')
            }
        }

    }

    // const stopRecordHandler = () => {
    // console.log(mediaRecorder);
    // mediaRecorder.stop();
    // setRecordState(false);
    // this.startRecordTarget.classList.remove('d-none');
    // this.stopRecordTarget.classList.add('d-none');
    // }

    // 3
    const handleStream = (stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        // setRecordState(true);

        const audioChunks = [];
        let silent_length = 0
        let start_audio = false

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
            let getAccessTokenRes = await axios({
                method: "get",
                url: `${HOST_URL}:${HOST_PORT}/api/get-access-token`,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (getAccessTokenRes.data.status != 'success') {
                console.log('Something wrong with access token')
                return;
            }
            // console.log('Transcripting ...')

            const accessToken = getAccessTokenRes.data.access_token

            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

            const base64Audio = await blobToBase64(audioBlob)
            const audioUrl = URL.createObjectURL(audioBlob);

            // const audio = new Audio(audioUrl);
            // audio.play();

            // https://cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages
            const config = {
                "encoding": "MP3",
                "sampleRateHertz": 16000,
                // "languageCode": "en-US",
                "languageCode": "id-ID",
                "enableAutomaticPunctuation": true
            }
            const audioContent = {
                "content": base64Audio.split(',')[1],
            }
            let res = await axios({
                method: "post",
                url: 'https://speech.googleapis.com/v1p1beta1/speech:recognize',
                data: {
                    config,
                    audio: audioContent
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer "${accessToken}"`
                }
            });
            // console.log(res)
            if (res.data.results) {
                // setRecordState(false)
                const transcription = res.data.results
                    .map(result => result.alternatives[0].transcript)
                    .join('. ');
                // console.log(`${transcription}`);
                const html_transcription = `<p> ${transcription} </p>`
                setJawaban(jawaban + html_transcription)

                // Store transcription  to DB
                // let storeTranscript = await axios({
                //     method: "post",
                //     url: '/agenda/' + agendaId + '/store_ajax',
                //     data: {
                //         transcript: transcription,
                //         user_id: userId,
                //     },
                //     headers: {
                //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                //         'Content-Type': 'application/json',
                //     }
                // });

            }
        });

        // this.startRecordTarget.classList.add('d-none');
        // this.stopRecordTarget.classList.remove('d-none');
    };

    const [audioDevices, setAudioDevices] = useState([])
    const audioOptions = useRef()

    useEffect(() => {
        getDataKelas()
        getUserRole()
        getPertanyaan()
        getAudioSelection()
    }, [])

    const confirmEditQuestion = (event) => {
        event.preventDefault();

        swal({
            title: "Warning!",
            text: `Please double check before answering, once you pressed OK there's no turning back!`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    answerQuestion(event)
                } else {
                    await swal("Answer Question Cancelled!");
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
                                        <h2>Answer Question</h2>
                                    </CCol>
                                    <CCol md="2" xs="3" className="text-right">
                                        <CLink to={{ pathname: `/lecturer-class/lecturer-class-list/class-detail/${id}/${weekid}` }}>
                                            <CButton color="danger">Back</CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
                            </CCardHeader>

                            <CCardBody>
                                <CForm method="post" onSubmit={(event) => confirmEditQuestion(event)}>
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
                                                    defaultValue={kelas.kelas_name}
                                                ></CInput>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Question</CInputGroupText>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                {/* <CTextarea
                                                    name="textarea-input"
                                                    id="textarea-input"
                                                    rows="9"
                                                    placeholder="Type your question here..."
                                                    disabled
                                                    defaultValue={convertedText}
                                                /> */}
                                                <div className="preview"
                                                    dangerouslySetInnerHTML={createMarkup(pertanyaan.pertanyaan_mhs)}>
                                                </div>
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol md="2">
                                                <CInputGroupText>Answer</CInputGroupText>
                                            </CCol>
                                            <CCol>
                                                <CKEditor name="description" id="description"
                                                    editor={ClassicEditor}
                                                    data={jawaban == "" ? '' : jawaban}
                                                    onChange={(event, editor) => { handleChangeEditor(editor) }}
                                                />
                                            </CCol>
                                        </CInputGroup>
                                    </CRow>

                                    <CRow>
                                        <CInputGroup className="mb-3">
                                            <CCol>
                                                <div>
                                                    <select ref={audioOptions} onChange={audioOptionsOnChangeHandler} className="form-select">
                                                        {
                                                            audioDevices.map((audioDevice, idx) => <option key={idx} value={audioDevice.deviceId}>{audioDevice.label}</option>)
                                                        }
                                                    </select>
                                                    <CButton className="card-header-action btn-startrecord" id="btn-startrecord"
                                                        style={{ backgroundColor: '#3c4b64', margin: "0px 0px 5px 5px" }} onClick={audioRecordHandler}>
                                                        <CIcon content={freeSet.cilMic}
                                                            // style={{ margin: "0px 0px 0px 0px" }}
                                                            style={{ color: 'white' }}
                                                        // size="10%"
                                                        />
                                                    </CButton>
                                                    <CButton className="card-header-action btn-stoprecord d-none" id="btn-stoprecord"
                                                        style={{ backgroundColor: 'red', margin: "0px 0px 5px 5px" }} onClick={audioRecordHandler}>
                                                        <CIcon content={freeSet.cilMediaStop}
                                                            // style={{ margin: "0px 0px 5px 5px" }}
                                                            style={{ color: 'white' }}
                                                        />
                                                    </CButton>
                                                    {/* <CIcon content={freeSet.cilMediaStop} onClick={stopRecordHandler}
                                                        style={{ margin: "0px 0px 5px 5px" }}
                                                    /> */}
                                                    {/* <i
                                                        class="fa fa-book"
                                                        style={{ margin: "0px 0px 0px 10px" }}
                                                        onClick={stopRecordHandler}
                                                    ></i> */}
                                                </div>
                                            </CCol>

                                        </CInputGroup>
                                    </CRow>

                                    <CRow className="text-center">
                                        <CCol>
                                            <CButton color="success" className="px-4" type="submit">
                                                Answer
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </div >
    )
}

export default JawabanDosen;