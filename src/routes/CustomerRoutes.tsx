import { Routes, Route } from 'react-router'

import { AppLayout } from '../components/AppLayout'

import { Customer } from "../pages/Customer";
import { CreateTicket } from "../pages/CreateTicket";
import { NotFound } from "../pages/NotFound";
import { TicketDetails } from '../pages/TicketDetails';

export function CustomerRoutes() {

    return (
        <Routes>

            <Route path="/" element={<AppLayout />}>
                <Route index element={<Customer />} />
                <Route path="chamados" element={<Customer />} />
                <Route path="chamados/:id" element={<TicketDetails />} />
                <Route path="chamados/novo" element={<CreateTicket />} />
            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}