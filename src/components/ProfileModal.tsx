import { useEffect, useState } from "react";

import { Button } from "./Button";
import { Input } from "./Input";
import { Upload } from "./upload";

interface ProfileModalProps {
    onClose: () => void;
    avatarUrl: string | null;
    setAvatarUrl: (url: string | null) => void;
    onChangePassword: () => void;
    user: {
        name: string;
        email: string;
        password?: string;
        role: "admin" | "technician" | "customer";
        availability?: string[];
    };
    // onSave: () => Promise<void>;
}

export function ProfileModal({ onClose, avatarUrl, setAvatarUrl, onChangePassword, user }: ProfileModalProps) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // só para exibição

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword("********");
        }
    }, [user]);

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
                <div className="flex justify-between items-center mb-5 border-b border-gray-500">

                    <h2 className="text-md text-gray-200 font-bold mb-5">Perfil</h2>
                    <button onClick={onClose} className="text-gray-300 font-bold mb-5 cursor-pointer">✕</button>

                </div>

                <div className="flex flex-col gap-2">
                    <Upload
                        avatarUrl={avatarUrl}
                        onChangePreview={setAvatarUrl}
                    />

                    <div className="flex flex-col gap-5 mb-4">

                        <Input
                            required
                            legend="Nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            required
                            legend="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="relative">

                            <Input
                                required
                                legend="Senha"
                                type="password"
                                value={password}
                                readOnly
                            />

                            <div className="absolute right-0 top-2">
                                <button
                                    type="button"
                                    className="flex items-center gap-2 p-2 text-gray-200 text-xs bg-gray-500 font-bold px-3 py-2 rounded-md cursor-pointer
                                     hover:bg-gray-400"
                                    onClick={onChangePassword}
                                >
                                    Alterar
                                </button>
                            </div>
                        </div>

                        {user.role === "technician" && user.availability && (
                            <div>
                                <h1 className="text-gray-200 font-semibold text-sm mt-3">Disponibilidade</h1>
                                <p className="text-gray-300 text-xs mb-2">Horários de atendimento definidos pelo admin</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {user.availability.map((hour, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs text-gray-400 border border-gray-500 rounded-full mt-2"
                                        >
                                            {hour}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    <Button onClick={onClose}>Salvar</Button>
                </div>
            </div>

        </div>
    );
}

