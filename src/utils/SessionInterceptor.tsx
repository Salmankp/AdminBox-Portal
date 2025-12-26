import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loggedOut, setToaster } from '../actions';
import Constants from "./Constants";

export const InjectAxiosInterceptors = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // Verifying token expiration
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('Token');
          sessionStorage.removeItem('User');
          dispatch(loggedOut());
          dispatch(setToaster({
            isOpen: true,
            type: 'error',
            msg: Constants.SESSION_TIMED_OUT
          }));
          history.push('/login');
          return Promise.reject(error); 
        } 
        
        return Promise.reject(error);
      }
    );
  },[]);

  return (
    <>
    </>
  );
};
