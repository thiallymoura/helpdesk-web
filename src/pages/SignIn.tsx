import { useActionState } from 'react'
import { z, ZodError } from 'zod'
import { AxiosError } from 'axios'

import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'

import { Input } from '../components/Input'
import { Button } from '../components/Button'

const signInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().trim().min(1, { message: 'Informe a senha' }),
})

export function SignIn() {
    const [state, formAction, isLoading] = useActionState(signIn, null)

    const auth = useAuth()

    async function signIn(_: any, formData: FormData) {

        try {
            const data = signInSchema.parse({
                email: formData.get('email'),
                password: formData.get('password'),
            })

            const response = await api.post('/sessions', data)
            auth.save(response.data)

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

        <form action={formAction} className="w-full flex flex-col gap-3">

            <header className="flex flex-col mb-5">
                <h1 className="font-semibold text-gray-200 text-lg">Acesse o portal</h1>
                <p className="text-xs text-gray-300 mt-1">Entre usando seu e-mail e senha cadastrados.</p>
            </header>

            <Input
                name="email"
                required
                legend="E-mail"
                type="email"
                placeholder="exemplo@mail.com"
            />

            <Input
                name="password"
                required
                legend="Senha"
                type="password"
                placeholder="Digite sua senha"

            />

            <p className='text-sm text-red-600 text-center my-1 font-medium'>
                {state?.message}
            </p>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>


            <div className="mt-5 border border-gray-500 p-5 rounded-lg">
                <p className="font-semibold text-gray-200 text-md">Ainda não tem uma conta?</p>
                <p className="text-xs text-gray-300 mt-1">Cadastre agora mesmo</p>

                <a href="/signup" className="flex items-center justify-center h-10 mt-5 bg-gray-500 rounded-lg text-black 
                cursor-pointer hover:bg-gray-400 transition ease-linear disabled:opacity-50 disabled:cursor-progress"
                    type="submit">Criar Conta
                </a>
            </div>




        </form>
    )
}