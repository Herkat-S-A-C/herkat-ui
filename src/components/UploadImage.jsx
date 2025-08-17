import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

const UploadImage = ({ form, handleFileChange, inputId, label }) => (
  <div className="space-y-2 hover:scale-[1.02] transition-transform">
    {label && <Label className="text-gray-700">{label}</Label>}

    <div
      className="border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition flex flex-col items-center justify-center text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileChange({ target: { files: [file] } });
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <ImagePlus className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">
          Arrastra una imagen aquí o haz clic para seleccionarla
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={inputId}
      />
      <label
        htmlFor={inputId}
        className="mt-3 inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-pointer shadow hover:shadow-lg hover:opacity-90 transition"
      >
        Seleccionar archivo
      </label>
    </div>

    {form.imagen && (
      <img
        src={form.file ? URL.createObjectURL(form.file) : form.imagen}
        alt="Vista previa"
        className="w-full h-40 object-cover rounded-lg transition-transform hover:scale-[1.02]"
      />
    )}
  </div>
);

export default UploadImage;
