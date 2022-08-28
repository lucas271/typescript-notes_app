import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'




const RoutesComponent: React.FC = () => {

    return <>
        <Router>
            <AnimatedRoutes/>
        </Router>
    </>
}

export default RoutesComponent