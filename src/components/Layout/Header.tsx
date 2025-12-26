import { withRouter } from "react-router-dom";
import "./Header.scss";
import {
    CCol,
    CRow,
    CNavbar,
    CContainer,
    CNavbarBrand
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { loggedOut } from "../../actions";
import { useDispatch } from "react-redux";


function PrimarySearchAppBar(props: any) {


    const dispatch = useDispatch();

    const logout = () => {
        localStorage.removeItem("Token");
        sessionStorage.removeItem("User");
        dispatch(loggedOut());
        props.history.push("/login");
    }

    return (
        <div className="fixed-top">
            <CNavbar className="header_navbar">
                <CContainer fluid>
                    <CRow>
                        <CCol xs={6} sm={6}>
                            <div className="right_wrapper">
                                <div className="navbar_main">
                                    <CIcon
                                        className="burger__menu"
                                        name="cil-menu"
                                        size={"xl"}
                                        onClick={() => {
                                            props.toggleSidebar();
                                        }}
                                    />
                                </div>
                                <div className="navbar_brand">
                                    <CNavbarBrand className="mx-2" href="#">
                                        Health Care
                                    </CNavbarBrand>
                                </div>
                            </div>
                        </CCol>

                        <CCol xs={6} sm={6} className="header__right">
                            <CIcon
                                className="customCursorPointer"
                                name="cil-account-logout"
                                data-coreui-toggle="tooltip"
                                title="logout"
                                size={"xl"}
                                onClick={logout}
                            />

                        </CCol>
                    </CRow>
                </CContainer>
            </CNavbar>
        </div>
    );
}
export default withRouter(PrimarySearchAppBar);
