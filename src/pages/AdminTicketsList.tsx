import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PenLine } from "lucide-react";

import { api } from "../services/api";

import { STATUS } from "../utils/status";

interface Ticket {
    id: string;
    updatedAt: string;
    title: string;
    category: string;
    services: {
        service: {
            title: string;
            price: number;
        };
        price: number;
    }[];
    technician: {
        name: string;
    } | null;
    customer: {
        name: string;
    };
    status: "Open" | "InProgress" | "Closed";
}

// const statusLabels: Record<Ticket["status"], string> = {
//     Open: "Aberto",
//     InProgress: "Em atendimento",
//     Closed: "Encerrado",
// };

// const statusColors: Record<string, string> = {
//     Aberto: "bg-rose-100 text-rose-600",
//     "Em atendimento": "bg-blue-100 text-blue-600",
//     Encerrado: "bg-green-100 text-green-600",
// };

export function AdminTicketList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get("/tickets");
                setTickets(response.data);
            } catch (error) {
                console.error("Erro ao buscar chamados", error);
            }
        }

        fetchTickets();
    }, []);

    return (
        <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl" >
            <h1 className="text-blue-dark font-semibold text-xl mb-8">Chamados</h1>

            <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2">
                <thead>
                    <tr className="text-left text-sm text-gray-400 border-b">
                        <th className="px-4 py-3 ">Atualizado em</th>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Título</th>
                        <th className="px-4 py-3">Valor total</th>
                        <th className="px-4 py-3">Cliente</th>
                        <th className="px-4 py-3">Técnico</th>
                        <th className="px-4 py-3">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => {
                        const totalPrice = ticket.services.reduce((acc, s) => acc + s.price, 0);
                        const { label, icon: Icon, color } = STATUS[ticket.status];

                        return (
                            <tr key={ticket.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">{new Date(ticket.updatedAt).toLocaleString("pt-BR")}</td>
                                <td className="px-4 py-3">{ticket.id.slice(0, 5).padStart(5, "0")}</td>
                                <td className="px-4 py-3 font-bold text-gray-800">{ticket.title}</td>

                                <td className="px-4 py-3 font-bold">R$ {totalPrice.toFixed(2).replace(".", ",")}</td>
                                <td className="px-4 py-3 font-bold">{ticket.customer.name}</td>
                                <td className="px-4 py-3 font-bold">{ticket.technician?.name || "Sem técnico"}</td>
                                <td className="px-4 py-3">
                                    <span className={`flex flex-row items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
                                        <Icon size={16} />
                                        {label}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:text-gray-700 cursor-pointer"
                                        onClick={() => navigate(`/chamados/${ticket.id}`)}
                                    >
                                        <PenLine size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
