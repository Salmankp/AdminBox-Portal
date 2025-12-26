
import "./login.scss";
import { Link, withRouter } from 'react-router-dom';
import { CContainer, CRow, CCol, CFormInput, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useState } from "react";
import { loggedIn, setToaster } from "../../actions";
import { useDispatch } from "react-redux";
import Constants from "../../utils/Constants";
import AuthApi from "../../api/AuthApi";
function Login(props: any) {
    const dispatch = useDispatch();
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

    const validateForm = () => {
        let emailError = false;
        let passwordError = false;
        const pattern = new RegExp(
            /^(("[\w-\s]+")|([+\w-]+(?:\.[+\w-]+)*)|("[\w-\s]+")([+\w-]+(?:\.[+\w-]+)*))(@((?:[+\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (!pattern.test(emailAddress.value)) {
            setEmailAddress({
                ...emailAddress,
                error: true,
                errorMsg: "Invalid Email",
            });
            emailError = true;
        }
        if (emailAddress.value === "") {
            setEmailAddress({
                ...emailAddress,
                error: true,
                errorMsg: "Email is required",
            });
            emailError = true;
        }
        if (password.value.length < 6) {
            setPassword({
                ...password,
                error: true,
                errorMsg: "Password should be at least 6 charcters",
            });
            passwordError = true;
        }
        if (password.value === "") {
            setPassword({
                ...password,
                error: true,
                errorMsg: "Password is required",
            });
            passwordError = true;
        }

        if (!emailError) {
            setEmailAddress({ ...emailAddress, error: false, errorMsg: "" });
        }
        if (!passwordError) {
            setPassword({ ...password, error: false, errorMsg: "" });
        }

        if (emailError || passwordError) {
            return false;
        }

        return true;
    };
    const data = {
        email: emailAddress.value,
        password: password.value,
    };
    const submitLoginForm = async () => {
        const isValid = validateForm();

        if (isValid) {

            const res: any = await AuthApi.login(data);
            console.log('res of login api', res);
            if(res && res?.data?.statusCode === 200){
                setEmailAddress({
                    ...emailAddress,
                    value: "",
                    error: false,
                    errorMsg: "",
                });
                setPassword({
                    ...password,
                    value: "",
                    error: false,
                    errorMsg: "",
                });
                localStorage.setItem("Token", res.data.accessToken.token);
                sessionStorage.setItem("User", JSON.stringify(res.data.data));
                dispatch(loggedIn());
                dispatch(
                    setToaster({
                        isOpen: true,
                        type: "success",
                        msg: Constants.LOGGED_IN_SUCCESS
                    })
                );
                props.history.push("/api-keys");
            }else {
                if (res?.response && res?.response?.data.statusCode === 400) {
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
                            msg: res.message,
                        })
                    );
                }
            }
        }
    }

    return (
        <div>
            <section className="loginSection d-flex align-items-center justify-content-center">
                <CContainer>
                    <CRow>
                        <CCol xs={12} xl={8} className="m-auto sign_in border_wrapper">
                            <div className="logo">
                                <img
                                    src="/assets/images/theraforge_favicon_logo.png"
                                    alt="Theraforge Health care logo"
                                />
                            </div>
                            <CRow className="mainboxRow border_wrapper">
                                <CCol xs={12} md={6} lg={6}>
                                    <div className="LoginForm">
                                        <h3>Log in with Registered Email</h3>
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

                                            <div className="form-floating">
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
                                                <label
                                                    className={
                                                        password.error ? "Danger-label" : "Default-label"
                                                    }
                                                >
                                                    Password
                                                </label>
                                            </div>
                                            <span className="Default-danger">
                                                {password.errorMsg ? password.errorMsg : ""}
                                            </span>
                                            <div
                                                className="RememberMe"
                                                style={{ paddingBottom: "5%", marginTop: "0.5rem" }}
                                            >
                                                <CRow>
                                                    <CCol
                                                        xs={7}
                                                        lg={7}
                                                        className="d-flex align-items-center"
                                                    >
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="flexCheckDefault"
                                                            />
                                                            <label className="form-check-label">
                                                                Remember Me
                                                            </label>
                                                        </div>
                                                    </CCol>
                                                    <CCol xs={5} lg={5} className="signInBtn">
                                                        <CButton
                                                            color="info"
                                                            aria-label="Signin Button"
                                                            className="signin_button"
                                                            onClick={submitLoginForm}
                                                        >
                                                            Submit
                                                            <CIcon size="lg" name="cil-arrow-right" />

                                                        </CButton>

                                                    </CCol>
                                                </CRow>

                                            </div>
                                            <div className="dontacc">

                                                <Link
                                                    className="forgot_password"
                                                    to="#"
                                                    color="inherit"
                                                    aria-label="Click Forgot Password"
                                                    style={{ textDecoration: "underline" }}

                                                >
                                                    Forgot Password
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </CCol>
                                <CCol xs={12} md={6} lg={6}>
                                    <div className="loginImage">
                                        <img
                                            src="/assets/images/test.jpg"
                                            alt="Login Doctor Image"
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

export default withRouter(Login);
