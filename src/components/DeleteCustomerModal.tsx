import { X } from "lucide-react";
// import { Button } from "./Button";

interface Customer {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
}

interface DeleteCustomerModalProps {
    customer: Customer;
    onClose: () => void;
    onDelete: (id: string) => void;
}

export function DeleteCustomerModal({ customer, onClose, onDelete }: DeleteCustomerModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-gray-600 rounded-xl p-6 w-[440px]">

                <div className="flex justify-between items-center mb-5 border-b border-gray-500">
                    <h2 className="text-md text-gray-200 font-bold mb-5">Excluir cliente</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
                        aria-label="Fechar modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="text-gray-200 mb-6 text-md">
                    Deseja realmente excluir <span className="font-semibold">{customer.name}</span>?
                </p>

                <p className="text-md text-gray-200 mb-6 ">
                    Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.
                </p>

                <div className="flex justify-between gap-2 mb-4">
                    <button
                        onClick={onClose}
                        className="px-15 py-2 rounded-md bg-gray-500 text-gray-200 cursor-pointer hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button

                        onClick={() => onDelete(customer.id)}
                        className="px-15 py-2 rounded-md bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-300"
                    >
                        Sim, excluir
                    </button>
                </div>
            </div>
        </div>
    );
}
