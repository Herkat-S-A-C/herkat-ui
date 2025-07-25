import { useEffect } from "react";

function ModalCRUD({ isOpen, onClose, onSubmit, title, children }) {
useEffect(() => {
if (isOpen) {
document.body.style.overflow = "hidden";
} else {
document.body.style.overflow = "";
}
}, [isOpen]);

if (!isOpen) return null;

return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
<h2 className="text-xl font-semibold mb-4">{title}</h2>
{children}
<div className="flex justify-end gap-2 mt-4">
<button onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">Cancelar</button>
<button onClick={onSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
</div>
</div>
</div>
);
}

export default ModalCRUD;