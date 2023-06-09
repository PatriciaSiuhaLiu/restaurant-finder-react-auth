import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: Array<string> }) => {
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