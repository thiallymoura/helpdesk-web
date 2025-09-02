export type PerfilItemProps = {
    id: string
    name: string
    email: string
    password: string
    avatar_url: string
    role: string
    availability: string
}

type Props = React.ComponentProps<"a"> & {
    data: PerfilItemProps
}

export function RefundItem({ data, ...rest }: Props) {
    return (

        <a className="flex items-center gap-3 hover:bg-green-100/5 cursor-pointer rounded-md p-2 transition ease-linear"
            {...rest}>
            <img src={data.avatar_url} alt="icone de categoria" className="w-8 h-8" />

            <div className="flex flex-col flex-1 ">
                <strong className="text-sm text-gray-100">{data.name}</strong>
                <span className="text-xs text-gray-200">{data.email}</span>
            </div>

            <span className="text-sm text-gray-100 font-semibold">
                <small className="font-normal text-gray-200">R$</small>
                {data.password}
            </span>
        </a>
    )
}