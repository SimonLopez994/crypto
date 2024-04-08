import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './routes/form/sign-in/sign-in.component';
import SignUp from './routes/form/sign-up/sign-up.component';
import Crypto from './routes/crypto/crypto.component'
import Login from './routes/form/login/login.component';
import AccountDetails from './routes/form/account-details/account-details.component';

const App = () => {


  return (
    <div className='app__container'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/crypto' element={<Crypto />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='sign-in' element={<SignIn/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
          <Route path='account-details' element={<AccountDetails/>}/>
        </Route>
      </Routes>
    </div>
  )
}
export default App;