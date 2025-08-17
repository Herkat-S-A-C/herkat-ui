import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UploadImage from "./UploadImage";

const FormFields = ({
  fields,
  form,
  setForm,
  handleChange,
  handleFileChange,
  options, // { productTypes, machineTypes, serviceTypes }
}) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const id = `field-${field.name}`;

        // === Inputs básicos: text / number / url
        if (["text", "number", "url"].includes(field.type)) {
          return (
            <div
              key={field.name}
              className="space-y-1 hover:scale-[1.02] transition-transform"
            >
              <Label htmlFor={id} className="text-gray-700">
                {field.label}
              </Label>
              <input
                id={id}
                name={field.name}
                type={field.type}
                value={form[field.name] ?? ""}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                readOnly={!!field.readonly}
                className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        // === Textarea
        if (field.type === "textarea") {
          return (
            <div
              key={field.name}
              className="space-y-1 hover:scale-[1.02] transition-transform"
            >
              <Label htmlFor={id} className="text-gray-700">
                {field.label}
              </Label>
              <textarea
                id={id}
                name={field.name}
                value={form[field.name] ?? ""}
                onChange={handleChange}
                placeholder={field.placeholder || ""}
                rows={3}
                className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          );
        }

        // === Select (con las 3 fuentes posibles)
        if (field.type === "select") {
          const { productTypes = [], machineTypes = [], serviceTypes = [] } = options || {};
          const selectOptions =
            field.optionsSource === "productTypes"
              ? productTypes
              : field.optionsSource === "machineTypes"
                ? machineTypes
                : field.optionsSource === "serviceTypes"
                  ? serviceTypes
                  : serviceTypes;

          return (
            <div
              key={field.name}
              className="space-y-1 hover:scale-[1.02] transition-transform"
            >
              <Label htmlFor={id} className="text-gray-700">
                {field.label}
              </Label>
              <select
                id={id}
                name={field.name}
                value={form[field.name] ?? ""}
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{`Seleccione ${field.label}`}</option>
                {selectOptions?.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        // === Imagen (usa el componente separado)
        if (field.type === "image") {
          return (
            <UploadImage
              key={field.name}
              form={form}
              handleFileChange={handleFileChange}
              inputId={`fileInput-${field.name}`}
              label={field.label}
            />
          );
        }

        // === Switch (mapea 'destacado' <-> isFeatured)
        if (field.type === "switch") {
          const isFeaturedValue =
            field.name === "destacado"
              ? !!form.isFeatured
              : !!form[field.name];

          return (
            <div
              key={field.name}
              className="flex items-center justify-between pt-1 hover:scale-[1.02] transition-transform"
            >
              <Label htmlFor={id} className="text-gray-700 font-medium">
                {field.label}
              </Label>
              <Switch
                id={id}
                checked={isFeaturedValue}
                onCheckedChange={(val) =>
                  setForm((prev) => ({
                    ...prev,
                    [field.name]: val,
                    ...(field.name === "destacado" ? { isFeatured: val } : {}),
                  }))
                }
                className="data-[state=checked]:bg-gradient-to-r from-cyan-400 to-blue-600"
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FormFields;
