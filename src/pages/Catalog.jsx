import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import { useParams } from "react-router-dom";
import { productos, servicios, maquinaria } from "../constants/dataStatic";

function Catalog() {
  const { tipo } = useParams(); // 'products', 'services' o 'machinery'

  // Mapeamos el tipo al array correspondiente
  const dataMap = {
    products: productos,
    services: servicios,
    machinery: maquinaria,
  };

  const items = dataMap[tipo] || [];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 capitalize">{tipo}</h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay elementos en esta categoría.</p>
      )}
    </Layout>
  );
}

export default Catalog;
