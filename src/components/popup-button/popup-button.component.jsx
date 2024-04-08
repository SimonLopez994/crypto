import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";


const PopupButton = ({ children, className }) => {

const {setCurrentUser} = useContext(UserContext) 

    const getGooglePopup = async (e) => {
        e.preventDefault()
        try {
            const { user } = await signInWithGooglePopup()
            console.log(user);
            setCurrentUser(user)

        } catch (error) {
            console.log("Error al iniciar sesión con Google:", error.message)
        }

    }


    return (
        <button className={className} onClick={getGooglePopup}>{children}</button>
    )
}
export default PopupButton;