import { useState, useEffect } from "react";

import { createContext, type ReactNode } from "react";

import { api } from "../services/api";

// criando um tipo para armazenar a sessão do usuário
type AuthContext = {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    remove: () => void
}

const LOCAL_STORAGE_KEY = "@helpdesk";

//criando um contexto para armazenar os dados do usuário
export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [session, setSession] = useState<null | UserAPIResponse>(null);
    const [isLoading, setIsLoading] = useState(true);

    // função para salvar/conectar os dados do usuário
    function save(data: UserAPIResponse) {
        //atualizar/criar
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user)); //objeto e salvo como string
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

        setSession(data);
    }

    // função para desconectar o usuário
    function remove() {
        setSession(null)

        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

        window.location.assign("/"); //redirecionando para a tela de login

    }

    // função para recuperar os dados do usuário
    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

        if (user && token) {

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setSession({
                token,
                user: JSON.parse(user)//convertendo de string para objeto
            });

        }

        setIsLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (

        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}