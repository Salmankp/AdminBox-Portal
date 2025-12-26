import CIcon from "@coreui/icons-react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import './ApiKeysTable.scss';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import CreateApiKey from "../CreateApiKey/CreateApiKey";
import Constants from "../../../utils/Constants";
import { useSelector } from "react-redux";
import ConfirmationModalComponent from "../../../utils/ConfirmationModal";
import ClientTokenApi from "../../../api/ClientTokenApi";

function APIKeyTable() {

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [apiKeys, setApiKeys] = useState([]);
    const loggedUser = useSelector((state: any) => state.authUser);
    const [updateApiKey, setUpdateApiKey] = useState("");
    const [apiKeyData, setApiKeyData] = useState({
        companyName: '',
        apiKey: '',
    });
    const getApiKeysData = async () => {
        const res: any = await ClientTokenApi.getAll();
        if(res && res.data.statusCode === 200){
            let data: any;

                if (loggedUser.data.type === Constants.CLIENT_ADMIN_TYPE) {
                    data = res.data.data.filter((d: any) => d._id === loggedUser.data.clientId);
                }
                if (loggedUser.data.type === Constants.SUPER_ADMIN) {
                    data = res.data.data;
                }

                setApiKeys(data);
        }else {
            console.log(res?.response?.data.message);
        }
    }

    useEffect(() => {
        getApiKeysData();
    }, [])

    const handleViewApiKey = (task: any) => {
        setViewDialogOpen(true);
        setApiKeyData({
            companyName: task.companyName,
            apiKey: task.apiKey
        })
    };
    const handleUpdateApiKey = (apiKey: any) => {
        setUpdateApiKey(apiKey);
    };

    return (
        <div className="main_tasktable">
            {(loggedUser.isAuthenticated && loggedUser.data.type === Constants.SUPER_ADMIN) ? (
                <div className="wrapper_tasktable">
                    <div className="search_wrapper">
                    </div>
                    <div className="add_btn_wrapper">
                        <CreateApiKey
                            apiKeys={apiKeys}
                            updateApiKey={updateApiKey}
                            handleUpdateApiKey={handleUpdateApiKey}
                        />
                    </div>
                </div>
            ) : null}

            <CRow className="pateint-data">
                <CCol xs>
                    <CCard className="mb-4 patient_card">
                        <CCardHeader className="patient_heading">
                            API Keys
                        </CCardHeader>
                        <CCardBody className="patient_card_body">
                            <CTable hover responsive align="middle" className="mb-0 border">
                                <CTableHead>
                                    <CTableRow>

                                        <CTableHeaderCell>Company Name</CTableHeaderCell>
                                        <CTableHeaderCell>Company Email</CTableHeaderCell>
                                        <CTableHeaderCell>Contact Name</CTableHeaderCell>
                                        <CTableHeaderCell>Key Type</CTableHeaderCell>
                                        <CTableHeaderCell>Key Status</CTableHeaderCell>

                                        <CTableHeaderCell className="text-center">
                                            Action
                                        </CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {apiKeys?.map((apiKey: any, index: number) => (
                                        <CTableRow key={index}>

                                            <CTableDataCell onDoubleClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer" }}>
                                                <div> {apiKey?.companyName ? apiKey?.companyName : 'N/A'}</div>
                                            </CTableDataCell>
                                            <CTableDataCell onDoubleClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer" }}>{apiKey?.companyEmail}</CTableDataCell>
                                            <CTableDataCell onDoubleClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer" }}>{apiKey?.contactName}</CTableDataCell>
                                            <CTableDataCell onDoubleClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer" }}><b>{apiKey?.keyType ? (apiKey?.keyType).charAt(0).toUpperCase() + (apiKey?.keyType).slice(1) : 'N/A'}</b></CTableDataCell>
                                            <CTableDataCell onDoubleClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer" }}>
                                                {
                                                    apiKey?.keyStatus === Constants.INVALID
                                                        ? <span className="Default-danger custom-bold-text">
                                                            {apiKey?.keyStatus ? (apiKey?.keyStatus).toUpperCase() : 'N/A'}
                                                        </span>
                                                        : apiKey?.keyStatus === Constants.ACTIVE
                                                            ? <span className="Default-success custom-bold-text">
                                                                {apiKey?.keyStatus ? (apiKey?.keyStatus).toUpperCase() : 'N/A'}
                                                            </span>
                                                            : apiKey?.keyStatus === Constants.EXPIRED
                                                            && <span className="Default-warning custom-bold-text">
                                                                {apiKey?.keyStatus ? (apiKey?.keyStatus).toUpperCase() : 'N/A'}
                                                            </span>
                                                }
                                            </CTableDataCell>

                                            <CTableDataCell className="text-center">
                                                <FontAwesomeIcon icon={faEye} color="sky-blue" onClick={() => handleViewApiKey(apiKey)} style={{ cursor: "pointer", fontSize: "1.7rem" }} />
                                                {loggedUser.isAuthenticated && loggedUser.data.type === Constants.SUPER_ADMIN ? (

                                                    <CIcon
                                                        name="cil-pencil"
                                                        className="Default-warning"
                                                        data-coreui-toggle="tooltip"
                                                        title="edit"
                                                        size="2xl"
                                                        style={{ cursor: "pointer", marginLeft: "10px", marginRight: "10px" }}
                                                        onClick={() => handleUpdateApiKey(apiKey)}
                                                    />
                                                ) : null}



                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}

                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <ConfirmationModalComponent
                visible={viewDialogOpen}
                title='Registered API Key'
                body={apiKeyData.apiKey ? `<p> Here is the ${Constants.API_KEY}:</p>` : null}
                apiKeyType={apiKeyData.apiKey}
                setVisible={() => { setViewDialogOpen(false) }}
            />
            {/* <CModal visible={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>              
                <CModalHeader onClick={() => setViewDialogOpen(false)}>
                    <CModalTitle>{apiKeyData.companyName}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <p>Here is <b>{apiKeyData.companyName}</b> {Constants.API_KEY}:</p>
                    <ClipboardCopyComponent copyText={apiKeyData.apiKey} />
                   </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setViewDialogOpen(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal> */}
        </div>
    );
}

export default APIKeyTable;