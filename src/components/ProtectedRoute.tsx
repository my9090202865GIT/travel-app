import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import LoginModal from "../pages/Login";

const ProtectedRoute: FC = () => {
    const isLoggedin = useAppSelector((state) => state.AuthReducer.isLoggedIn);
    return isLoggedin ? <Outlet /> : <LoginModal />;
};

export default ProtectedRoute;
