import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import './crypto.styles.scss'
import { UserContext } from "../../context/user.context";
import LoginPopup from "../../components/login-popup/login-popup.component";

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'

const Crypto = () => {
    const [data, setData] = useState(null);
    const { currentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL)
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa')
                }
                const jsonData = await response.json();
                setData(jsonData)
                console.log(jsonData);
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();
    }, [isLoggedIn])

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true)
                console.log(isLoggedIn)
            } else {
                setIsLoggedIn(false)
                console.log(isLoggedIn)
            }
        })

        return () => unsubscribe();
    }, [])

    return (

        <>
            {data ? (
                <div className={`crypto__container ${currentUser ? '' : 'blur'}`}>

                    <div className="crypto__header">
                        <div className="crypto__header--block">
                            <span></span>
                        </div>
                        <div className="crypto__header--block">
                            <span>crypto-coin</span>
                        </div>
                        <div className="crypto__header--block">
                            <span>current Price</span>
                        </div>
                        <div className="crypto__header--block">
                            <span>
                                price change every 24 hours</span>
                        </div>
                    </div>




                    {data && data.map((object, index) => (
                        <div className="crypto__container--object">

                            <img className="crypto__img" src={object.image} alt="" />

                            <h5 className="crypto__h5">{object.name}</h5>
                            <p className="crypto__p">${object.current_price}</p>

                            {object.price_change_percentage_24h < 0 ? (
                                <span className="red">
                                    <svg height='1.5rem' fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                    {object.price_change_percentage_24h}%
                                </span>
                            ) : (
                                <span className="green">
                                    <svg height='1.5rem' fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" /></svg>
                                    {object.price_change_percentage_24h}%
                                </span>
                            )}
                        </div>
                    ))}

                </div>
            ) : (
                <p>An error has occurred </p>
            )}

            {
                !currentUser && (
                    <LoginPopup />
                )

            }
        </>
    )
}

export default Crypto;
