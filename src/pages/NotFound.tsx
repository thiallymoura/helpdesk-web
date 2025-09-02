export function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col ">
                <h1 className="text-gray-100 font-semibold text-2xl mb-10">
                    Ops! Essa página não existe. 🥲
                </h1>

                <a
                    href="/"
                    className="font-semibold text-center text-blue-base
                    hover:text-blue-200 trasnition ease-linear"
                >
                    Volte para a página inicial
                </a>
            </div>
        </div>
    )
}