import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-blue-600 font-bold">
          Stock: {payload[0].value} unidades
        </p>
      </div>
    );
  }
  return null;
};

const InventoryChart = ({ productos }) => {
  // Transformar los datos para el gráfico
  const data = productos.map((prod) => ({
    nombre: prod.nombre || prod.title || "Sin nombre",
    stock: prod.stock || prod.cantidad || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        📊 Inventario - Stock de Productos
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
          barCategoryGap={20}
        >
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" tick={{ fill: "#6B7280" }} />
          <YAxis
            dataKey="nombre"
            type="category"
            width={150}
            tick={{ fill: "#374151", fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
          <Bar
            dataKey="stock"
            fill="url(#barColor)"
            radius={[0, 8, 8, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryChart;
