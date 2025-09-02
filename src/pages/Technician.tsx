import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TicketCard } from "../components/TicketCard";

interface Ticket {
    id: string;
    title: string;
    services: {
        service: { title: string; price: number };
        price: number;
    }[];
    customer: { name: string };
    technician: { id: string; name: string };
    status: "Open" | "InProgress" | "Closed";
    updatedAt: string;
}

export function Technician() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const technicianId = localStorage.getItem("technicianId");

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get("/tickets");
                const allTickets: Ticket[] = response.data;

                // Aqui, se quiser filtrar só os do técnico:
                // const filtered = allTickets.filter((t) => t.technician?.id === technicianId);
                // setTickets(filtered);

                setTickets(allTickets);
            } catch (error) {
                console.error("Erro ao buscar chamados:", error);
            }
        }

        fetchTickets();
    }, [technicianId]);

    async function updateTicketStatus(id: string, newStatus: "Open" | "InProgress" | "Closed") {
        try {
            await api.patch(`/tickets/${id}/status`, { status: newStatus });
            const response = await api.get("/tickets");
            setTickets(response.data);
        } catch (error) {
            alert("Erro ao atualizar status do chamado");
        }
    }

    // Separar tickets por status
    const inProgressTickets = tickets.filter(t => t.status === "InProgress");
    const openTickets = tickets.filter(t => t.status === "Open");
    const closedTickets = tickets.filter(t => t.status === "Closed");

    return (
        <div className="h-[1000px] px-20 py-12 bg-gray-600 mt-4 rounded-tl-2xl">
            <h1 className="text-blue-dark font-semibold text-xl mb-8">Meus chamados</h1>

            {/* Em Atendimento */}
            {inProgressTickets.length > 0 && (
                <>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                        {inProgressTickets.map((ticket, index) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onUpdateStatus={updateTicketStatus}
                                showStatusBadge={index === 0}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Abertos */}
            {openTickets.length > 0 && (
                <>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-8">
                        {openTickets.map((ticket, index) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onUpdateStatus={updateTicketStatus}
                                showStatusBadge={index === 0}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Encerrados */}
            {closedTickets.length > 0 && (
                <>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                        {closedTickets.map((ticket, index) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onUpdateStatus={updateTicketStatus}
                                showStatusBadge={index === 0}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
