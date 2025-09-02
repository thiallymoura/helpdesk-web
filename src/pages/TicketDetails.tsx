import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import { ArrowLeft, Plus, Trash, CircleCheckBig, Clock2 } from "lucide-react";


import { useAuth } from "../hooks/useAuth"
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { STATUS } from "../utils/status";


interface TicketDetail {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    status: "Open" | "InProgress" | "Closed";
    customer: { name: string };
    technician: { name: string; email: string };
    services: {
        service: {
            id: string;
            title: string
        };
        price: number;
    }[];
}


export function TicketDetails() {
    const { id } = useParams();
    const [ticket, setTicket] = useState<TicketDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [availableServices, setAvailableServices] = useState<
        { id: string; title: string; price: number }[]
    >([]);


    const [services, setServices] = useState<
        { service: { id: string; title: string }; price: number }[]
    >([]);

    const [selectedServiceId, setSelectedServiceId] = useState("");
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    const { session } = useAuth();
    const userRole = session?.user?.role;

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTicket() {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar o chamado");
            } finally {
                setLoading(false);
            }
        }

        fetchTicket();
    }, [id]);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await api.get("/services");
                setAvailableServices(response.data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        }

        fetchServices();
    }, []);

    // Atualiza os serviços quando o ticket for carregado/atualizado
    useEffect(() => {
        if (ticket) {
            setServices(ticket.services);
        }
    }, [ticket]);

    function openModal() {
        setShowAddServiceModal(true);
    }

    function closeModal() {
        setShowAddServiceModal(false);
    }

    function handleGoBack() {
        navigate(-1);
    }

    async function updateTicketStatus(newStatus: "Open" | "InProgress" | "Closed") {
        try {
            await api.patch(`/tickets/${id}/status`, { status: newStatus });

            const updated = await api.get(`/tickets/${id}`);

            setTicket(updated.data);
        } catch (error) {
            console.error("Erro ao atualizar status:", error);

            alert("Erro ao atualizar o status do chamado. Tente novamente.");
        }
    }

    async function deleteService(serviceId: string) {
        if (!confirm("Tem certeza que deseja remover este serviço?")) return;

        try {
            await api.delete(`/tickets/${id}/services/${serviceId}`);

            const updated = await api.get(`/tickets/${id}`);
            setTicket(updated.data);
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
            alert("Erro ao remover o serviço adicional. Tente novamente.");
        }
    }


    async function saveService() {
        const selected = availableServices.find((s) => s.id === selectedServiceId);
        if (!selected) {
            alert("Selecione um serviço válido.");
            return;
        }

        try {
            // Envia o ID do serviço para a rota do backend
            await api.post(`/tickets/${id}/services`, {
                serviceId: selected.id,
            });

            // Após adicionar o serviço, atualiza o chamado com os novos dados
            const updated = await api.get(`/tickets/${id}`);
            setTicket(updated.data);

            // Fecha o modal
            closeModal();
        } catch (error) {
            console.error("Erro ao salvar serviço:", error);
            alert("Erro ao salvar o serviço adicional. Verifique se está tudo certo e tente novamente.");
        }
    }

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!ticket) return <p>Chamado não encontrado</p>;


    const { label, icon: Icon, color } = STATUS[ticket.status];

    return (
        <div className="h-screen px-30 py-20 bg-gray-600 mt-4 rounded-tl-2xl">

            <div className="flex-1 flex flex-col gap-5">

                <div className="flex justify-between items-center w-[920px]">
                    <div>
                        <button
                            onClick={handleGoBack}
                            className="flex items-center gap-2 text-gray-300 mb-2 cursor-pointer"
                        >
                            <ArrowLeft size={16} />
                            Voltar
                        </button>

                        <h1 className="text-blue-dark font-semibold text-xl mb-3">Chamado detalhado</h1>
                    </div>

                    {userRole === "technician" && (
                        <div className="flex gap-4">
                            <button
                                onClick={() => updateTicketStatus("Closed")}
                                disabled={ticket.status !== "InProgress"}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold ${ticket.status !== "InProgress"
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-500 text-gray-200 hover:bg-gray-400 cursor-pointer"
                                    }`}
                            >
                                <CircleCheckBig size={16} />
                                Encerrar
                            </button>

                            <button
                                onClick={() => updateTicketStatus("InProgress")}
                                disabled={ticket.status !== "Open"}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold ${ticket.status !== "Open"
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-800 cursor-pointer"
                                    }`}
                            >
                                <Clock2 size={16} />
                                Iniciar atendimento
                            </button>
                        </div>
                    )}

                </div>

                <div className="flex flex-row gap-6">

                    <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xl flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-300 font-semibold">
                                {ticket.id.slice(0, 5).padStart(5, "0")}
                            </span>
                            <span className={`flex flex-row items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${color}`}>
                                <Icon size={16} />
                                {label}
                            </span>
                        </div>

                        <h2 className="text-md font-bold text-gray-100">{ticket.title}</h2>

                        <div>
                            <p className="text-xs text-gray-400 font-medium">Descrição</p>
                            <p className="text-sm text-gray-200 font-medium">{ticket.description}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400 font-medium">Categoria</p>
                            <p className="text-sm text-gray-200 font-medium">{ticket.category}</p>
                        </div>

                        <div className="flex flex-row gap-18">
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Criado em</p>
                                <p className="text-xs text-gray-200 font-semibold">
                                    {new Date(ticket.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Atualizado em </p>
                                <p className="text-xs text-gray-200 font-semibold">
                                    {new Date(ticket.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {(userRole === "technician" || userRole === "admin") && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-400 font-medium">Cliente</p>
                                <div className="flex text-sm items-center gap-2 mt-1">
                                    <p>{ticket.customer.name}</p>
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xs flex flex-col gap-4">
                        <div className="text-gray-400 font-semibold text-xs mb-2">Técnico responsável</div>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="bg-gray-500 text-xs rounded-full w-11 h-11 flex items-center justify-center font-bold">

                            </div>
                            <div>
                                <p className="text-gray-200 text-sm">{ticket.technician.name}</p>
                                <p className="text-gray-300 text-xs">{ticket.technician.email}</p>
                            </div>
                        </div>

                        <div className="text-gray-400 font-semibold text-xs">Valores</div>

                        <div className="flex justify-between text-xs text-gray-200">
                            <span>Preço base</span>
                            <span>R$ {ticket.services[0].price.toFixed(2).replace('.', ',')}  </span>
                        </div>

                        <div className="text-xs text-gray-200 mb-2">

                            <span className="block font-semibold text-gray-400 mb-2">Adicionais</span>

                            {userRole === "technician" ? (
                                <div>
                                    <div className="flex justify-between" >
                                        <span>Total</span>
                                        <span>
                                            R$ {services
                                                .slice(1)
                                                .reduce((acc, s) => acc + s.price, 0)
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                services.slice(1).map((s, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="mb-1">{s.service.title}</span>
                                        <span>R$ {s.price.toFixed(2).replace(".", ",")}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-gray-500" />

                        <div className="flex justify-between font-bold text-gray-900">
                            <span>Total</span>
                            <span>
                                R$ {services
                                    .reduce((acc, s) => acc + s.price, 0)
                                    .toFixed(2)
                                    .replace(".", ",")}
                            </span>
                        </div>
                    </div>
                </div>


                {userRole === "technician" && (
                    <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xl flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs text-gray-400 font-semibold">Serviços adicionais</h3>
                            <button onClick={openModal} className="p-1.5 text-white bg-black rounded cursor-pointer">
                                <Plus size={16} />
                            </button>
                        </div>

                        {services.map((srv, index) => (
                            <div key={index} className="flex justify-between items-center text-gray-200 text-sm">
                                <span>{srv.service.title}</span>
                                <div className="flex items-center gap-2">
                                    <span>R$ {srv.price.toFixed(2).replace(".", ",")}</span>
                                    <button
                                        onClick={() => deleteService(srv.service.id)}
                                        className="p-1.5 rounded bg-gray-500"
                                    >
                                        < Trash size={16} className="text-red-500 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {showAddServiceModal && (
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                                <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
                                    <div className="flex justify-between items-center mb-5 border-b border-gray-500">
                                        <h2 className="text-md text-gray-200 font-bold mb-5">Serviço adicional</h2>
                                        <button
                                            onClick={closeModal}
                                            className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-5 mb-4">
                                        <Select
                                            required
                                            legend="Serviço"
                                            value={selectedServiceId}
                                            onChange={(e) => setSelectedServiceId(e.target.value)}
                                        >
                                            <option value="" disabled hidden>Selecione um serviço</option>
                                            {availableServices.map((service) => (
                                                <option key={service.id} value={service.id}>
                                                    {service.title}
                                                </option>
                                            ))}
                                        </Select>

                                        <Input
                                            legend="Valor"
                                            placeholder="R$ 0,00"
                                            value={
                                                selectedServiceId
                                                    ? `R$ ${availableServices.find((s) => s.id === selectedServiceId)?.price
                                                        .toFixed(2)
                                                        .replace(".", ",")
                                                    }`
                                                    : ""
                                            }
                                            readOnly
                                        />

                                        <Button onClick={saveService}>Salvar</Button>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}





// import { useParams, useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import { api } from "../services/api";

// import { ArrowLeft, Plus, CircleHelp } from "lucide-react";
// import { AddAdditionalServiceModal } from "../components/AddAdditionalServiceModal";

// import { useAuth } from "../hooks/useAuth"

// interface TicketDetail {
//     id: string;
//     title: string;
//     description: string;
//     category: string;
//     createdAt: string;
//     updatedAt: string;
//     status: "Open" | "InProgress" | "Closed";
//     customer: { name: string };
//     technician: { name: string; email: string };
//     services: {
//         service: { title: string };
//         price: number;
//     }[];
// }

// const statusLabels = {
//     Open: "Aberto",
//     InProgress: "Em atendimento",
//     Closed: "Encerrado",
// };

// const statusColors = {
//     Open: "bg-rose-100 text-feedback-open",
//     InProgress: "bg-blue-100 text-blue-600",
//     Closed: "bg-green-100 text-green-600",
// };

// export function TicketDetails() {
//     const { id } = useParams();
//     const [ticket, setTicket] = useState<TicketDetail | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const [services, setServices] = useState<
//         { service: { title: string }; price: number }[]
//     >([]);

//     const [showAddServiceModal, setShowAddServiceModal] = useState(false);
//     const [newServiceDescription, setNewServiceDescription] = useState("");
//     const [newServicePrice, setNewServicePrice] = useState("");

//     const { session } = useAuth(); // obtenha os dados da sessão atual
//     const userRole = session?.user?.role;

//     const navigate = useNavigate();

//     useEffect(() => {
//         async function fetchTicket() {
//             try {
//                 const response = await api.get(`/tickets/${id}`);
//                 setTicket(response.data);
//             } catch (err) {
//                 console.error(err);
//                 setError("Erro ao carregar o chamado");
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchTicket();
//     }, [id]);

//     // Atualiza os serviços quando o ticket for carregado/atualizado
//     useEffect(() => {
//         if (ticket) {
//             setServices(ticket.services);
//         }
//     }, [ticket]);

//     function openModal() {
//         setShowAddServiceModal(true);
//     }

//     function closeModal() {
//         setShowAddServiceModal(false);
//         setNewServiceDescription("");
//         setNewServicePrice("");
//     }

//     function handleGoBack() {
//         navigate(-1);
//     }


//     function saveService() {
//         if (!newServiceDescription.trim() || !newServicePrice.trim()) return;

//         const priceNumber = Number(newServicePrice);
//         if (isNaN(priceNumber) || priceNumber <= 0) return alert("Informe um preço válido");

//         const newService = {
//             service: { title: newServiceDescription.trim() },
//             price: priceNumber,
//         };

//         setServices((prev) => [...prev, newService]);
//         closeModal();
//     }

//     if (loading) return <p>Carregando...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (!ticket) return <p>Chamado não encontrado</p>;

//     return (
//         <div className="h-screen px-30 py-20 bg-gray-600 mt-4 rounded-tl-2xl">

//             <div className="flex-1 flex flex-col gap-6">

//                 <header>
//                     <button
//                         onClick={handleGoBack}
//                         className="flex justify-center items-center gap-2 text-sm mb-2 text-gray-300 cursor-pointer"
//                     >
//                         <ArrowLeft size={16} />
//                         Voltar
//                     </button>

//                     <h1 className="text-blue-dark font-semibold text-xl mb-2">Chamado detalhado</h1>
//                 </header>

//                 <div className="flex flex-row gap-6">

//                     <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xl flex flex-col gap-4">
//                         <div className="flex justify-between items-center">
//                             <span className="text-xs text-gray-300 font-semibold">
//                                 {ticket.id.slice(0, 5).padStart(5, "0")}
//                             </span>
//                             <span
//                                 className={`flex flex-row gap-1 items-center text-xs px-3 py-1 rounded-full font-semibold ${statusColors[ticket.status]}`}
//                             >
//                                 <CircleHelp size={16} />
//                                 {statusLabels[ticket.status]}
//                             </span>
//                         </div>

//                         <h2 className="text-md font-bold text-gray-100">{ticket.title}</h2>

//                         <div>
//                             <p className="text-xs text-gray-400 font-medium">Descrição</p>
//                             <p className="text-sm text-gray-200 font-medium">{ticket.description}</p>
//                         </div>

//                         <div>
//                             <p className="text-xs text-gray-400 font-medium">Categoria</p>
//                             <p className="text-sm text-gray-200 font-medium">{ticket.category}</p>
//                         </div>

//                         <div className="flex flex-row gap-18">
//                             <div>
//                                 <p className="text-xs text-gray-400 font-medium">Criado em</p>
//                                 <p className="text-xs text-gray-200 font-semibold">
//                                     {new Date(ticket.createdAt).toLocaleString()}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-xs text-gray-400 font-medium">Atualizado em </p>
//                                 <p className="text-xs text-gray-200 font-semibold">
//                                     {new Date(ticket.updatedAt).toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>

//                         {(userRole === "technician" || userRole === "admin") && (
//                             <div className="mt-4">
//                                 <p className="text-xs text-gray-400 font-medium">Cliente</p>
//                                 <div className="flex text-sm items-center gap-2 mt-1">
//                                     <p>{ticket.customer.name}</p>
//                                 </div>
//                             </div>
//                         )}

//                     </div>

//                     <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xs flex flex-col gap-4">
//                         <div className="text-gray-400 font-semibold text-xs mb-2">Técnico responsável</div>

//                         <div className="flex items-center gap-3 mb-5">
//                             <div className="bg-gray-500 text-xs rounded-full w-11 h-11 flex items-center justify-center font-bold">

//                             </div>
//                             <div>
//                                 <p className="text-gray-200 text-sm">{ticket.technician.name}</p>
//                                 <p className="text-gray-300 text-xs">{ticket.technician.email}</p>
//                             </div>
//                         </div>

//                         <div className="text-gray-400 font-semibold text-xs mb-2">Valores</div>
//                         <div className="flex justify-between text-xs text-gray-200">
//                             <span>Preço base</span>
//                             <span>R$ {ticket.services[0].price.toFixed(2).replace('.', ',')}  </span>
//                         </div>
//                         <div className="flex justify-between text-xs text-gray-200 mb-2">
//                             <span>Adicionais</span>
//                             <span>R$ </span>
//                         </div>

//                         <div className="border-t border-gray-500 my-2" />

//                         <div className="flex justify-between font-bold text-gray-900">
//                             <span>Total</span>
//                             <span>R$ </span>
//                         </div>
//                     </div>
//                 </div>


//                 {userRole === "technician" && (
//                     <div className="p-6 rounded-xl border border-gray-500 w-full max-w-xl flex flex-col gap-4">
//                         <div className="flex justify-between items-center">
//                             <h3 className="text-xs text-gray-400 font-semibold">Serviços adicionais</h3>
//                             <button onClick={openModal} className="p-1 text-white bg-black rounded cursor-pointer">
//                                 <Plus size={16} />
//                             </button>
//                         </div>

//                         <div className="flex flex-col gap-2 max-h-48 overflow-auto mt-2">
//                             {services.map((srv, index) => (
//                                 <div key={index} className="flex justify-between text-gray-200 text-sm">
//                                     <span>{srv.service.title}</span>
//                                     <span>R$ {srv.price.toFixed(2).replace(".", ",")}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         {showAddServiceModal && (
//                             <AddAdditionalServiceModal
//                                 description={newServiceDescription}
//                                 price={newServicePrice}
//                                 onClose={closeModal}
//                                 onChangeDescription={setNewServiceDescription}
//                                 onChangePrice={setNewServicePrice}
//                                 onSave={saveService}
//                             />
//                         )}
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }

