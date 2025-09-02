import { useState } from "react";

import { ArrowLeft } from "lucide-react"; // ícone da seta
import { Button } from "./Button";
import { Input } from "./Input";

interface ChangePasswordModalProps {
    onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Aqui você pode adicionar a chamada para a API de alteração de senha
        console.log({ currentPassword, newPassword });
        alert("Senha alterada com sucesso!");
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-[400px]">
                <div className="flex items-center justify-between mb-5 border-b border-gray-500 pb-4">
                    {/* Seta + título */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center text-gray-200"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="text-md text-gray-200 font-bold">Alterar senha</span>
                    </button>

                    {/* Botão X (fechar) no lado direito */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-300 font-bold"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <Input
                        required
                        type="password"
                        legend="Senha atual"
                        placeholder="Digite sua senha atual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <div>
                        <Input
                            required
                            type="password"
                            legend="Nova senha"
                            placeholder="Digite sua nova senha"
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}


                        />

                        <span className="text-xs text-gray-400 italic">Mínimo de 6 caracteres</span>
                    </div>

                    <Button type="submit">Salvar</Button>
                </div>
            </form>
        </div>
    );
}