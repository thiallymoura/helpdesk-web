import { Input } from "./Input";
import { Button } from "./Button";

interface AdminServiceModalProps {
    title: string;
    price: string;
    onClose: () => void;
    onChangeTitle: (value: string) => void;
    onChangePrice: (value: string) => void;
    onSave: () => Promise<void>;
}

export function AdminServiceModal({
    title,
    price,
    onClose,
    onChangeTitle,
    onChangePrice,
    onSave,
}: AdminServiceModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-gray-600 rounded-xl p-6 w-[440px] shadow-lg">
                <div className="flex justify-between items-center mb-5 border-b border-gray-500">
                    <h2 className="text-md text-gray-200 font-bold mb-5">Serviço</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
                        aria-label="Fechar modal"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-5 mb-4">
                    <Input
                        required
                        legend="Título"
                        value={title}
                        onChange={(e) => onChangeTitle(e.target.value)}
                    />

                    <Input
                        required
                        legend="Valor"
                        placeholder="R$ 0,00"
                        type="text"
                        value={price}
                        onChange={(e) => onChangePrice(e.target.value)}
                    />

                    <Button onClick={onSave}>Salvar</Button>
                </div>
            </div>
        </div>
    );
}


