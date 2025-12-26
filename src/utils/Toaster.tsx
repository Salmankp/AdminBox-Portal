import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  CToast, CToastBody, CToastClose, CToastHeader 
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { unsetToaster } from "../actions";

function ToasterComponent(props: any) {
  const customToasterStyle = {
    successColor: "#198754",
    errorColor: "#dc3545",
  };

  const textWhite = {
    color: "white"
  };

  const dispatch = useDispatch();

  const toasterState = useSelector((state: any) => state.toaster);

  const customDelay = () => {
    setTimeout(() => {
      dispatch(unsetToaster());
    }, 3000);
    return 3000;
  };

  return (
    <>
      {toasterState.isOpen && (
        <CToast 
        className="toast-wrap"
        autohide={true} 
        visible={true} 
        delay={customDelay()}
        >
          <CToastHeader style={{background: toasterState.type === "error" ? customToasterStyle.errorColor : customToasterStyle.successColor, fontSize: '14px'}}>
              {toasterState.type === "error" ? (
                    <CIcon size="lg" name="cil-warning" style={textWhite}/>
              ) : (
                    <CIcon size="lg" name="cil-check-circle" style={textWhite}/>
              )}
             <strong className="me-auto" style={{paddingLeft: "10px", color: textWhite.color}}>
               {toasterState.type === "error" ? "Error" : "Success"}
             </strong>
              <CToastClose
                white
                onClick={() => {
                  dispatch(unsetToaster());
                }}
              />
          </CToastHeader>
          <CToastBody style={{color: toasterState.type === "error" ? customToasterStyle.errorColor : customToasterStyle.successColor, fontSize: '14px'}}>
            {toasterState.msg}
          </CToastBody>
        </CToast>
      )}
    </>
  );
}

export default ToasterComponent;
