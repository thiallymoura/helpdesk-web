import { availableHours } from "../utils/hours"

interface Props {
    selected: string[];
    onToggle: (hour: string) => void;
}

export function AvailabilitySelector({ selected, onToggle }: Props) {
    const periods = [
        { label: "Manhã", range: availableHours.slice(0, 6) },
        { label: "Tarde", range: availableHours.slice(6, 12) },
        { label: "Noite", range: availableHours.slice(12) },
    ];

    return (
        <>
            {periods.map(({ label, range }) => (
                <div key={label}>
                    <p className="font-semibold text-gray-300 text-xxs mb-1 uppercase">{label}</p>
                    <div className="flex flex-wrap gap-2 text-gray-200 mb-6">
                        {range.map(hour => (
                            <button
                                key={hour}
                                type="button"
                                onClick={() => onToggle(hour)}
                                className={`px-3 py-1 text-xs border rounded-full cursor-pointer
                  ${selected.includes(hour)
                                        ? "bg-blue-base text-white border-blue-base"
                                        : "border-gray-400 text-gray-200"}
                `}
                            >
                                {hour}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
