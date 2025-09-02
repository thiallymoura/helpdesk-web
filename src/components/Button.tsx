type Props = React.ComponentProps<"button"> & {
    isLoading?: boolean,
};


export function Button({ children, isLoading, type = "button", ...rest }: Props) {
    return (
        <button
            type={type}
            disabled={isLoading}
            className="flex items-center justify-center h-10 mt-5 bg-gray-200 rounded-lg text-white cursor-pointer hover:bg-gray-300
            transition ease-linear disabled:opacity-50 disabled:cursor-progress"

            {...rest}
        >
            {children}
        </button>
    )
}