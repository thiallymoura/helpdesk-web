import { useEffect, useState } from "react";
import { PenLine, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { api } from "../services/api";
import { AdminServiceModal } from "../components/AdminServiceModal";

interface Service {
    id: string;
    title: string;
    price: number;
    active: boolean;
}

export function AdminServices() {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [services, setServices] = useState<Service[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const isEditing = Boolean(id);

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (id) {
            fetchServiceById(id);
        } else {
            clearForm();
        }
    }, [id]);

    async function fetchServices() {
        try {
            const response = await api.get("/services");
            setServices(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    }

    async function fetchServiceById(serviceId: string) {
        try {
            setLoading(true);
            const response = await api.get(`/services/${serviceId}`);
            const { title, price } = response.data;
            setTitle(title);
            setPrice(price.toFixed(2).replace(".", ","));
            setModalOpen(true);
        } catch (err) {
            console.error("Erro ao buscar serviço:", err);
        } finally {
            setLoading(false);
        }
    }

    function clearForm() {
        setTitle("");
        setPrice("");
        setModalOpen(false);
    }

    async function handleSaveService() {
        try {
            await api.post("/services", {
                title,
                price: parseFloat(price.replace(",", ".")),
            });

            fetchServices();
            clearForm();
        } catch (error) {
            console.error("Erro ao salvar serviço:", error);
        }
    }

    async function handleUpdateService() {
        try {
            await api.patch(`/services/${id}`, {
                title,
                price: parseFloat(price.replace(",", ".")),
            });

            fetchServices();
            clearForm();
            navigate("/servicos");
            alert("Serviço atualizado com sucesso!");
        } catch (err) {
            console.error("Erro ao atualizar serviço:", err);
            alert("Erro ao atualizar o serviço.");
        }
    }

    if (loading) return <div>Carregando...</div>;

    return (
        <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">
            <div className="flex justify-between items-center mb-8 w-[1200px]">
                <h1 className="text-blue-dark font-semibold text-xl">Serviços</h1>
                <button
                    onClick={() => {
                        clearForm();
                        setModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Novo
                </button>
            </div>

            <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2 table-fixed">
                <thead className="border-b border-gray-400">
                    <tr className="text-left text-sm text-gray-400">
                        <th className="px-4 py-3 w-1/2">Título</th>
                        <th className="px-4 py-3 w-1/4">Valor</th>
                        <th className="px-4 py-3 w-1/4">Status</th>
                        <th className="px-4 py-3 w-16 text-end"></th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr
                            key={service.id}
                            className="border-t border-gray-300 hover:bg-gray-50"
                        >
                            <td className="px-4 py-3 font-bold text-gray-800">
                                {service.title}
                            </td>
                            <td className="px-4 py-3 font-bold text-black">
                                R$ {service.price.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${service.active
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {service.active ? "Ativo" : "Inativo"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-end">
                                <button
                                    onClick={() => navigate(`/servicos/${service.id}`)}
                                    className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:text-gray-700 cursor-pointer"
                                >
                                    <PenLine size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <AdminServiceModal
                    title={title}
                    price={price}
                    onClose={() => {
                        clearForm();
                        if (isEditing) navigate("/servicos");
                    }}
                    onChangeTitle={setTitle}
                    onChangePrice={setPrice}
                    onSave={isEditing ? handleUpdateService : handleSaveService}
                />
            )}
        </div>
    );
}


// import { useEffect, useState } from "react";
// import { PenLine, Plus } from "lucide-react";
// import { useNavigate } from "react-router";
// import { api } from "../services/api";
// import { AdminServiceModal } from "../components/AdminServiceModal";

// interface Service {
//     id: string;
//     title: string;
//     price: number;
//     active: boolean;
// }

// export function AdminServicesList() {
//     const [services, setServices] = useState<Service[]>([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [title, setTitle] = useState("");
//     const [price, setPrice] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     async function fetchServices() {
//         try {
//             const response = await api.get("/services");
//             setServices(response.data);
//         } catch (error) {
//             console.error("Erro ao buscar serviços:", error);
//         }
//     }

//     async function handleSaveService() {
//         try {
//             await api.post("/services", {
//                 title,
//                 price: parseFloat(price.replace(",", ".")),
//             });

//             setTitle("");
//             setPrice("");
//             setIsModalOpen(false);
//             fetchServices(); // atualiza a lista após salvar
//         } catch (error) {
//             console.error("Erro ao salvar serviço:", error);
//         }
//     }

//     return (
//         <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">
//             <div className="flex justify-between items-center mb-8 w-[1200px]">
//                 <h1 className="text-blue-dark font-semibold text-xl">Serviços</h1>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 cursor-pointer"
//                 >
//                     <Plus className="w-5 h-5" />
//                     Novo
//                 </button>
//             </div>

//             <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2 table-fixed">
//                 <thead className="border-b border-gray-400">
//                     <tr className="text-left text-sm text-gray-400">
//                         <th className="px-4 py-3 w-1/2">Título</th>
//                         <th className="px-4 py-3 w-1/4">Valor</th>
//                         <th className="px-4 py-3 w-1/4">Status</th>
//                         <th className="px-4 py-3 w-16 text-end"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {services.map((service) => (
//                         <tr
//                             key={service.id}
//                             className="border-t border-gray-300 hover:bg-gray-50"
//                         >
//                             <td className="px-4 py-3 font-bold text-gray-800">
//                                 {service.title}
//                             </td>
//                             <td className="px-4 py-3 font-bold text-black">
//                                 R$ {service.price.toFixed(2).replace(".", ",")}
//                             </td>
//                             <td className="px-4 py-3">
//                                 <span
//                                     className={`text-xs font-semibold px-2 py-1 rounded-full ${service.active
//                                         ? "bg-green-100 text-green-600"
//                                         : "bg-gray-200 text-gray-500"
//                                         }`}
//                                 >
//                                     {service.active ? "Ativo" : "Inativo"}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-3 text-end">
//                                 <button
//                                     onClick={() => navigate(`/servicos/${service.id}`)}
//                                     className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:text-gray-700 cursor-pointer"
//                                 >
//                                     <PenLine size={16} />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {isModalOpen && (
//                 <AdminServiceModal
//                     title={title}
//                     price={price}
//                     onClose={() => setIsModalOpen(false)}
//                     onChangeTitle={setTitle}
//                     onChangePrice={setPrice}
//                     onSave={handleSaveService}
//                 />
//             )}
//         </div>
//     );
// }


// import { useEffect, useState } from "react";
// import { PenLine, Plus } from "lucide-react";
// import { useNavigate } from "react-router";
// import { api } from "../services/api";
// import { AddServiceModal } from "../components/AddServiceModal";

// interface Service {
//     id: string;
//     title: string;
//     price: number;
//     active: boolean;
// }

// export function AdminServicesList() {
//     const [services, setServices] = useState<Service[]>([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     async function fetchServices() {
//         try {
//             const response = await api.get("/services");
//             setServices(response.data);
//         } catch (error) {
//             console.error("Erro ao buscar serviços:", error);
//         }
//     }

//     async function handleSaveService() {
//         try {
//             await api.post("/services", {
//                 title: description,
//                 price: parseFloat(price.replace(",", ".")),
//             });

//             setDescription("");
//             setPrice("");
//             setIsModalOpen(false);
//             fetchServices(); // atualiza a lista após salvar
//         } catch (error) {
//             console.error("Erro ao salvar serviço:", error);
//         }
//     }

//     return (
//         <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">
//             <div className="flex justify-between items-center mb-8 w-[1200px]">
//                 <h1 className="text-blue-dark font-semibold text-xl">Serviços</h1>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 cursor-pointer"
//                 >
//                     <Plus className="w-5 h-5" />
//                     Novo
//                 </button>
//             </div>

//             <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2 table-fixed">
//                 <thead className="border-b border-gray-400">
//                     <tr className="text-left text-sm text-gray-400">
//                         <th className="px-4 py-3 w-1/2">Título</th>
//                         <th className="px-4 py-3 w-1/4">Valor</th>
//                         <th className="px-4 py-3 w-1/4">Status</th>
//                         <th className="px-4 py-3 w-16 text-end"></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {services.map((service) => (
//                         <tr key={service.id} className="border-t border-gray-300 hover:bg-gray-50">
//                             <td className="px-4 py-3 font-bold text-gray-800">{service.title}</td>
//                             <td className="px-4 py-3 font-bold text-black">
//                                 R$ {service.price.toFixed(2).replace('.', ',')}
//                             </td>
//                             <td className="px-4 py-3">
//                                 <span
//                                     className={`text-xs font-semibold px-2 py-1 rounded-full ${service.active
//                                         ? "bg-green-100 text-green-600"
//                                         : "bg-gray-200 text-gray-500"
//                                         }`}
//                                 >
//                                     {service.active ? "Ativo" : "Inativo"}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-3 text-end">
//                                 <button
//                                     className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:text-gray-700 cursor-pointer"
//                                     onClick={() => navigate(`/servicos/${service.id}`)}
//                                 >
//                                     <PenLine size={16} />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {isModalOpen && (
//                 <AddServiceModal
//                     userRole="admin"
//                     description={description}
//                     price={price}
//                     onClose={() => setIsModalOpen(false)}
//                     onChangeDescription={setDescription}
//                     onChangePrice={setPrice}
//                     onSave={handleSaveService}
//                 />
//             )}
//         </div>
//     );
// }

