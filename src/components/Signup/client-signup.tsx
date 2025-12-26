import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CCol, CRow, CFormInput, CContainer, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";


import { setToaster } from "../../actions";
import "./client-signup.scss";
import Constants from "../../utils/Constants";
import AuthApi from "../../api/AuthApi";

function Signup(props: any) {

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState({
    value: "",
    error: false,
    errorMsg: "",
  });
  const [lastName, setLastName] = useState({
    value: "",
    error: false,
    errorMsg: "",
  });
  const [emailAddress, setEmailAddress] = useState({
    value: "",
    error: false,
    errorMsg: "",
  });

  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMsg: "",
  });
  const [termCondition, setTermCondition] = useState({
    value: false,
    error: false,
    errorMsg: "",
  });

  const validateForm = () => {
    let firstNameError = false;
    let lastNameError = false;
    let emailError = false;
    let passwordError = false;
    let termConditionError = false;

    const pattern = new RegExp(
      /^(?![0-9]+@)(("[\w-\s]+")|([+\w-]+(?:\.[+\w-]+)*)|("[\w-\s]+")([+\w-]+(?:\.[+\w-]+)*))(@((?:[+\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (firstName.value === "") {
      setFirstName({
        ...firstName,
        error: true,
        errorMsg: "First Name is required",
      });
      firstNameError = true;
    } else if (/\d/.test(firstName.value) || !/\S/.test(firstName.value)) {
      setFirstName({
        ...firstName,
        error: true,
        errorMsg: "Invalid First Name",
      });
      firstNameError = true;
    }
    if (lastName.value === "") {
      setLastName({
        ...lastName,
        error: true,
        errorMsg: "Last Name is required",
      });
      lastNameError = true;
    } else if (/\d/.test(lastName.value) || !/\S/.test(lastName.value)) {
      setLastName({ ...lastName, error: true, errorMsg: "Invalid Last Name" });
      lastNameError = true;
    }
    if (emailAddress.value === "") {
      setEmailAddress({
        ...emailAddress,
        error: true,
        errorMsg: "Email is required",
      });
      emailError = true;
    } else if (!pattern.test(emailAddress.value)) {
      setEmailAddress({
        ...emailAddress,
        error: true,
        errorMsg: "Invalid Email",
      });
      emailError = true;
    }
    if (password.value === "") {
      setPassword({
        ...password,
        error: true,
        errorMsg: "Password is required",
      });
      passwordError = true;
    } else if (password.value.length < 10) {
      setPassword({
        ...password,
        error: true,
        errorMsg: "Password should be at least 10 charcters",
      });
      passwordError = true;
    }
    if (!termCondition.value) {
      setTermCondition({
        ...termCondition,
        value: false,
        error: true,
        errorMsg: "Please accept terms and conditions",
      });
      termConditionError = true;
    } else {
      setTermCondition({
        ...termCondition,
        value: true,
        error: false,
        errorMsg: "",
      });
    }

    if (!firstNameError) {
      setFirstName({ ...firstName, error: false, errorMsg: "" });
    }

    if (!lastNameError) {
      setLastName({ ...lastName, error: false, errorMsg: "" });
    }

    if (!emailError) {
      setEmailAddress({ ...emailAddress, error: false, errorMsg: "" });
    }
    if (!passwordError) {
      setPassword({ ...password, error: false, errorMsg: "" });
    }
    if (
      firstNameError
      || lastNameError
      || emailError
      || passwordError
      || termConditionError
    ) {
      return false;
    }

    return true;
  };

  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    type: Constants.CLIENT_ADMIN_TYPE,
    email: emailAddress.value,
    password: password.value,
  };
  const api_key_url = window.location.href.split('api-key=')[1];
  const submitSignupForm = async () => {
    const isValid = validateForm();
    if (isValid) {

      const res: any = await AuthApi.signup(data, api_key_url);
      if (res && res.status === 200) {
        setFirstName({
          ...emailAddress,
          value: "",
          error: false,
          errorMsg: "",
        });
        setLastName({
          ...emailAddress,
          value: "",
          error: false,
          errorMsg: "",
        });
        setEmailAddress({
          ...emailAddress,
          value: "",
          error: false,
          errorMsg: "",
        });
        setPassword({
          ...password, value: "", error: false, errorMsg: ""
        });
        props.history.push("/login");
      } else {
        if (res?.response.status === 400) {

          dispatch(
            setToaster({
              isOpen: true,
              type: "error",
              msg: res?.response.data.message,
            })
          );

        } else {
          dispatch(
            setToaster({
              isOpen: true,
              type: "error",
              msg: res?.message,
            })
          );
        }
      }
    }
  };

  const handleTermCondition = () => {
    const termConditionValue = !termCondition.value;
    setTermCondition({ ...termCondition, value: termConditionValue });
  };

  return (
    <div>
      <section className="loginSection d-flex align-items-center justify-content-center">

        <CContainer>
          <CRow>
            <CCol
              xs={12}
              xl={8}
              className="m-auto formBox signUp__form border_wrapper"
            >
              <div className="logo">
                <img
                  src={
                    "/assets/images/theraforge_favicon_logo.png"
                  }
                  alt="Theraforge Health care logo"
                />
              </div>
              <CRow className="mainboxRow border_wrapper">
                <CCol xs={12} className="signupmain" md={6} lg={6}>
                  <div className="LoginForm">
                    <h2 aria-label="don't hava account signup">
                      {" "}
                      Sign up and Create an Account
                    </h2>
                    <form autoComplete="off">
                      <div className="form-floating mb-2">
                        <CFormInput
                          className={
                            emailAddress.error
                              ? "Danger-border"
                              : "Default-border"
                          }
                          type="email"
                          id="email_address"
                          placeholder="email_address"
                          value={emailAddress.value}
                          onChange={(e) => {
                            setEmailAddress({
                              ...emailAddress,
                              value: e.target.value,
                            });
                          }}
                        />
                        <label
                          className={
                            emailAddress.error
                              ? "Danger-label"
                              : "Default-label"
                          }
                        >
                          Email Address
                        </label>
                        <span className="Default-danger">
                          {emailAddress.errorMsg ? emailAddress.errorMsg : ""}
                        </span>
                      </div>
                      <div className="form-floating mb-2">
                        <CFormInput
                          className={
                            firstName.error ? "Danger-border" : "Default-border"
                          }
                          type="text"
                          id="first_name"
                          placeholder="first_name"
                          value={firstName.value}
                          onChange={(e) => {
                            setFirstName({
                              ...firstName,
                              value: e.target.value,
                            });
                          }}
                        />
                        <label
                          className={
                            firstName.error ? "Danger-label" : "Default-label"
                          }
                        >
                          First Name
                        </label>
                        <span className="Default-danger">
                          {firstName.errorMsg ? firstName.errorMsg : ""}
                        </span>
                      </div>

                      <div className="form-floating mb-2">
                        <CFormInput
                          className={
                            lastName.error ? "Danger-border" : "Default-border"
                          }
                          type="text"
                          id="last_name"
                          placeholder="last_name"
                          value={lastName.value}
                          onChange={(e) => {
                            setLastName({
                              ...lastName,
                              value: e.target.value,
                            });
                          }}
                        />
                        <label
                          className={
                            lastName.error ? "Danger-label" : "Default-label"
                          }
                        >
                          Last Name
                        </label>
                        <span className="Default-danger">
                          {lastName.errorMsg ? lastName.errorMsg : ""}
                        </span>
                      </div>



                      <div className="form-floating mb-2">
                        <CFormInput
                          className={
                            password.error ? "Danger-border" : "Default-border"
                          }
                          type="password"
                          id="password"
                          placeholder="password"
                          value={password.value}
                          onChange={(e) => {
                            setPassword({
                              ...password,
                              value: e.target.value,
                            });
                          }}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text">
                            <CIcon
                              className="customCursorPointer"
                              data-coreui-toggle="tooltip"
                              title="password_generator"
                              size="lg"
                              name="cil-lock-locked"
                            />
                          </span>
                        </div>
                        <label
                          className={
                            password.error ? "Danger-label" : "Default-label"
                          }
                        >
                          Password
                        </label>
                        <span className="Default-danger">
                          {password.errorMsg ? password.errorMsg : ""}
                        </span>
                      </div>

                      <div className="compulsory-fields">
                        <CRow>
                          <CCol xs={12} className="TC">
                            <div className="fields-check">

                              <label className="fields-check-label">
                                All fields are mandatory*
                              </label>
                            </div>
                          </CCol>
                        </CRow>
                      </div>


                      <div className="RememberMe TadnC">
                        <CRow>
                          <CCol xs={12} className="TC">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={termCondition.value}
                                onChange={handleTermCondition}
                              />
                              <label className="form-check-label">
                                I agree
                                &nbsp;&nbsp;&nbsp;
                                <Link
                                  to="#"
                                  className="terms"
                                  aria-label="terms_and_conditions"
                                  href="#"
                                  color="inherit"
                                >
                                  Terms and Conditions *
                                </Link>
                              </label>
                            </div>
                            <span className="Danger-label">
                              {termCondition.error
                                ? termCondition.errorMsg
                                : ""}
                            </span>
                          </CCol>
                        </CRow>
                      </div>
                      <div className="alreadyacc">
                        <Link
                          to="/login"
                          color="inherit"
                          aria-label="already_have_account"
                          style={{ textDecoration: "underline" }}
                        >
                          Already have an account? Login
                        </Link>
                      </div>
                      <div className="SignUpBtn">
                        <CButton
                          className="submitBtnFullWidth"
                          color="primary"
                          aria-label="submit"
                          onClick={submitSignupForm}
                        >
                          Submit
                        </CButton>
                      </div>
                    </form>
                  </div>
                </CCol>
                <CCol xs={12} className="signupmain" md={6} lg={6}>
                  <div className="SignUpImage">
                    <img
                      src={"/assets/images/test.jpg"
                      }
                      alt="Login Nurse Image"
                    />
                  </div>
                  <div className="loginText">
                    <p>TheraForge offers digital health services for doctors and patients.</p>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </section>
    </div>
  );
}

export default withRouter(Signup);
