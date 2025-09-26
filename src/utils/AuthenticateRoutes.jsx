import { Outlet, Navigate } from 'react-router'

const AuthenticateRoutes = () => {
    let auth = localStorage.getItem('token')
    
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthenticateRoutes