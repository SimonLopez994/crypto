import PopupButton from "../../../components/popup-button/popup-button.component";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/user.context";
import '../sign.styles.scss'
import { signInUsingEmailAndPassword } from "../../../utils/firebase/firebase.utils";

const defaultValues = {
    email: "",
    password: ""
}



const SignIn = () => {
    const { setCurrentUser } = useContext(UserContext)
    const [formField, setFormField] = useState(defaultValues);
    const { email, password } = formField;

    const navigate = useNavigate()
    console.log(formField);

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInUsingEmailAndPassword(email, password);
            setCurrentUser(user);
            navigate("/")


            console.log(user)
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("this email is already in use");
                    break;
                case "auth/weak-password":
                    alert("Password should be at least 6 characters ");
                    break;
                default: alert("This account doesnt exist")
            }
        }




    }


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormField({ ...formField, [name]: value })

    }
    return (
        <div className="sign-in__container">
            <h2 className="sign-in__h2">Do you already have an account?</h2>
            <form className="sign-in__form" onSubmit={handleSubmit}>
                <label className="sign-in__label">Email</label>
                <input className="sign-in__input" required type="email" onChange={handleChange} name="email" value={email} />
                <label className="sign-in__label">Password</label>
                <input className="sign-in__input" required type="password" onChange={handleChange} name="password" value={password} />
                <button className="sign-in__btn">Sign In</button>
                <PopupButton className="sign-in__btn" children="Sign in With Google" />
                <Link className="sign-in__btn" to={'/sign-up'}>Create an Account<svg height="1rem" width="3rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg></Link>
            </form>
        </div>

    )

}
export default SignIn;