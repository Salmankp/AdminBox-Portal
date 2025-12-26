import CIcon from "@coreui/icons-react";
import { CButton, CCol, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToaster } from "../../../actions";
import Constants from "../../../utils/Constants";
import "./CreateApiKey.scss";
import ConfirmationModalComponent from "../../../utils/ConfirmationModal";
import ClientTokenApi from "../../../api/ClientTokenApi";
function CreateApiKey(props: any) {

    const dispatch = useDispatch();
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const loggedUser = useSelector((state: any) => state.authUser);
    const [id, setId] = useState("");
    const [visible, setVisible] = useState(false);

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const dialogHandleClickOpen = () => {
        props.handleUpdateApiKey("");
        setCreateDialogOpen(true);
        setDefualtApiKeyFormStates();
    }

    const [companyName, setCompanyName] = useState({
        value: "",
        error: false,
        errorMsg: "",
    });
    const [companyEmail, setCompanyEmail] = useState({
        value: "",
        error: false,
        errorMsg: "",
    });
    const [contactName, setContactName] = useState({
        value: "",
        error: false,
        errorMsg: "",
    });
    const [contactEmail, setContactEmail] = useState({
        value: "",
        error: false,
        errorMsg: "",
    });
    const [phone, setPhone] = useState({
        value: "",
        error: false,
        errorMsg: "",
    });

    const [keyType, setKeyType] = useState({
        value: Constants.PRODUCTION,
        error: false,
        errorMsg: "",
    });

    const [expirationDate, setExpirationDate] = useState({
        value: moment(new Date()).add(1, 'months').format('MM/DD/yyyy'), error: false, errorMsg: "",
    })

    const [keyStatus, setKeyStatus] = useState({
        value: Constants.ACTIVE, error: false, errorMsg: "",
    })

    const validateForm = () => {
        let companyNameError = false;
        let companyEmailError = false;
        let contactNameError = false;
        let contactEmailError = false;
        let phoneError = false;

        const pattern = new RegExp(
            /^(?![0-9]+@)(("[\w-\s]+")|([+\w-]+(?:\.[+\w-]+)*)|("[\w-\s]+")([+\w-]+(?:\.[+\w-]+)*))(@((?:[+\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        const phonePattern = new RegExp(/^[\d ]*$/);

        if (companyName.value === "") {
            setCompanyName({
                ...companyName,
                error: true,
                errorMsg: "Company Name is required",
            });
            companyNameError = true;
        } else if (/\d/.test(companyName.value) || !/\S/.test(companyName.value)) {
            setCompanyName({
                ...companyName,
                error: true,
                errorMsg: "Invalid Company Name",
            });
            companyNameError = true;
        }

        if (companyEmail.value === "") {
            setCompanyEmail({
                ...companyEmail,
                error: true,
                errorMsg: "Company Email is required",
            });
            companyEmailError = true;
        } else if (!pattern.test(companyEmail.value)) {
            setCompanyEmail({
                ...companyEmail,
                error: true,
                errorMsg: "Invalid Company Email",
            });
            companyEmailError = true;
        }

        if (contactName.value === "") {
            setContactName({
                ...contactName,
                error: true,
                errorMsg: "Contact Name is required",
            });
            contactNameError = true;
        } else if (/\d/.test(contactName.value) || !/\S/.test(contactName.value)) {
            setContactName({
                ...contactName,
                error: true,
                errorMsg: "Invalid Contact Name",
            });
            contactNameError = true;
        }

        if (contactEmail.value === "") {
            setContactEmail({
                ...contactEmail,
                error: true,
                errorMsg: "Contact Email is required",
            });
            contactEmailError = true;
        } else if (!pattern.test(contactEmail.value)) {
            setContactEmail({
                ...contactEmail,
                error: true,
                errorMsg: "Invalid Company Email",
            });
            contactEmailError = true;
        }

        if (phone.value === "") {
            setPhone({
                ...phone,
                error: true,
                errorMsg: "Phone Number is required",
            });
            phoneError = true;
        } else if (!phonePattern.test(phone.value)) {
            setPhone({
                ...phone,
                error: true,
                errorMsg: "Invalid Phone No",
            });
            phoneError = true;
        }

        if (!companyNameError) {
            setCompanyName({ ...companyName, error: false, errorMsg: "" });
        }

        if (!contactNameError) {
            setContactName({ ...contactName, error: false, errorMsg: "" });
        }

        if (!companyEmailError) {
            setCompanyEmail({ ...companyEmail, error: false, errorMsg: "" });
        }

        if (!contactEmailError) {
            setContactEmail({ ...contactEmail, error: false, errorMsg: "" });
        }

        if (!phoneError) {
            setPhone({ ...phone, error: false, errorMsg: "" });
        }

        if (
            companyNameError
            || companyEmailError
            || contactNameError
            || contactEmailError
            || phoneError
        ) {
            return false;
        }

        return true;

    }

    const setDefualtApiKeyFormStates = () => {
        setCompanyName({
            ...companyName,
            value: "",
            error: false,
            errorMsg: "",
        });

        setCompanyEmail({
            ...companyEmail,
            value: "",
            error: false,
            errorMsg: "",
        });

        setContactName({
            ...contactName,
            value: "",
            error: false,
            errorMsg: "",
        });

        setContactEmail({
            ...contactEmail,
            value: "",
            error: false,
            errorMsg: "",
        });

        setPhone({
            ...phone,
            value: "",
            error: false,
            errorMsg: "",
        });

        setExpirationDate({
            ...expirationDate,
            value: moment(new Date()).add(1, 'months').format('MM/DD/yyyy'),
            error: false,
            errorMsg: ""
        })

        setKeyType({
            ...keyType, value: Constants.PRODUCTION, error: false, errorMsg: "",
        })

        setKeyStatus({ ...keyStatus, value: Constants.ACTIVE, error: false, errorMsg: "" })
    };

    const updateApiKeyForm = async () => {
        const isValid = validateForm();
        if (isValid) {
            const data = {
                companyName: companyName.value, companyEmail: companyEmail.value
                , contactName: contactName.value, contactEmail: contactEmail.value, contactPhone: phone.value,
                expirationDate: expirationDate.value ? expirationDate.value : moment().add(1, 'months').format('MM/DD/yyyy'),
                keyType: keyType.value ? keyType.value : Constants.PRODUCTION, keyStatus: keyStatus.value ? keyStatus.value : Constants.ACTIVE
            };
            const res: any = await ClientTokenApi.update(data, id);

            if(res && res.data.statusCode){
                setViewDialogOpen(false);
                const id = res.data.data._id;
                const index = props.apiKeys.findIndex((object: any) => {
                    return object._id === id;
                });
                if (index !== -1) {
                    props.apiKeys[index] = res.data.data;
                }

                dispatch(
                    setToaster({
                        isOpen: true,
                        type: "success",
                        msg: Constants.API_KEY_IS_UPDATED,
                    })
                );
            }else {
                if (res?.response?.data.statusCode === 400) {
                    dispatch(
                        setToaster({
                            isOpen: true,
                            type: "error",
                            msg: res?.response?.data.message?.body?.error ? 'Something went wrong' : res?.response?.data?.message
                        })
                    );
                } else {
                    dispatch(
                        setToaster({
                            isOpen: true,
                            type: "error",
                            msg: res?.response?.data.message,
                        })
                    );
                }
            }
        }
    }
    const submitApiKeyForm = async () => {
        const isValid = validateForm();
        if (isValid) {
            if (props.updateApiKey) {
                setId(props.updateApiKey._id);
                setCreateDialogOpen(false);
                setViewDialogOpen(true);
            } else {

                const data = {
                    companyName: companyName.value, companyEmail: companyEmail.value
                    , contactName: contactName.value, contactEmail: contactEmail.value, contactPhone: phone.value,
                    expirationDate: moment(expirationDate.value).add(1, 'months').format('MM/DD/yyyy'),
                    keyType: keyType.value, keyStatus: keyStatus.value
                };
                const res: any = await ClientTokenApi.create(data);
                if(res && res.data.statusCode === 200){
                    setCompanyName({
                        ...companyName,
                        value: "",
                        error: false,
                        errorMsg: ""
                    })
                    setCompanyEmail({
                        ...companyEmail, value: "", error: false, errorMsg: ""
                    })

                    setContactName({
                        ...contactName, value: "", error: false, errorMsg: ""
                    })

                    setContactEmail({
                        ...contactEmail, value: "", error: false, errorMsg: ""
                    })
                    setPhone({
                        ...phone, value: "", error: false, errorMsg: ""
                    })

                    setKeyType({ ...keyType, error: false, errorMsg: "" })

                    setExpirationDate({ ...expirationDate, error: false, errorMsg: "" });
                    setKeyStatus({ ...keyStatus, error: false, errorMsg: "" });
                    setCreateDialogOpen(!createDialogOpen)
                    setVisible(!visible);
                    dispatch(
                        setToaster({
                            isOpen: true,
                            type: "success",
                            msg: Constants.API_KEY_IS_REGISTERED
                        })
                    );

                    props.apiKeys.push(res.data.data);
                }else {
                    if (res?.response.data.statusCode === 400) {
                        setCompanyEmail({
                            ...companyEmail,
                            error: true,
                            errorMsg: "Company Email already exists",
                        });

                        dispatch(
                            setToaster({
                                isOpen: true,
                                type: "error",
                                msg: Constants.COMPANY_WITH_EMAIL_ALREADY_EXIST
                            })
                        );

                    } else {
                        console.log('error', res);
                    }
                }

            }

        }
    };
    const modalDismiss = () => {
        props.handleUpdateApiKey("");
        setCreateDialogOpen(false)
    }

    useEffect(() => {
        if (props.updateApiKey) {
            setCompanyName({
                ...companyName,
                value: props.updateApiKey.companyName,
                error: false,
                errorMsg: "",
            });

            setCompanyEmail({
                ...companyEmail,
                value: props.updateApiKey.companyEmail,
                error: false,
                errorMsg: "",
            });

            setContactName({
                ...contactName,
                value: props.updateApiKey.contactName,
                error: false,
                errorMsg: "",
            });

            setContactEmail({
                ...contactEmail,
                value: props.updateApiKey.contactEmail,
                error: false,
                errorMsg: "",
            });

            setPhone({
                ...phone,
                value: props.updateApiKey.contactPhone,
                error: false,
                errorMsg: "",
            });

            setExpirationDate({
                ...expirationDate,
                value: props.updateApiKey.expirationDate,
                error: false,
                errorMsg: "",
            })

            setCreateDialogOpen(!createDialogOpen);

            setKeyType({ ...keyType, value: props.updateApiKey.keyType, error: false, errorMsg: "" });

            setKeyStatus({ ...keyStatus, value: props.updateApiKey.keyStatus, error: false, errorMsg: "" })
        }

    }, [props.updateApiKey])
    return (
        <div>
            <div className="wrapper">
                <div className="add_btn_wrapper">
                    <div className="addpatient_button">
                        <CButton
                            aria-label="Filter"
                            className="add_button_style"
                            onClick={dialogHandleClickOpen}
                        >
                            <div className="temp_two">
                                <div className="add_icon">
                                    <CIcon name="cil-plus" size="lg" />
                                </div>
                                <span className="add_btn_content">Add API Key</span>
                            </div>
                        </CButton>
                    </div>
                </div>

                {/* <CModal visible={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>

                    <CModalHeader onClick={() => setViewDialogOpen(false)}>
                        <CModalTitle>Confirmation Modal</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p>{Constants.ARE_YOU_SURE_TO_UPDATE} </p>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setViewDialogOpen(false)}>
                            Close
                        </CButton>
                        <CButton color="primary" onClick={updateApiKeyForm}>
                            Update
                        </CButton>
                    </CModalFooter>
                </CModal> */}

                <ConfirmationModalComponent
                    visible={viewDialogOpen}
                    title="Confirmation Modal"
                    body={`<p>${Constants.ARE_YOU_SURE_TO_UPDATE}</p>`}
                    update={updateApiKeyForm}
                    setVisible={() => { setViewDialogOpen(false) }}
                />

                <CModal visible={createDialogOpen} onClose={() => modalDismiss()}>
                    <CModalHeader onClick={() => setCreateDialogOpen(false)}>
                        {props.updateApiKey ? (
                            <CModalTitle>Update {Constants.API_KEY}</CModalTitle>
                        ) : (
                            <CModalTitle>Create {Constants.API_KEY} </CModalTitle>
                        )}
                    </CModalHeader>
                    <CModalBody className="customFontSize">

                        <form autoComplete='off' className='form'>
                            <div className='form-floating mb-3'>
                                <CFormInput
                                    className={
                                        companyName.error ? "Danger-border" : "Default-border"
                                    }
                                    type='text'
                                    id='company_name'
                                    placeholder='Company Name'
                                    value={companyName.value}
                                    onChange={(e) => {
                                        setCompanyName({
                                            ...companyName,
                                            value: e.target.value,
                                        });
                                    }}
                                />
                                <label className={
                                    companyName.error ? "Danger-label" : "Default-label"
                                }>Company Name</label>

                                <span className="Default-danger">
                                    {companyName.errorMsg ? companyName.errorMsg : ""}
                                </span>
                            </div>
                            <div className='form-floating mb-3'>
                                <CFormInput
                                    className={
                                        companyEmail.error ? "Danger-border" : "Default-border"
                                    }
                                    type='email'
                                    id='company_email'
                                    placeholder='company_email'
                                    value={companyEmail.value}
                                    onChange={(e) => {
                                        setCompanyEmail({
                                            ...companyEmail,
                                            value: e.target.value,
                                        });
                                    }}
                                />
                                <label className={companyEmail.error ? "Danger-label" : "Default-label"}>Company Email</label>
                                <span className="Default-danger">
                                    {companyEmail.errorMsg ? companyEmail.errorMsg : ""}
                                </span>
                            </div>
                            <div className='form-floating mb-3'>
                                <CFormInput
                                    className={
                                        contactName.error ? "Danger-border" : "Default-border"
                                    }
                                    type='text'
                                    id='contact_name'
                                    placeholder='Contact Name'
                                    value={contactName.value}
                                    onChange={(e) => {
                                        setContactName({
                                            ...contactName,
                                            value: e.target.value,
                                        });
                                    }}
                                />
                                <label className={contactName.error ? "Danger-label" : "Default-label"}>Contact Name</label>
                                <span className="Default-danger">
                                    {contactName.errorMsg ? contactName.errorMsg : ""}
                                </span>
                            </div>


                            <div className="row create-task-row my-4">
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className='form-floating mb-3'>
                                        <CFormInput
                                            className={
                                                contactEmail.error ? "Danger-border" : "Default-border"
                                            }
                                            type='email'
                                            id='contact_email'
                                            placeholder='Contact Email'
                                            value={contactEmail.value}
                                            onChange={(e) => {
                                                setContactEmail({
                                                    ...contactEmail,
                                                    value: e.target.value,
                                                });
                                            }}
                                        />
                                        <label className={contactName.error ? "Danger-label" : "Default-label"}>Contact Email</label>
                                        <span className="Default-danger">
                                            {contactEmail.errorMsg ? contactEmail.errorMsg : ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-floating mb-3">
                                        <select
                                            style={{ paddingTop: "10%" }}
                                            onChange={(e) => {
                                                setKeyType({
                                                    ...keyType,
                                                    value: e.target.value,
                                                });

                                            }
                                            } className="form-select form-select-sm" value={keyType.value} aria-label=".form-select-sm example" placeholder="type of api key">
                                            <option defaultValue="production">Production</option>
                                            <option value="sandbox">Sandbox</option>
                                        </select>
                                        <label className={keyType.error ? "Danger-label" : "Default-label"}>Key Type</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row create-task-row my-4">

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="form-floating">
                                        <CFormInput
                                            className={
                                                phone.error ? "Danger-border" : "Default-border"
                                            }
                                            placeholder='Contact Email'
                                            type='tel'
                                            id='phone'
                                            name='phone'
                                            value={phone.value}
                                            onChange={(e) => {
                                                setPhone({
                                                    ...phone,
                                                    value: e.target.value,
                                                });
                                            }}
                                        />
                                        <CFormLabel
                                            className={phone.error ? "Danger-label" : "Default-label"}
                                        >
                                            Phone Number
                                        </CFormLabel>
                                        <span className="Default-danger">
                                            {phone.errorMsg ? phone.errorMsg : ""}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 dobcol">
                                    <div className="form-floating">
                                        <DatePicker
                                            wrapperClassName="custom-date-picker"
                                            dateFormat="dd/MM/yyyy"
                                            minDate={moment().toDate()}
                                            selected={
                                                expirationDate.value ? moment(expirationDate.value).toDate() : moment().toDate()
                                            }
                                            onChange={(elementDate) => {
                                                setExpirationDate({
                                                    ...expirationDate,
                                                    value: moment(elementDate).format("MM/DD/yyyy"),
                                                });
                                            }}
                                        />
                                        <CFormLabel>Expiration Date </CFormLabel>
                                    </div>
                                </div>
                            </div>

                            <div className="row create-task-row my-4">

                                <div className="col-12">
                                    <div className="form-floating mb-3">

                                        <CRow>
                                            <h6 className="customMarkAPadding">Key Status</h6>
                                        </CRow>

                                        <CRow>
                                            <CCol lg={4} sm={12}>
                                                <div className="form-check">
                                                    <input className="form-check-input btn-border" type="radio" onChange={(e) => { setKeyStatus({ ...keyStatus, value: e.target.value }) }} name="exampleRadios" id="exampleRadios1" value={Constants.ACTIVE}
                                                        defaultChecked={(!keyStatus.value || keyStatus.value === Constants.ACTIVE)} />
                                                    <label className="form-check-label Default-success" >
                                                        {(Constants.ACTIVE).charAt(0).toUpperCase() + (Constants.ACTIVE).slice(1)}
                                                    </label>
                                                </div>
                                            </CCol>
                                            <CCol lg={4} sm={12}>
                                                <div className="form-check">
                                                    <input className="form-check-input btn-border" type="radio" onChange={(e) => { setKeyStatus({ ...keyStatus, value: e.target.value }) }} name="exampleRadios" id="exampleRadios2" value={Constants.INVALID}
                                                        defaultChecked={!!(keyStatus.value && keyStatus.value === Constants.INVALID)} />
                                                    <label className="form-check-label Default-danger">
                                                        {(Constants.INVALID).charAt(0).toUpperCase() + (Constants.INVALID).slice(1)}
                                                    </label>
                                                </div>
                                            </CCol>
                                            <CCol lg={4} sm={12}>
                                                <div className="form-check">
                                                    <input className="form-check-input btn-border" type="radio" onChange={(e) => { setKeyStatus({ ...keyStatus, value: e.target.value }) }} name="exampleRadios" id="exampleRadios3" value={Constants.EXPIRED}
                                                        defaultChecked={!!(keyStatus.value && keyStatus.value === Constants.EXPIRED)} />
                                                    <label className="form-check-label Default-warning">
                                                        {(Constants.EXPIRED).charAt(0).toUpperCase() + (Constants.EXPIRED).slice(1)}
                                                    </label>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </div>
                                </div>
                            </div>


                        </form>

                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setCreateDialogOpen(false)}>
                            Close
                        </CButton>
                        {props.updateApiKey ? (
                            <CButton color="primary" onClick={submitApiKeyForm}>
                                Update
                            </CButton>
                        ) : (
                            <CButton color="primary" onClick={submitApiKeyForm}>
                                Save
                            </CButton>
                        )}
                    </CModalFooter>
                </CModal>
            </div>
        </div>
    );
}

export default CreateApiKey;