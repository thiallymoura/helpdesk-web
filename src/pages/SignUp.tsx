import { useState } from 'react'
import { z, ZodError } from 'zod'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

import { api } from '../services/api'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

const signUpSchema = z.object({
    name: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

export function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({
                name,
                email,
                password
            })

            await api.post('/users', data)

            if (confirm('Cadastro realizado com sucesso!. Deseja fazer login agora?')) {
                navigate('/')
            }

        } catch (error) {

            console.log(error)

            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }

            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }

            alert('Não foi possível cadastrar usuário')

        } finally {
            setIsLoading(false)
        }
    }

    return (

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-3">

            <header className="flex flex-col mb-5">
                <h1 className="font-semibold text-gray-200 text-lg">Crie sua conta</h1>
                <p className="text-xs text-gray-300 mt-1">Informe seu nome, e-mail e senha</p>
            </header>

            <Input
                required
                legend="Nome"
                type="text"
                placeholder="Digite o nome completo"
                onChange={e => setName(e.target.value)}
            />

            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
                onChange={e => setEmail(e.target.value)}
            />

            <div>
                <Input
                    required
                    legend="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={e => setPassword(e.target.value)}
                />

                <span className="text-xs text-gray-400 italic">Mínimo de 6 caracteres</span>

            </div>

            <Button type="submit" isLoading={isLoading}>Cadastrar</Button>


            <div className="mt-5 border border-gray-500 p-5 rounded-lg">
                <p className="font-semibold text-gray-200 text-md">Já tem uma conta?</p>
                <p className="text-xs text-gray-300 mt-1">Entre agora mesmo</p>

                <a href="/" className="flex items-center justify-center h-10 mt-5 bg-gray-500 rounded-lg text-black 
                cursor-pointer hover:bg-gray-400 transition ease-linear disabled:opacity-50 disabled:cursor-progress"
                    type="submit">Acessar Conta
                </a>
            </div>

        </form>
    )
}