import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { AuthContextType } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: Array<number> }) => {
    // type AuthType = {
    //     email: string;
    //     name: string;
    //     roles: [number];
    //     token: string
    // }
    const { auth } = useAuth();
    const location = useLocation()

    // if (!auth.isLoggedIn) {
    //     return <Navigate to='/auth' replace />;
    // }


    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default ProtectedRoute;