import { Link } from "react-router-dom";
import './login-popup.styles.scss';
const LoginPopup = () => {
    return (
        <div className="popup__container">
            <div className="popup__content">
            <h2 className="popup__h2">Log in to see the crypto currency</h2>
            <Link to={"/log-in"} className="popup__link">Go to Sign in</Link>
            <Link to={"/sign-up"} className="popup__link">Create Account</Link>
            </div>
        </div>
    )
}
export default LoginPopup