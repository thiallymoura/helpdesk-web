import { useLocation } from "react-router";
import type { LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon;
    label: string;
    path: string;
    onClick?: () => void;
};

export function SidebarButton({ icon: Icon, label, path, onClick }: Props) {

    const location = useLocation();

    const isActive = location.pathname === path;

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded cursor-pointer
                ${isActive ? "bg-blue-dark text-white" : "text-gray-400"}
            `}
        >
            <Icon className="w-5 h-5 group-hover:text-white" />
            {label}
        </button>
    );
}