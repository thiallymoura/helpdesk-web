import { useState } from "react";
import { useNavigate } from "react-router";
import { ProfileModal } from "./ProfileModal";

import { useAuth } from "../hooks/useAuth";

import { Upload } from "./upload";

// import { api } from "../services/api";

import { ChangePasswordModal } from "./ChangePasswordModal";

import LogoDark from "../assets/LogoDark.svg"
import { ClipboardList, Plus, Users, BriefcaseBusiness, Wrench } from 'lucide-react';

import LogOut from "../assets/icon/log-out.svg"
import CircleUser from "../assets/icon/circle-user.svg"
import { SidebarButton } from "./SidebarButton";


export function SideBar() {

    const auth = useAuth()
    const role = auth.session?.user.role;

    const [showOptions, setShowOptions] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(auth.session?.user.avatarUrl ?? null);

    const navigate = useNavigate();

    function handleGoToTickets() {
        navigate("/chamados");
    }

    function handleNewTicket() {
        navigate("/chamados/novo");
    }

    function TicketsDoTechincian() {
        navigate("/chamados");
    }

    function handleToggleOptions() {
        setShowOptions(!showOptions);
    }

    function handleOpenProfile() {
        setShowOptions(false);
        setShowProfileModal(true);
    }


    return (
        <>

            <aside className="w-[200px] bg-gray-100 flex flex-col justify-start px-3 py-6">

                <div>

                    <div className="flex items-center gap-2 px-2 py-4 border-b border-gray-200">
                        <img src={LogoDark} alt="Logo" className="w-10 h-10" />
                        <div className="flex flex-col leading-tight">
                            <p className="font-semibold text-white text-sm">HelpDesk</p>
                            <span className="uppercase font-semibold text-[10px] text-blue-light">{role?.toUpperCase()}</span>
                        </div>
                    </div>

                    <nav className="mt-4 flex flex-col gap-2">
                        {role === "customer" && (
                            <>
                                <SidebarButton icon={ClipboardList} label="Meus chamados" path="/chamados" onClick={handleGoToTickets} />
                                <SidebarButton icon={Plus} label="Criar chamado" path="/chamados/novo" onClick={handleNewTicket} />
                            </>
                        )}

                        {role === "technician" && (
                            <SidebarButton icon={ClipboardList} label="Meus chamados" path="/chamados" onClick={TicketsDoTechincian} />
                        )}

                        {role === "admin" && (
                            <>
                                <SidebarButton icon={ClipboardList} label="Chamados" path="/chamados" onClick={() => navigate("/chamados")} />
                                <SidebarButton icon={BriefcaseBusiness} label="Técnicos" path="/tecnicos" onClick={() => navigate("/tecnicos")} />
                                <SidebarButton icon={Users} label="Clientes" path="/clientes" onClick={() => navigate("/clientes")} />
                                <SidebarButton icon={Wrench} label="Serviços" path="/servicos" onClick={() => navigate("/servicos")} />
                            </>
                        )}
                    </nav>

                </div>


                <div className="relative mt-auto px-2 py-3 border-t border-gray-200">
                    <button onClick={handleToggleOptions} className="flex items-center gap-2">

                        <Upload avatarUrl={avatarUrl} readOnly />

                        <div className="flex flex-col text-left">
                            <span className="text-gray-600 text-sm font-bold leading-tight">{auth.session?.user.name}</span>
                            <span className="text-gray-400 text-xs">{auth.session?.user.email}</span>
                        </div>
                    </button>

                    {showOptions && (
                        <div className="absolute bottom-1 left-50 bg-gray-100 shadow-lg rounded-md w-50 z-50 p-5">

                            <h2 className="uppercase text-xxs font-bold mb-3 text-gray-400">Opções</h2>

                            <button

                                onClick={handleOpenProfile}
                                className="w-full flex items-center gap-2 p-2 text-sm rounded-md text-left text-gray-500 hover:bg-gray-200"

                            >
                                <img src={CircleUser} alt="Logo" className="flex items-center gap-2" />
                                Perfil
                            </button>

                            <button
                                onClick={() => auth.remove()}
                                className="w-full flex items-center gap-2 p-2 text-sm rounded-md text-left text-feedback-danger hover:bg-gray-200"
                            >
                                <img src={LogOut} alt="Logo" className="flex items-center gap-2" />
                                Sair
                            </button>

                        </div>
                    )}
                </div>
            </aside>

            {showProfileModal && !showChangePassword && auth.session?.user && (
                <ProfileModal
                    onClose={() => setShowProfileModal(false)}
                    avatarUrl={avatarUrl}
                    setAvatarUrl={setAvatarUrl}
                    onChangePassword={() => setShowChangePassword(true)}
                    user={auth.session.user}

                />
            )}

            {showChangePassword && (
                <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
            )}


        </>
    );
}



