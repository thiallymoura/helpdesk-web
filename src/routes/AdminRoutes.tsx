import { Route, Routes } from "react-router";

import { AppLayout } from "../components/AppLayout";

import { AdminTicketList } from "../pages/AdminTicketsList";
import { AdminTechniciansList } from "../pages/AdminTechniciansList";
import { AdminCustomersList } from "../pages/AdminCustomersList";
import { AdminServices } from "../pages/AdminServices";

import { NotFound } from "../pages/NotFound";
import { TicketDetails } from "../pages/TicketDetails";
import { AdminTechnicianCreate } from "../pages/AdminTechnicianCreate";
import { AdminTechnicianEdit } from "../pages/AdminTechnicianEdit";
// import { AdminServiceEdit } from "../pages/AdminServiceEdit";

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>

                <Route index element={< AdminTicketList />} />
                <Route path="/chamados" element={< AdminTicketList />} />
                <Route path="chamados/:id" element={<TicketDetails />} />
                <Route path="/tecnicos" element={<AdminTechniciansList />} />
                <Route path="/tecnicos/novo" element={<AdminTechnicianCreate />} />
                <Route path="/tecnicos/:id" element={<AdminTechnicianEdit />} />
                <Route path="/clientes" element={<AdminCustomersList />} />
                <Route path="/servicos" element={<AdminServices />} />
                <Route path="/servicos/:id" element={<AdminServices />} />

            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}