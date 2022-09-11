import React ,{Fragment} from 'react'
import { Routes,Route,Navigate } from 'react-router-dom';
import './App.less';
import Login from './containers/Login/Login';
import Admin from './containers/Admin/Admin';


export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/" element={<Navigate to="/admin/home"/>}/>
      </Routes>
    </Fragment>
  )
}
