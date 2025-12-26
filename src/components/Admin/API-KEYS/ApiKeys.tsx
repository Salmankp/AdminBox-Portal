
import "./ApiKeys.scss";
import { withRouter } from 'react-router-dom';
import ApiKeysTable from "./ApiKeysTable";

function ApiKeys(props: any) {


    return (
        <div>

            <ApiKeysTable />

        </div>
    );
}

export default withRouter(ApiKeys);
