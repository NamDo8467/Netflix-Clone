import React from 'react'
import Home from './Home/Home'
import './App.css'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import {BrowserRouter as Router, Route} from 'react-router-dom'
function App() {
    return (
        <Router>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp}/>
        </Router>
        
    )
}

export default App
