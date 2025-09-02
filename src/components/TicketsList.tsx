import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TicketCard } from "./TicketCard";

interface Ticket {
    id: string;
    title: string;
    services: {
        service: { title: string };
        price: number;
    }[];
    customer: { name: string };
    status: "Open" | "InProgress" | "Closed";
    updatedAt: string;
}

export function TicketsList() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get("/tickets");
                setTickets(response.data);
            } catch (err) {
                setError("Erro ao carregar chamados");
            } finally {
                setLoading(false);
            }
        }
        fetchTickets();
    }, []);

    async function updateTicketStatus(id: string, newStatus: "Open" | "InProgress" | "Closed") {
        try {
            await api.patch(`/tickets/${id}/status`, { status: newStatus });
            // Atualiza o estado local refazendo o fetch dos tickets para refletir a mudança
            const response = await api.get("/tickets");
            setTickets(response.data);
        } catch (err) {
            alert("Erro ao atualizar status do chamado");
        }
    }

    if (loading) return <p>Carregando chamados...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="flex flex-col gap-4">
            {tickets.map((ticket) => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onUpdateStatus={updateTicketStatus}
                />
            ))}
        </div>
    );
}
