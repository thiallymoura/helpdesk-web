import { Route, Routes } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { Technician } from "../pages/Technician";
import { TicketDetails } from "../pages/TicketDetails";
import { NotFound } from "../pages/NotFound";

export function TechnicianRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>

                <Route index element={<Technician />} />
                <Route path="/chamados" element={<Technician />} />
                <Route path="/tickets/:id" element={<TicketDetails />} />

            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
