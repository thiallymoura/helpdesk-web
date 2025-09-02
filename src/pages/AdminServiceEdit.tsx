// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { api } from "../services/api";
// import { AdminServiceModal } from "../components/AdminServiceModal";

// import { Outlet } from "react-router";

// export function AdminServiceEdit() {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();

//     const [title, setTitle] = useState("");
//     const [price, setPrice] = useState("");
//     const [modalOpen, setModalOpen] = useState(true);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchService() {
//             try {
//                 setLoading(true);
//                 const response = await api.get(`/services/${id}`);
//                 const { title, price } = response.data;
//                 setTitle(title);
//                 setPrice(price.toFixed(2).replace(".", ","));
//             } catch (err) {
//                 console.error("Erro ao buscar serviço:", err);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchService();
//     }, [id]);

//     async function handleUpdateService() {
//         try {
//             await api.patch(`/services/${id}`, {
//                 title,
//                 price: parseFloat(price.replace(",", ".")),
//             });
//             alert("Serviço atualizado com sucesso!");
//             setModalOpen(false);
//             navigate("/servicos");
//         } catch (err) {
//             console.error("Erro ao atualizar serviço:", err);
//             alert("Erro ao atualizar o serviço.");
//         }
//     }

//     if (loading) return <div>Carregando...</div>;

//     return (
//         <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">
//             {modalOpen && (
//                 <AdminServiceModal
//                     title={title}
//                     price={price}
//                     onClose={() => {
//                         setModalOpen(false);
//                         navigate("/servicos");
//                     }}
//                     onChangeTitle={setTitle}
//                     onChangePrice={setPrice}
//                     onSave={handleUpdateService}
//                 />
//             )}
//             <Outlet />
//         </div>
//     );
// }



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { api } from "../services/api";
// import { AdminServiceModal } from "../components/AdminServiceModal";

// export function AdminServiceEdit() {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();

//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [modalOpen, setModalOpen] = useState(true);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchService() {
//             try {
//                 const response = await api.get(`/services/${id}`);
//                 const { title, price } = response.data;
//                 setDescription(title);
//                 setPrice(price.toString().replace(".", ","));
//                 setModalOpen(true)
//             } catch (error) {
//                 console.error("Erro ao buscar serviço:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchService();
//     }, [id]);

//     async function handleUpdateService() {
//         try {
//             await api.patch(`/services/${id}`, {
//                 title: description,
//                 price: parseFloat(price.replace(",", ".")),
//             });
//             alert("Serviço atualizado com sucesso!");
//             setModalOpen(false); // fecha o modal
//             navigate("/servicos"); // volta para lista de serviços
//         } catch (error) {
//             console.error("Erro ao atualizar serviço:", error);
//             alert("Erro ao atualizar.");
//         }
//     }

//     if (loading) return <div>Carregando...</div>;

//     return (
//         <>
//             {modalOpen && (
//                 <AdminServiceModal
//                     title={description}
//                     price={price}
//                     onClose={() => {
//                         setModalOpen(false);
//                         navigate("/servicos"); // se fechar modal cancela edição e volta
//                     }}
//                     onChangeTitle={setDescription}
//                     onChangePrice={setPrice}
//                     onSave={handleUpdateService}

//                 />
//             )}
//         </>
//     );
// }



// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { api } from "../services/api";
// import { AddServiceModal } from "../components/AddServiceModal";

// export function AdminServiceEdit() {
//     const { id } = useParams<{ id: string }>();

//     const navigate = useNavigate();

//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [modalOpen, setModalOpen] = useState(true); // já abre o modal

//     useEffect(() => {
//         async function fetchService() {
//             try {
//                 const response = await api.get(`/services/${id}`);
//                 const { title, price } = response.data;
//                 setDescription(title);
//                 setPrice(price.toString().replace(".", ","));
//             } catch (error) {
//                 console.error("Erro ao buscar serviço:", error);
//             }
//         }
//         fetchService();
//     }, [id]);

//     async function handleUpdateService() {
//         try {
//             await api.patch(`/services/${id}`, {
//                 title: description,
//                 price: parseFloat(price.replace(",", ".")),
//             });
//             alert("Serviço atualizado com sucesso!");
//             navigate("/servicos");
//         } catch (error) {
//             console.error("Erro ao atualizar serviço:", error);
//             alert("Erro ao atualizar.");
//         }
//     }

//     return (
//         <>
//             {modalOpen && (
//                 <AddServiceModal
//                     description={description}
//                     price={price}
//                     onClose={() => setModalOpen(false)}
//                     onChangeDescription={setDescription}
//                     onChangePrice={setPrice}
//                     onSave={handleUpdateService}
//                     userRole="admin"
//                 />
//             )}
//         </>
//     );
// }
