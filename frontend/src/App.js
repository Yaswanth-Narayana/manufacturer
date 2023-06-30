import { useState } from 'react'
import RegisterationPage from './components/register'
import LoginPage from './components/login'
import {Route,Routes} from 'react-router-dom';
import Home from './components/home';

export default function App() {
    const [acc,setacc] = useState(0)
    return <div>
            <Routes>
                <Route path='/' element={<div><button onClick={(e)=>setacc(1^acc)}>
                                                    Aleready Have Acc?
                                                </button>
                                        {(acc===0)?  <RegisterationPage/> : <LoginPage/>}</div>} />
                <Route path='dashboard/manufacturer' element={<Home type='Manufacturer' />}/>
                <Route path='dashboard/transporter' element={<Home type='transporter' />}/>
            </Routes> 
    </div>
}