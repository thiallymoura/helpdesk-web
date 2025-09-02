import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

// criando um hook personalizado para obter os dados do usuário
export function useAuth() {

    const context = useContext(AuthContext);

    return context
}