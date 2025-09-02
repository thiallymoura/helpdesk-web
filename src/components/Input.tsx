type Props = React.ComponentProps<"input"> & {
    legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 max-h-20 text-gray-300 focus-within:text-blue-base">
            {legend && (
                <legend className="uppercase font-bold text-xxs text-inherit ">
                    {legend}
                </legend>
            )}

            <input type={type}
                className="w-full h-9 border-b border-gray-500 text-md
            text-gray-100 bg-transparent outline-none focus:border-blue-base placeholder-gray-400"
                {...rest} />
        </fieldset>
    )

}