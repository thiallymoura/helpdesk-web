import { useEffect, useState } from "react";
import { PenLine, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

interface Technician {
    id: string;
    name: string;
    email: string;
    availability: string[];
}

export function AdminTechniciansList() {

    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTechnicians() {

            try {

                const response = await api.get("/technicians");
                console.log("Técnicos:", response.data);

                setTechnicians(response.data);

            } catch (error) {

                console.error("Erro ao buscar técnicos:", error);
            }
        }

        fetchTechnicians();
    }, []);

    return (
        <div className="w-screen h-screen px-15 py-15 bg-gray-600 mt-4 rounded-tl-2xl ">

            <div className="flex justify-between items-center mb-8 w-[1200px]">

                <h1 className="text-blue-dark font-semibold text-xl">Técnicos</h1>
                <button
                    onClick={() => navigate("/tecnicos/novo")}
                    className=" flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    Novo
                </button>

            </div>


            <table className="w-[1200px] text-sm border border-gray-500 rounded-3xl border-separate p-2 table-fixed">
                <thead>
                    <tr className="text-left text-sm text-gray-400 border-b">
                        <th className="px-4 py-3 w-1/4">Nome</th>
                        <th className="px-4 py-3 w-1/4">E-mail</th>
                        <th className="px-4 py-3 w-1/4">Disponibilidade</th>
                        <th className="px-4 py-3 w-1/4 "></th>

                    </tr>
                </thead>

                <tbody>
                    {technicians.map((tech) => {
                        const initials = tech.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2);

                        const mainHours = tech.availability.slice(0, 4);
                        const extraCount = tech.availability.length - mainHours.length;

                        return (
                            <tr key={tech.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-2 font-bold text-gray-800">
                                    <div className="w-8 h-8 rounded-full bg-blue-dark text-white flex items-center justify-center text-xs font-bold">
                                        {initials}
                                    </div>
                                    {tech.name}
                                </td>
                                <td className="px-4 py-3 font-bold text-black">{tech.email}</td>
                                <td className="px-4 py-3 flex flex-wrap gap-1">
                                    {mainHours.map((hour, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs text-gray-400 border border-gray-500 rounded-full"
                                        >
                                            {hour}
                                        </span>
                                    ))}
                                    {extraCount > 0 && (
                                        <span className="px-2 py-1 text-xs text-gray-400 border rounded-full border-gray-500 cursor-pointer">
                                            +{extraCount}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-end">
                                    <button
                                        className="text-gray-300 bg-gray-500 rounded-xl p-2 hover:text-gray-700 cursor-pointer"
                                        onClick={() => navigate(`/tecnicos/${tech.id}`)}
                                    >
                                        <PenLine size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
