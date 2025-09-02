import { PenLine, Clock, CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { STATUS } from "../utils/status";

interface TicketCardProps {
    ticket: {
        id: string;
        title: string;
        services: {
            service: { title: string };
            price: number;
        }[];
        customer: { name: string };
        status: "Open" | "InProgress" | "Closed";
        updatedAt: string;
    };
    onUpdateStatus: (id: string, newStatus: "Open" | "InProgress" | "Closed") => Promise<void>;
    showStatusBadge?: boolean;
}

export function TicketCard({ ticket, onUpdateStatus, showStatusBadge = true }: TicketCardProps) {
    const totalPrice = ticket.services.reduce((acc, s) => acc + s.price, 0);
    const { label, icon: Icon, color } = STATUS[ticket.status];
    const formattedDate = format(new Date(ticket.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
        locale: ptBR,
    });

    const navigate = useNavigate();

    function handleDetails() {
        navigate(`/tickets/${ticket.id}`);
    }

    async function handleStart() {
        await onUpdateStatus(ticket.id, "InProgress");
    }

    async function handleClose() {
        await onUpdateStatus(ticket.id, "Closed");
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center" style={{ minHeight: 28 /* altura do badge */ }}>
                {showStatusBadge ? (
                    <div className={`flex flex-wrap items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
                        <Icon size={16} />
                        {label}
                    </div>
                ) : (
                    <span style={{ visibility: "hidden" }}>
                        {/* Placeholder para manter o espaço */}
                        <Icon size={16} />
                        {label}
                    </span>
                )}
            </div>

            <div className="p-4 rounded-xl border border-gray-500 max-w-sm flex flex-col gap-4">

                <div className="flex justify-between gap-2">
                    <div>
                        <span className="text-xs text-gray-300">{ticket.id.slice(0, 5).padStart(5, "0")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={handleDetails} className="p-1 text-gray-300 bg-gray-500 rounded cursor-pointer">
                            <PenLine size={16} />
                        </button>

                        {ticket.status === "Open" && (
                            <button
                                onClick={handleStart}
                                className="flex items-center gap-1 bg-gray-900 text-white text-xs px-4 py-1 rounded-lg hover:bg-gray-800 cursor-pointer"
                            >
                                <Clock size={14} />
                                Iniciar
                            </button>
                        )}

                        {ticket.status === "InProgress" && (
                            <button
                                onClick={handleClose}
                                className="flex items-center gap-1 px-4 py-1 text-xs rounded-lg font-bold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
                            >
                                <CircleCheckBig size={16} />
                                Encerrar
                            </button>
                        )}
                    </div>
                </div>

                <div className="text-sm">
                    <h2 className="text-md font-bold text-gray-100">{ticket.title}</h2>
                    <p className="text-gray-200 text-xs">{ticket.services.map((s) => s.service.title).join(", ")}</p>
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                    <span className="text-xs text-gray-200">{formattedDate}</span>
                    <span className="text-sm font-medium text-gray-200 text-right">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm w-full border-t pt-3 border-gray-500 text-gray-200">{ticket.customer.name}</span>
                </div>
            </div>
        </div>
    );
}

// import { PenLine, Clock, CircleCheckBig } from "lucide-react";

// import { useNavigate } from "react-router";

// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

// import { STATUS } from "../utils/status";

// interface TicketCardProps {
//     ticket: {
//         id: string;
//         title: string;
//         services: {
//             service: {
//                 title: string;
//             };
//             price: number;
//         }[];
//         customer: {
//             name: string;
//         };
//         status: "Open" | "InProgress" | "Closed";
//         updatedAt: string;
//     };
// }


// export function TicketCard({ ticket }: TicketCardProps) {

//     const totalPrice = ticket.services.reduce((acc, s) => acc + s.price, 0);
//     // const statusLabel = statusLabels[ticket.status];
//     const { label, icon: Icon, color } = STATUS[ticket.status];

//     const formattedDate = format(new Date(ticket.updatedAt), "dd/MM/yyyy 'às' HH:mm", {
//         locale: ptBR,
//     });

//     const navigate = useNavigate();

//     function handleDetails() {
//         navigate(`/tickets/${ticket.id}`);
//     }

//     function handleStart() {
//         // lógica de iniciar chamado
//     }

//     // function handleClose() {

//     // }

//     return (
//         <div className="flex flex-col gap-4">

//             <div className="flex justify-between items-center">
//                 <span className={`flex flex-row items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
//                     <Icon size={16} />
//                     {label}
//                 </span>
//             </div>

//             <div className="p-4 rounded-xl border border-gray-500 w-full max-w-sm flex flex-col gap-4">


//                 <div className="flex justify-between gap-2">
//                     <div>
//                         <span className="text-xs text-gray-300">{ticket.id.slice(0, 5).padStart(5, "0")}</span>
//                     </div>

//                     <div className="flex items-center gap-2">
//                         {/* Botão de editar (sempre visível) */}
//                         <button
//                             onClick={handleDetails}
//                             className="p-1 text-gray-300 bg-gray-500 rounded cursor-pointer">
//                             <PenLine size={16} />
//                         </button>

//                         {/* Botão de iniciar (somente se estiver "Open") */}
//                         {ticket.status === "Open" && (
//                             <button
//                                 onClick={handleStart}
//                                 className="flex items-center gap-1 bg-gray-900 text-white text-xs px-4 py-1 rounded-lg hover:bg-gray-800 cursor-pointer"
//                             >
//                                 <Clock size={14} />
//                                 Iniciar
//                             </button>
//                         )}

//                         {/* Botão de encerrar (somente se estiver "InProgress") */}
//                         {ticket.status === "InProgress" && (
//                             <button
//                                 // onClick={() => updateTicketStatus("Closed")}
//                                 disabled={ticket.status !== "InProgress"}
//                                 className="flex items-center gap-1 px-4 py-1 text-xs rounded-lg font-bold bg-gray-900 hover:bg-gray-800 text-white cursor-pointer"
//                             >
//                                 <CircleCheckBig size={16} />
//                                 Encerrar
//                             </button>
//                         )}

//                     </div>

//                 </div>

//                 <div className="text-sm">
//                     <h2 className="text-md font-bold text-gray-100">{ticket.title}</h2>
//                     <p className="text-gray-200 text-xs">{ticket.services.map(s => s.service.title).join(", ")}</p>
//                 </div>

//                 <div className="flex justify-between text-xs text-gray-600">
//                     <span className="text-xs text-gray-200">{formattedDate}</span>
//                     <span className="text-sm font-medium text-gray-200 text-right">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                     {/* <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold uppercase">
//                     {ticket.customer.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .slice(0, 2)
//                         .join("")}
//                 </div> */}
//                     <span className="text-sm w-full border-t pt-3 border-gray-500 text-gray-200">{ticket.customer.name}</span>
//                 </div>


//             </div>

//         </div>

//     );

// }
