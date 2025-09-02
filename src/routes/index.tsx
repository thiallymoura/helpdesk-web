import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";

import { CustomerRoutes } from "./CustomerRoutes";
import { TechnicianRoutes } from "./TechnicianRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { Loading } from "../components/Loading";

export function Routes() {

    const { session, isLoading } = useAuth()
    // console.log(session)

    function Route() {

        switch (session?.user.role) {
            case "customer":
                return <CustomerRoutes />
            case "technician":
                return <TechnicianRoutes />
            case "admin":
                return <AdminRoutes />
            default:
                return <AuthRoutes />
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Route />
        </BrowserRouter>
    );
}