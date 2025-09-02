import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";

interface AddAdditionalServiceModalProps {
    description: string;
    price: string;
    onClose: () => void;
    onChangeDescription: (value: string) => void;
    onChangePrice: (value: string) => void;
    onSave: () => void;
}

export function AddAdditionalServiceModal({
    description,
    price,
    onClose,
    onChangeDescription,
    onChangePrice,
    onSave,
}: AddAdditionalServiceModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
                <div className="flex justify-between items-center mb-5 border-b border-gray-500">
                    <h2 className="text-md text-gray-200 font-bold mb-5">
                        Serviço adicional
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-5 mb-4">

                    <Select
                        required
                        legend="Descrição"
                        value={description}
                        onChange={(e) => onChangeDescription(e.target.value)}
                    />

                    <Input
                        required
                        legend="Valor"
                        placeholder="R$ 0,00"
                        type="text"
                        value={price}
                        onChange={(e) => onChangePrice(e.target.value)}
                    />

                    <Button onClick={onSave}>Salvar</Button>
                </div>
            </div>
        </div>
    );
}



// import { Input } from "./Input";
// import { Button } from "./Button";
// import { Select } from "./Select";

// interface AddAdditionalServiceModalProps {
//     description: string;
//     price: string;
//     onClose: () => void;
//     onChangeDescription: (value: string) => void;
//     onChangePrice: (value: string) => void;
//     onSave: () => void;
// }

// export function AddAdditionalServiceModal({
//     description,
//     price,
//     onClose,
//     onChangeDescription,
//     onChangePrice,
//     onSave,
// }: AddAdditionalServiceModalProps) {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
//                 <div className="flex justify-between items-center mb-5 border-b border-gray-500">
//                     <h2 className="text-md text-gray-200 font-bold mb-5">
//                         Serviço adicional
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 <div className="flex flex-col gap-5 mb-4">

//                     <Select
//                         required
//                         legend="Descrição"
//                         value={description}
//                         onChange={(e) => onChangeDescription(e.target.value)}
//                     />

//                     {/* <Input
//                         required
//                         legend="Descrição"
//                         value={description}
//                         onChange={(e) => onChangeDescription(e.target.value)}
//                     /> */}

//                     <Input
//                         required
//                         legend="Valor"
//                         placeholder="R$ 0,00"
//                         type="text"
//                         value={price}
//                         onChange={(e) => onChangePrice(e.target.value)}
//                     />

//                     <Button onClick={onSave}>Salvar</Button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import { Button } from "./Button";
// import { Select } from "./Select";

// interface Service {
//     id: string;
//     title: string;
//     price: number;
// }

// interface AddAdditionalServiceModalProps {
//     services: Service[];
//     selectedServiceId: string;
//     onChangeSelectedService: (id: string) => void;
//     onClose: () => void;
//     onSave: () => void;
// }

// export function AddAdditionalServiceModal({
//     services,
//     selectedServiceId,
//     onChangeSelectedService,
//     onClose,
//     onSave,
// }: AddAdditionalServiceModalProps) {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-gray-600 rounded-xl p-6 w-[440px]">
//                 <div className="flex justify-between items-center mb-5 border-b border-gray-500">
//                     <h2 className="text-md text-gray-200 font-bold mb-5">
//                         Serviço adicional
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-300 font-bold mb-5 cursor-pointer hover:text-gray-400"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                     <Select
//                         legend="Descrição"
//                         value={selectedServiceId}
//                         onChange={(e) => onChangeSelectedService(e.target.value)}
//                     >
//                         <option value="">Selecione</option>
//                         {services.map((service) => (
//                             <option key={service.id} value={service.id}>
//                                 {service.title} - R$ {service.price.toFixed(2).replace(".", ",")}
//                             </option>
//                         ))}
//                     </Select>

//                     <Button onClick={onSave} >
//                         Salvar
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }




