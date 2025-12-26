import './RegisterApiKey';
import { withRouter } from 'react-router-dom';
import { CContainer, CRow, CCol, CFormInput, CButton } from '@coreui/react';
import './RegisterApiKey.scss';
import { setToaster } from '../../actions';
import Constants from '../../utils/Constants';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useDispatch } from 'react-redux';
import ConfirmationModalComponent from '../../utils/ConfirmationModal';
import moment from 'moment';
import ClientTokenApi from '../../api/ClientTokenApi';
import AuthApi from '../../api/AuthApi';
function RegisterApiKey(props: any) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [apiKeyType, setApiKeyType] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
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

  const [keyStatus, setKeyStatus] = useState({
    value: "active",
    error: false,
    errorMsg: "",
  });

  const validateForm = () => {
    let companyEmailError = false;
    let contactNameError = false;
    let contactEmailError = false;
    let companyNameError = false;
    let phoneError= false;

    const pattern = new RegExp(
      /^(?![0-9]+@)(("[\w-\s]+")|([+\w-]+(?:\.[+\w-]+)*)|("[\w-\s]+")([+\w-]+(?:\.[+\w-]+)*))(@((?:[+\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const phonePattern = new RegExp(/^[\d ]*$/);

    // if (/\d/.test(companyName.value) || !/\S/.test(companyName.value)) {
    //   setCompanyName({
    //     ...companyName,
    //     error: true,
    //     errorMsg: "Invalid Company Name",
    //   });
    //   companyNameError = true;
    // }


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

    if (!phonePattern.test(phone.value)) {
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

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      dispatch(
        setToaster({
          isOpen: true,
          type: "error",
          msg: Constants.EXECUTION_FAILED
        })
      );
      return;
    }

    try {
      const token = await executeRecaptcha('register');
      const data = {
        token
      }

      const captcha = await AuthApi.verifyRecaptcha(data);

      console.log('captcha', captcha);
      return captcha;

    } catch (err) {
      console.log('Error while loading recaptcha', err);
    }

  }, [executeRecaptcha]);

  const submitApiKeyForm = async () => {
    const isValid = validateForm();
    if (isValid) {

      const captcha: any = await handleReCaptchaVerify();
      if(!captcha.data.error){
        const data = {
          companyName: companyName.value, companyEmail: companyEmail.value
          , contactName: contactName.value, contactEmail: contactEmail.value, contactPhone: phone.value, expirationDate: moment().add(1, 'months').format('MM/DD/yyyy'),
          keyType: Constants.GUEST_USER_API_KEY_TYPE, keyStatus: keyStatus.value
        };

        const res: any = await ClientTokenApi.create(data);
        console.log('res', res);
        if(res && res?.data?.statusCode === 200){
          setApiKeyType(res.data.data.apiKey);

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
          setKeyStatus({ ...keyStatus, error: false, errorMsg: "" })
          setVisible(!visible);
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
      } else {
        dispatch(
          setToaster({
            isOpen: true,
            type: "error",
            msg: Constants.CAPTCHA_VERIFY_FAILED
          })
        );
      }      
      }
  }
  return (
    <section className='loginSection d-flex align-items-center justify-content-center'>
      <CContainer className='container'>
        <CRow>
          <CCol xs={12} xl={6} className='m-auto signIn__form border_wrapper'>
            <div className='logo'>
              <img
                src='/assets/images/theraforge_favicon_logo.png'
                alt='Theraforge Health care logo'
              />
            </div>
            <CRow className='mainboxRow border_wrapper'>
              <CCol xs={12}>
                <div className='LoginForm'>
                  <h1 className='heading d-flex align-items-center justify-content-center mb-4'>
                    Register {Constants.API_KEY}
                  </h1>
                  <p className="subText">After submission the contact email address will receive a confirmation message with a link to click to access the key management dashboard.</p>
                  <form autoComplete='off' className='form'>
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
                      <label className={contactName.error ? "Danger-label" : "Default-label"}>Contact Email*</label>
                      <span className="Default-danger">
                        {contactEmail.errorMsg ? contactEmail.errorMsg : ""}
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
                      <label className={contactName.error ? "Danger-label" : "Default-label"}>Contact Name*</label>
                      <span className="Default-danger">
                        {contactName.errorMsg ? contactName.errorMsg : ""}
                      </span>
                    </div>
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
                      <label className={companyEmail.error ? "Danger-label" : "Default-label"}>Company Email*</label>
                      <span className="Default-danger">
                        {companyEmail.errorMsg ? companyEmail.errorMsg : ""}
                      </span>
                    </div>
                 
                    
                    <div className='form-floating mb-3'>
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
                     
                      <label className={phone.error ? "Danger-label" : "Default-label"}>Contact Phone</label>
                     
                      
                      <span className="Default-danger">
                        {phone.errorMsg ? phone.errorMsg : ""}
                      </span>
                    </div>
                    <label className="mandatory-field-footer">(*) = mandatory fields</label>
                    <CCol xs={12} className='submit_wrap'>
                      <CButton
                        color='info'
                        aria-label='Submit Button'
                        className='submit_button'
                        onClick={submitApiKeyForm}
                      >
                        Submit
                      </CButton>
                    </CCol>
                  </form>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>

      <ConfirmationModalComponent
        visible={visible}
        title="Register API Key"
        body={apiKeyType ? `<p> Thanks for getting registered.</p>
        <p>Here is your ${Constants.API_KEY}, kindly save it. If you have any query contact our support team.</p>` : null}
        apiKeyType={apiKeyType}
        setVisible={() => { setVisible(false) }}
      />
      {/* <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClick={() => setVisible(false)}>
          <CModalTitle>Register API Keys</CModalTitle>
        </CModalHeader>
        <CModalBody><p>Thanks for getting registered.</p>
          <p>Here is your {Constants.API_KEY}, kindly save it. If you have any query contact our support team.</p>
          <ClipboardCopyComponent copyText={apiKeyType} /> </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal> */}
    </section>
  );
}

export default withRouter(RegisterApiKey);
