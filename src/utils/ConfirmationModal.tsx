import CIcon from "@coreui/icons-react";
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react";
import ClipboardCopyComponent from './ClipboardCopy';
function ConfirmationModalComponent(props: any) {

    const { title, body, visible, setVisible, apiKeyType, update } = props;
    const bodyText = (str: string) => {
        var html = str;
        var div = document.createElement("div");
        div.innerHTML = html;
        return div.innerText;
    }
    return (
        <>
            <CModal visible={visible} onClose={setVisible} size="lg">
                <CModalHeader onClick={setVisible}>
                    <CModalTitle>{title}</CModalTitle>
                </CModalHeader>
               
                <CModalBody className="modal-body">{bodyText(body)}
               
                {apiKeyType ? <ClipboardCopyComponent copyText={apiKeyType} /> : null}

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={setVisible}>
                        Close
                    </CButton>

                    {update ? <CButton color="primary" onClick={update}>
                        Update
                    </CButton> : null}

                </CModalFooter>
            </CModal>
        </>
    );
}

export default ConfirmationModalComponent;
