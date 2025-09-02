export function InfoCard({
    technicianName,
    technicianEmail,
    basePrice,
    additionalServices,
}: {
    technicianName: string;
    technicianEmail: string;
    basePrice: number;
    additionalServices: number;
}) {
    const total = basePrice + additionalServices;

    const initials = technicianName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="bg-white rounded-xl border border-gray-300 p-4 w-72 text-sm">
            <div className="text-gray-400 font-semibold text-xs mb-2">Técnico responsável</div>

            <div className="flex items-center gap-3 mb-5">
                <div className="bg-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
                    {initials}
                </div>
                <div>
                    <p className="text-gray-800 font-medium">{technicianName}</p>
                    <p className="text-gray-500 text-xs">{technicianEmail}</p>
                </div>
            </div>

            <div className="text-gray-400 font-semibold text-xs mb-2">Valores</div>
            <div className="flex justify-between text-sm text-gray-700">
                <span>Preço base</span>
                <span>R$ {basePrice.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>Adicionais</span>
                <span>R$ {additionalServices.toFixed(2).replace(".", ",")}</span>
            </div>

            <div className="border-t border-gray-200 my-2" />

            <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
        </div>
    );
}
