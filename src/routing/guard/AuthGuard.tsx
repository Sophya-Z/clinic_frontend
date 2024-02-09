import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/store";
import { AUTH_ROUTE_PATH } from "../layouts/constants";
import { useAuthControllerSignInMutation } from "../../redux/doctorApi";
import { useMemo } from "react";

interface AuthGuardProps {
    children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    //const isAuthorized = useAppSelector(viewerSelectors.selectIsAuth);

    const [signIn, result ] = useAuthControllerSignInMutation({fixedCacheKey: 'shared-update-post'})

    // const isAuth = useAppSelector(viewerSelectors.selectIsAuth);
    const isAuth = useMemo(() => result.data != null, [result.data]);

    return (
        isAuth
            ? children
            : <Navigate to={AUTH_ROUTE_PATH} replace />
    )
}

export default AuthGuard;