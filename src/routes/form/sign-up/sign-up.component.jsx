import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserDocFromAuth, createUserFromAuthWithEmailAndPassword } from "../../../utils/firebase/firebase.utils";
import { UserContext } from "../../../context/user.context";
import '../sign.styles.scss';;
const defaultFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}



const SignUp = () => {

    const navigate = useNavigate();

    const [formField, setFormField] = useState(defaultFields);
    const { displayName, email, password, confirmPassword } = formField;
    const { currentUser, setCurrentUser } = useContext(UserContext)




    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return;
        }

        try {
            const { user } = await createUserFromAuthWithEmailAndPassword(email, password);
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
            }
        }




    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormField({ ...formField, [name]: value })
        console.log(formField)
    }

    return (
        <div className="sign-in__container">
            <h2 className="sign-in__h2">Create an Account</h2>
            <form  className="sign-in__form" onSubmit={handleSubmit}>
                <label className="sign-in__label">Display name</label>
                <input className="sign-in__input" required type="text" onChange={handleChange} name="displayName" value={displayName} />
                <label className="sign-in__label">Email</label>
                <input className="sign-in__input" required type="email" onChange={handleChange} name="email" value={email} />
                <label className="sign-in__label">Password</label>
                <input className="sign-in__input" required type="password" onChange={handleChange} name="password" value={password} />
                <label className="sign-in__label">confirm Password</label>
                <input className="sign-in__input" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <button className="sign-in__btn" type="submit">Sign Up</button>

            </form>
        </div>
    )
}
export default SignUp