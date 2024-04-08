import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import './navigation.styles.scss';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const textStripes = document.querySelectorAll(".text-stripe");


        textStripes.forEach((stripe, index) => {
            const duration = 1;


            gsap.to(stripe, {
                x: "100%", // Mover la tira de texto hacia la derecha
                duration: 4, // Duración de la animación
                repeat: -1, // Repetir la animación infinitamente
                ease: "none", // Utilizar una interpolación lineal
                onStart: () => {
                    gsap.set(stripe, { x: "-100%" }); // Establecer la posición inicial de la tira de texto fuera de la vista a la izquierda
                }


            });
        });
    }, []);

    return (
        <div className="navigation__container">
            <header className="header__container">
                <nav className="nav__container">
                    <Link className="nav__link" to={"/"}>Home</Link>
                    <Link className="nav__link" to={"/crypto"}>Cryptos</Link>

                    {currentUser ?
                        <div className="nav__account">
                            <Link className="nav__link" to={"/account-details"}>Account <svg className="nav__svg" xmlns="http://www.w3.org/2000/svg" height="1.5rem" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg></Link>
                           
                        </div>


                        :
                        <Link className="nav__link" to={"/log-in"}>Log-in</Link>
                    }


                </nav>
            </header>
            <div className='stripe__container'>
                <div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div><div className='text-stripe'>Crypto Currency</div>
            </div>
            <div>
                <Outlet />
            </div>

        </div>


    )
}
export default Navigation;