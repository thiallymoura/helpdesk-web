import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { z, ZodError } from 'zod';
import { api } from "../services/api";

import { Input } from "../components/Input";
import { AxiosError } from "axios";

import { AvailabilitySelector } from "../components/AvailabilitySelector";


const technicianSchema = z.object({
    name: z.string().min(2, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
    availability: z.array(z.string()).nonempty('Selecione pelo menos um horário'),
});

export function AdminTechnicianCreate() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [availability, setAvailability] = useState<string[]>([]);

    function toggleHour(hour: string) {
        setAvailability(prev =>
            prev.includes(hour)
                ? prev.filter(h => h !== hour)
                : [...prev, hour]
        );
    }

    async function handleSave() {
        try {
            const data = technicianSchema.parse({
                name,
                email,
                password,
                availability,
            });

            await api.post("/technicians", data);
            alert("Técnico criado com sucesso!");
            navigate("/tecnicos");

        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                return { message: error.issues[0].message }
            }

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }

            alert('Não foi possível cadastrar usuário')
        }
    }

    return (
        <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl">

            <div className="flex justify-between items-center w-[1000px]">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-300 mb-2 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Voltar
                    </button>

                    <h1 className="text-blue-dark font-semibold text-xl mb-8">Perfil de técnico</h1>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-400 cursor-pointer font-bold text-gray-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-800 cursor-pointer"
                    >
                        Salvar
                    </button>
                </div>
            </div>

            <div className="flex gap-8">

                {/* Dados pessoais */}
                <div className="w-[370px] p-6 rounded-xl border border-gray-500 flex flex-col gap-6 ">

                    <div>
                        <h2 className="font-semibold text-md text-gray-200 mb-1">Dados pessoais</h2>
                        <p className="text-xs text-gray-300 ">Defina as informações do perfil de técnico</p>
                    </div>

                    <Input
                        required
                        legend="Nome"
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)}

                    />

                    <Input
                        required
                        legend="E-mail"
                        type="text"
                        placeholder="exemplo@mail.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />

                    <div>
                        <Input
                            required
                            legend="Senha"
                            type="password"
                            value={password}
                            placeholder="Digite sua senha"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <small className="text-gray-400 italic">Mínimo de 6 dígitos</small>

                    </div>

                </div>

                <div className="w-[600px] p-6 rounded-xl border border-gray-500 flex flex-col gap-6">

                    <div>
                        <h2 className="font-semibold text-md text-gray-200 mb-1">Horários de atendimento</h2>
                        <p className="text-xs text-gray-300">Selecione os horários de disponibilidade do técnico para atendimento</p>
                    </div>

                    <div>
                        <AvailabilitySelector selected={availability} onToggle={toggleHour} />
                    </div>

                </div>

            </div>

        </div >
    );
}
