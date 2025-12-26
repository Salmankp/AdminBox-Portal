import { Link } from "react-router-dom";
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CNavLink,
  CAvatar,
  CNavGroup
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import "./Dashboard.scss";
import { useSelector } from "react-redux";
import Constants from "../../utils/Constants";

export default function LeftSideNav(props: any) {

  const getPath = window.location.pathname;
  const loggedUser = useSelector((state: any) => state.authUser);

  return (
    <div>
      <CSidebar
        className={props.showSidebar ? "activeOnMobile" : "activeOnDesktop"}
      >
        <CSidebarNav>
          <div className="d-flex align-items-center flex-column p-3 sidebar__avatar">
            <CAvatar className="mb-2" color="secondary" size="xl">
              {/* <CIcon name="cil-user" size="xl"></CIcon> */}
              <img
                src="/assets/avatars/user_avatar.png"
                alt="user avatar"
                style={{ width: "80%", borderRadius: "50em", paddingTop: "10%" }}
              />
            </CAvatar>
            <h5 style={{ color: "white", paddingTop: "5%" }}>
              {" "}
              {loggedUser.data.firstName} {" "} {loggedUser.data.lastName}
            </h5>
            {loggedUser.data.type === Constants.CLIENT_ADMIN_TYPE ? <h6 style={{ color: "lightgrey" }}>
              {" "}
              Key Owner
            </h6> : <h6 style={{ color: "lightgrey" }}>
              {" "}
              Admin
            </h6>}

          </div>
          <hr></hr>
          <CNavItem className="dashboard_text">
            <CNavLink href="#" component={Link} to="/api-keys" active={getPath === '/api-keys' ? true : false}>

              <CIcon
                className="customPointerStyle"
                name="cil-settings"
                size={"xl"}
              />
              {Constants.API_KEY}
            </CNavLink>

            <CNavGroup toggler="API Key Types">

              <CNavItem href="#">
                <CIcon
                  className="customPointerStyle"
                  name="cil-settings"
                  size={"xl"}
                />
                {(Constants.PRODUCTION)}
              </CNavItem>
              <CNavItem href="#">
                <CIcon
                  className="customPointerStyle"
                  name="cil-settings"
                  size={"xl"}
                />
                {(Constants.SANDBOX)}
              </CNavItem>
            </CNavGroup>


            {/* <CSidebar>

              <CSidebarNav>
                <CNavGroup toggler="Nav dropdown">
                  <CNavItem href="#">
                    <CIcon className="nav-icon" name="cil-settings" /> Nav dropdown item
                  </CNavItem>
                  <CNavItem href="#">
                    <CIcon className="nav-icon" name="cil-settings" /> Nav dropdown item
                  </CNavItem>
                </CNavGroup>
              </CSidebarNav>
              <CSidebarToggler />
            </CSidebar> */}
          </CNavItem>


        </CSidebarNav>
      </CSidebar>
    </div>
  );
}
