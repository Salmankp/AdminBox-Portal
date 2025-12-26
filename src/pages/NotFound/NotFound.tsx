import './NotFound.scss';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const NotFound = () => {

    return (
        <section className="bg">
            <div className="mainbox">
                <div className="err">4</div>
                <FontAwesomeIcon className="far" spin icon={faCircleQuestion} />
                <div className="err2">4</div>
                <div className="msg">Maybe this page moved? Got deleted?<p>Let's go <a href="/login">home</a> and try from there.</p></div>
            </div>
        </section>)
}

export default NotFound;