import "./App.scss";
import "./CoreUiStyles/style.scss";
import RegisterApiKey from "./components/RegisterApiKey/RegisterApiKey";
import Login from "./components/Login/Login";
import Dashboard from "./components/Layout/Dashboard";
import Signup from "./components/Signup/client-signup";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ToasterComponent from "./utils/Toaster";
import { InjectAxiosInterceptors } from "./utils/SessionInterceptor";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound/NotFound";
import Constants from "./utils/Constants";

function App() {
  const loggedUser = useSelector((state: any) => state.authUser);
  const subDomain = window.location.href.split("//")[1].split(".")[0];
  const { REACT_APP_RECAPTCHA_KEY, NODE_ENV } = process.env ;

  return (
    <div className="App">
      <Router>
        <InjectAxiosInterceptors />

        {NODE_ENV === Constants.APP_ENV ? <>
          <Switch>
            {subDomain === "register" && (
              <Route path="/" exact>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY ? process.env.REACT_APP_RECAPTCHA_KEY : ""}>
                  <RegisterApiKey />
                </GoogleReCaptchaProvider>
              </Route>
            )}
            {subDomain === "admin" && (
              <>
                <Route path="/login">
                  {loggedUser.isAuthenticated ? (
                    <Redirect to="/api-keys" />
                  ) : (
                    <Login />
                  )}
                </Route>
                <Route path={["/api-keys"]}>
                  {loggedUser.isAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/client-admin/signup">
                  <Signup />
                </Route>
              </>
            )}
            <Route path="*"><NotFound /></Route>
          </Switch>
        </> : <>
          <Switch>
            <Route path="/" exact>
              <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY ? process.env.REACT_APP_RECAPTCHA_KEY : ""}>
                <RegisterApiKey />
              </GoogleReCaptchaProvider>
            </Route>

            <Route path="/login">
              {loggedUser.isAuthenticated ? (
                <Redirect to="/api-keys" />
              ) : (
                <Login />
              )}
            </Route>

            <Route path="/client-admin/signup">

              <Signup />
            </Route>

            <Route path={["/api-keys"]}>
              {loggedUser.isAuthenticated ? (
                <Dashboard />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="*"><NotFound /></Route>
          </Switch>
        </>

        }

      </Router>
      <div className="toaster_container">
        <ToasterComponent className="toast_component" />
      </div>
    </div>
  );
}

export default App;
