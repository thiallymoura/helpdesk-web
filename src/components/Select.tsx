type Props = React.ComponentProps<"select"> & {
    legend?: string;
};

export function Select({ legend, children, ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 max-h-20 text-gray-300 focus-within:text-blue-base">
            {legend && (
                <legend className="uppercase text-xxs mb-2 text-inherit"
                >
                    {legend}
                </legend>
            )}

            <select className="w-full h-9 border-b border-gray-500 text-sm
            text-gray-100 bg-transparent outline-none placeholder-gray-400"

                {...rest}
            >
                <option value="" disabled hidden >
                    Selecione um item
                </option>

                {children}
            </select>
        </fieldset>
    )

}