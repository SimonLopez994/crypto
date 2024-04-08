import { useContext } from 'react';
import { UserContext } from '../../../context/user.context'
import './account-details.styles.scss';
import { signOutAccount } from '../../../utils/firebase/firebase.utils';
const AccountDetails = () => {
    const { currentUser } = useContext(UserContext)

    const displayName = currentUser ? currentUser.displayName : '';
    const email = currentUser ? currentUser.email : '';

    const handleSignOut = async () => {
        await signOutAccount()
        window.location.reload();
    }

    return (
        <div className='account__container'>
            <h1 className='account__h1'>Account Details:</h1>
            <div className='account__name'>Name:{displayName}</div>
            <div className='account__email'>E-mail:{email}</div>
            <button onClick={handleSignOut} className='account__btn'>Sign Out</button>
        </div>

    )
}
export default AccountDetails;