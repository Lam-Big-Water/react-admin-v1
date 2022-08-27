import React ,{Fragment} from 'react'
import { Routes,Route } from 'react-router-dom';
import './App.less';
import Login from './containers/Login/Login';


export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Fragment>
  )
}
