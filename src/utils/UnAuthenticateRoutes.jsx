import { Outlet, Navigate } from 'react-router'

const UnAuthenticateRoutes = () => {
    let auth = localStorage.getItem('token')
    
    return(
        !auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default UnAuthenticateRoutes