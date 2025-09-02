import { CircleHelp, Clock, CircleCheckBig } from "lucide-react";

export const STATUS = {
    Open: {
        label: "Aberto",
        icon: CircleHelp,
        color: "bg-rose-100 text-feedback-open",
    },
    InProgress: {
        label: "Em atendimento",
        icon: Clock,
        color: "bg-blue-100 text-feedback-progress",
    },
    Closed: {
        label: "Encerrado",
        icon: CircleCheckBig,
        color: "bg-green-100 text-feedback-done",
    },
};

export const STATUS_KEYS = Object.keys(STATUS) as Array<keyof typeof STATUS>;

