import { useEffect, useState } from "react";
import { PenLine, Trash } from "lucide-react";

import { api } from "../services/api";

import { AxiosError } from "axios";

import { EditCustomerModal } from "../components/EditCustomerModal";
import { DeleteCustomerModal } from "../components/DeleteCustomerModal";

interface Customer {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}

export function AdminCustomersList() {
    const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await api.get("/customers");
                setCustomers(response.data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        }

        fetchCustomers();
    }, []);

    function handleEdit(customer: Customer) {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    }

    async function handleSave(updatedCustomer: { id: string; name: string; email: string }) {
        try {
            const response = await api.patch(`/customers/${updatedCustomer.id}`, {
                name: updatedCustomer.name,
                email: updatedCustomer.email,
            });

            setCustomers((prev) =>
                prev.map((c) => (c.id === updatedCustomer.id ? response.data : c))
            );

            setIsModalOpen(false);
            setEditingCustomer(null);

            alert("Alterações salvas com sucesso!");

        } catch (error) {

            console.log(error)

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }

            alert("Erro ao salvar alterações.");
        }
    }

    function handleOpenDeleteModal(customer: Customer) {
        setDeletingCustomer(customer);
        setIsDeleteModalOpen(true);
    }

    async function handleDeleteCustomer(id: string) {
        try {

            await api.delete(`/customers/${id}`);

            setCustomers((prev) => prev.filter((c) => c.id !== id));

            setIsDeleteModalOpen(false);
            setDeletingCustomer(null);

            alert("Cliente excluido com sucesso!");
        } catch (error) {

            console.error("Erro ao deletar cliente:", error)
            // console.log(error)

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }

            alert("Erro ao excluir cliente.");
        }
    }

    return (
        <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">
            <div className="flex justify-between items-center mb-8 w-[800px]">
                <h1 className="text-blue-dark font-semibold text-xl">Clientes</h1>
            </div>

            <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate table-fixed">
                <thead>
                    <tr className="text-left text-sm text-gray-400 ">
                        <th className="px-4 py-3 w-1/2">Nome</th>
                        <th className="px-4 py-3 w-1/2">E-mail</th>
                        <th className="px-4 py-3 w-24 text-end"></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => {
                        const initials = customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2);

                        return (
                            <tr key={customer.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-2 font-bold text-gray-800">
                                    <div className="w-8 h-8 rounded-full bg-blue-dark text-white flex items-center justify-center text-xs font-bold">
                                        {initials}
                                    </div>
                                    {customer.name}
                                </td>
                                <td className="px-4 py-3 font-bold text-black">{customer.email}</td>
                                <td className="px-4 py-3 text-end flex justify-end gap-2">
                                    <button
                                        className="text-rose-500 bg-gray-500 rounded-xl p-2 hover:bg-rose-200 cursor-pointer"
                                        onClick={() => handleOpenDeleteModal(customer)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                    <button
                                        className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:bg-gray-400 cursor-pointer"
                                        onClick={() => handleEdit(customer)}
                                    >
                                        <PenLine size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {isModalOpen && editingCustomer && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingCustomer(null);
                    }}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && deletingCustomer && (
                <DeleteCustomerModal
                    customer={deletingCustomer}
                    onClose={() => {
                        setIsDeleteModalOpen(false);
                        setDeletingCustomer(null);
                    }}
                    onDelete={handleDeleteCustomer}
                />
            )}
        </div>
    );
}
