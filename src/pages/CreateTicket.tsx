import { useState, useEffect } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";

const ticketSchema = z.object({
    title: z.string().trim().min(1, { message: 'O título é obrigatório' }),
    description: z.string().trim().min(1, { message: 'A descrição é obrigatória' }),
    serviceId: z.string().uuid({ message: "Serviço é obrigatório" }),
    technicianId: z.string().uuid({ message: "Técnico é obrigatório" }),
});

export function CreateTicket() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [technicianId, setTechnicianId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [services, setServices] = useState<{ id: string; title: string; price: number; category: string }[]>([]);
    const [technicians, setTechnicians] = useState<{ id: string; name: string }[]>([]);

    const selectedService = services.find(service => service.id === serviceId);

    useEffect(() => {
        async function fetchData() {
            try {
                const [serviceRes, technicianRes] = await Promise.all([
                    api.get("/services"),
                    api.get("/technicians"),
                ]);

                setServices(serviceRes.data);
                setTechnicians(technicianRes.data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        fetchData();
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setIsLoading(true);

            const data = ticketSchema.parse({
                title,
                description,
                serviceId,
                technicianId,

            });

            await api.post("/tickets", data);

            console.log("Dados enviados:", data);

            // Limpar campos
            setTitle("");
            setDescription("");
            setServiceId("");
            setTechnicianId("");
        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message || "Erro ao criar chamado");
            }

            alert("Erro inesperado ao criar chamado");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-screen h-screen px-20 p-20 bg-gray-600 mt-4 rounded-tl-2xl">
            <h1 className="text-blue-dark font-semibold text-xl mb-8">Novo chamado</h1>

            <form onSubmit={onSubmit} className="flex gap-6">
                {/* FORMULÁRIO PRINCIPAL */}
                <div className="p-8 rounded-xl border border-gray-500 w-full max-w-3xl flex flex-col gap-6">
                    <header>
                        <h2 className="text-sm font-bold text-gray-200">Informações</h2>
                        <p className="text-sm text-gray-300">
                            Preencha os dados para criar um novo chamado
                        </p>
                    </header>

                    <Input
                        required
                        legend="Título"
                        value={title}
                        placeholder="Digite um título para o chamado"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        required
                        legend="Descrição"
                        value={description}
                        placeholder="Descreva o que está acontecendo"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Select
                        required
                        legend="Serviço"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                    >
                        <option value="" disabled>Selecione um serviço</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.title}
                            </option>
                        ))}
                    </Select>

                    <Select
                        required
                        legend="Técnico disponível"
                        value={technicianId}
                        onChange={(e) => setTechnicianId(e.target.value)}
                    >
                        <option value="" disabled>Selecione um técnico</option>
                        {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                                {tech.name}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* RESUMO */}
                <div className="p-6 rounded-xl border border-gray-500 w-80 h-80 flex flex-col justify-between">
                    <div className="flex flex-col">
                        <header className="mb-6">
                            <h2 className="text-sm font-bold text-gray-200">Resumo</h2>
                            <div className="text-sm text-gray-300">Valores e detalhes</div>
                        </header>

                        <div className="font-bold text-xs text-gray-400 mb-2">Categoria de serviço</div>
                        <div className="text-sm font-semibold text-gray-800 mb-4">
                            {selectedService?.title || ""}
                        </div>

                        <div className="font-bold text-xs text-gray-400 mb-2">Custo inicial</div>
                        <div className="text-xs font-bold text-gray-200 mb-6">
                            R$ {selectedService?.price?.toFixed(2).replace(".", ",") || ""}
                        </div>
                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Criar chamado
                    </Button>
                </div>
            </form>
        </div>
    );
}
