import { useState, useRef, useEffect } from "react";
import Trash from "../assets/icon/trash.svg";
import UploadSvg from "../assets/icon/upload.svg";

type Props = React.ComponentProps<"input"> & {
    avatarUrl?: string | null;
    readOnly?: boolean;
    onChangePreview?: (url: string | null) => void;
};

export function Upload({ avatarUrl = null, readOnly = false, onChangePreview, ...rest }: Props) {
    const [preview, setPreview] = useState<string | null>(avatarUrl);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setPreview(avatarUrl);
    }, [avatarUrl]);

    async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
            onChangePreview?.(imageURL);

            const formData = new FormData();
            formData.append("avatar", file);

            try {
                const response = await fetch("http://localhost:3333/users/avatar", {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: formData,
                });

                const data = await response.json();
                if (data.avatarUrl) {
                    setPreview(data.avatarUrl);
                    onChangePreview?.(data.avatarUrl);
                }
            } catch (err) {
                console.error("Erro ao fazer upload:", err);
            }
        }
    }

    function handleDeleteImage() {
        setPreview(null);
        onChangePreview?.(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (

        <div className="flex items-center gap-2 mb-4">

            <label htmlFor="upload" className={!readOnly ? "cursor-pointer" : ""}>
                {preview ? (
                    <img
                        src={preview}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover border border-gray-300 bg-gray-200"
                    />
                ) : (
                    <div className="w-13 h-13 rounded-full border border-gray-300 bg-white flex items-center justify-center p-4 text-gray-400 text-xs">
                        Sem imagem
                    </div>
                )}
            </label>

            <input
                type="file"
                id="upload"
                className="hidden"
                ref={inputRef}
                onChange={handleImageChange}
                disabled={readOnly}
                {...rest}
            />

            {!readOnly && (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex items-center gap-2 p-2 text-xs text-gray-200 bg-gray-500 font-bold px-3 py-2 rounded-md cursor-pointer hover:bg-gray-400"
                        onClick={() => inputRef.current?.click()}
                    >
                        <img src={UploadSvg} alt="UploadSvg" className="w-4 h-4" />
                        Nova imagem
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 p-2 text-xs bg-gray-500 font-bold px-3 py-2 rounded-md cursor-pointer hover:bg-gray-400"
                        onClick={handleDeleteImage}
                    >
                        <img src={Trash} alt="Remover" className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}