import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Eye } from "lucide-react";

import { api } from "../services/api";

import { CATEGORIES } from "../utils/categories";
import { STATUS } from "../utils/status";

interface Ticket {
    id: string;
    updatedAt: string;
    category: string;
    title: string;
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
    status: "Open" | "InProgress" | "Closed";
}

// const statusLabels: Record<Ticket["status"], string> = {
//     Open: "Aberto",
//     InProgress: "Em atendimento",
//     Closed: "Encerrado",
// };

// const statusColors: Record<string, string> = {
//     "Aberto": "bg-rose-100 text-rose-600",
//     "Em atendimento": "bg-blue-100 text-blue-600",
//     "Encerrado": "bg-green-100 text-green-600",
// };

export function Customer() {
    const [tickets, setTickets] = useState<Ticket[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get("/tickets");
                console.log('Resposta da API:', response.data);
                setTickets(response.data);
            } catch (error) {
                console.error("Erro ao buscar chamados", error);
            }
        }

        fetchTickets();
    }, []);


    return (
        <div className="w-screen h-screen px-20 p-20 bg-gray-600 mt-4 rounded-tl-2xl">
            <div>
                <h1 className="text-blue-dark font-semibold text-xl mb-8">Meus chamados</h1>

                <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2">
                    <thead>
                        <tr className="text-left text-sm text-gray-400 border-b">
                            <th className="px-4 py-3">Atualizado em</th>
                            <th className="px-4 py-3">Id</th>
                            <th className="px-4 py-3">Título</th>
                            <th className="px-4 py-3">Serviço</th>
                            <th className="px-4 py-3">Valor total</th>
                            <th className="px-4 py-3">Técnico</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => {
                            const totalPrice = CATEGORIES[ticket.category as keyof typeof CATEGORIES]?.price || 0;
                            const { label, icon: Icon, color } = STATUS[ticket.status];

                            return (
                                <tr key={ticket.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-3">{new Date(ticket.updatedAt).toLocaleString("pt-BR")}</td>
                                    <td className="px-4 py-3 font-bold">{ticket.id.slice(0, 5)}</td>
                                    <td className="px-4 py-3 font-bold text-gray-800">{ticket.title}</td>
                                    <td className="px-4 py-3 capitalize font-bold">{ticket.category}</td>
                                    <td className="px-4 py-3 font-bold">R$ {totalPrice.toFixed(2)}</td>
                                    <td className="px-4 py-3 font-bold flex items-center gap-2">
                                        {ticket.technician?.name || "Sem técnico"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`flex flex-row items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
                                            <Icon size={16} />
                                            {label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:bg-gray-400 cursor-pointer"
                                            onClick={() => navigate(`/chamados/${ticket.id}`)}>

                                            <Eye size={16}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>

    );
}


