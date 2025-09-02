import { useState } from "react";
import { X } from "lucide-react";

import { Input } from "./Input";
import { Button } from "./Button";


interface Customer {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
}

interface EditCustomerModalProps {
    customer: Customer;
    onClose: () => void;
    onSave: (updatedCustomer: Customer) => void;
}

export function EditCustomerModal({ customer, onClose, onSave }: EditCustomerModalProps) {

    const [name, setName] = useState(customer.name);
    const [email, setEmail] = useState(customer.email);

    function handleSave() {
        onSave({ id: customer.id, name, email });
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
                <div className="flex justify-between items-center mb-5 border-b border-gray-500">
                    <h2 className="text-md text-gray-200 font-bold mb-5">Editar Cliente</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 mb-4">
                    <Input
                        legend="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        legend="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button onClick={handleSave}>Salvar</Button>
                </div>

            </div>
        </div>
    );
}

