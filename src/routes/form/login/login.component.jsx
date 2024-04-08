import SignIn from "../sign-in/sign-in.component";
import SignUp from "../sign-up/sign-up.component";
import { UserContext } from "../../../context/user.context";
import './login.styles.scss'
import { useContext } from "react";
import AccountDetails from "../account-details/account-details.component";

const Login = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <div className="login__container">
            {currentUser ? (
                <AccountDetails />
            ) : (
                <SignIn />
            )}
        </div>
    )
}
export default Login