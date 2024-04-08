import { useEffect } from 'react';
import gsap from 'gsap';
import './home.styles.scss';
import { Link } from 'react-router-dom';
import Bitcoin from '../../images/bitcoin.png'


const Home = () => {

    useEffect(() => {
      gsap.to(".home__h1", {
       x:0,
       opacity:1,
       duration:0.5,
       scrub:true
      })
        
    }, [])



    return (
        <div className='home__container'>

            <div className='home__content'>


                <h2 className='home__h1'>Crypto currency</h2>
                <div className='home__btn--container'>
                    <Link to={"/log-in"} className='home__btn'>Get Started</Link>
                    <Link to={"/crypto"} className='home__btn'>Crypto currency</Link>
                </div>
            </div>
            <div className='home__container--img'>
                <img className='home__img' src={Bitcoin} alt="" />
            </div>


        </div>
    )
}
export default Home