import { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
// ❌ Gráfico eliminado
// import InventoryChart from "/src/components/InventoryChart";

// Servicios Existentes (Corregidos a Plural)
import { getSocialMedia } from "/src/services/socialMediaServices.js";
import { getAllProducts, deleteProduct } from "/src/services/productsServices.js";
import { getAllServices, deleteService } from "/src/services/servicesServices.js";
import { getAllMachines, deleteMachine } from "/src/services/machineryServices.js";
import { getAllBanners, deleteBanner } from "/src/services/bannerServices.js";
import { getAllMachineTypes, deleteMachineType } from "/src/services/typeMachineryServices.js";
import { getAllProductTypes, deleteProductType } from "/src/services/typeProductsServices.js";
import { getAllServiceTypes, deleteServiceType } from "/src/services/typeServicesServices.js";

// 🔹 NUEVOS SERVICIOS CONECTADOS (Corregidos a Plural)
import { getAllClients, deleteClient } from "/src/services/clientServices.js";
// Usamos el servicio de Balance para mostrar el stock en la tabla
import { getAllInventoryBalances } from "/src/services/inventoryBalanceServices.js";

const AdminPage = () => {
  const [data, setData] = useState({
    banner: [],
    productos: [],
    servicios: [],
    maquinaria: [],
    sociales: [],
    clientes: [], // 🔹 Estado para clientes
    inventario: [], // 🔹 Estado para el balance de inventario
    ProductosTipos: [],
    ServiciosTipos: [],
    MaquinariaTipos: [],
  });

  const titleMap = {
    productos: "Productos",
    servicios: "Servicios",
    maquinaria: "Maquinaria",
    banner: "Banners",
    sociales: "Redes sociales",
    clientes: "Clientes", // 🔹 Título clientes
    ProductosTipos: "Tipos de productos",
    ServiciosTipos: "Tipos de servicios",
    MaquinariaTipos: "Tipos de maquinaria",
    inventario: "Inventario General", // 🔹 Título inventario
  };

  const deleteMap = useMemo(
    () => ({
      ProductosTipos: deleteProductType,
      ServiciosTipos: deleteServiceType,
      MaquinariaTipos: deleteMachineType,
      productos: deleteProduct,
      servicios: deleteService,
      maquinaria: deleteMachine,
      banner: deleteBanner,
      clientes: deleteClient, // 🔹 Eliminar cliente
    }),
    []
  );

  const [selected, setSelected] = useState("banner");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const serviceMap = useMemo(
    () => ({
      productos: getAllProducts,
      servicios: getAllServices,
      maquinaria: getAllMachines,
      banner: getAllBanners,
      sociales: getSocialMedia,
      clientes: getAllClients, // 🔹 Obtener clientes
      inventario: getAllInventoryBalances, // 🔹 Obtener balance de inventario (Stock Actual)
      ProductosTipos: getAllProductTypes,
      ServiciosTipos: getAllServiceTypes,
      MaquinariaTipos: getAllMachineTypes,
    }),
    []
  );

  const fetchData = useCallback(
    async (type) => {
      try {
        if (serviceMap[type]) {
          const res = await serviceMap[type]();
          // Aseguramos que res sea un array antes de guardar, por seguridad
          setData((prev) => ({ ...prev, [type]: Array.isArray(res) ? res : [] }));
        }
      } catch (error) {
        console.error(`Error cargando datos de ${type}:`, error);
      }
    },
    [serviceMap]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        if (deleteMap[selected]) {
          await deleteMap[selected](id);
          await fetchData(selected);
        } else {
          console.warn(`No hay función de eliminación para ${selected}`);
        }
      } catch (error) {
        console.error(`Error eliminando ${selected} con id ${id}:`, error);
      }
    },
    [selected, deleteMap, fetchData]
  );

  useEffect(() => {
    fetchData(selected);
    // Carga de dependencias para cruzar nombres (Tipos)
    fetchData("ProductosTipos");
    fetchData("ServiciosTipos");
    fetchData("MaquinariaTipos");
  }, [selected, fetchData]);

  // Función para procesar la data y agregar nombres de tipos (relaciones)
  const getDataWithTypeNames = () => {
    let items = Array.isArray(data[selected]) ? [...data[selected]] : [];

    if (selected === "productos") {
      items = items.map((prod) => {
        const tipo = data.ProductosTipos.find((t) => t.id === prod.tipoProductoId);
        return { ...prod, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    if (selected === "servicios") {
      items = items.map((serv) => {
        const tipo = data.ServiciosTipos.find((t) => t.id === serv.tipoServicioId);
        return { ...serv, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    if (selected === "maquinaria") {
      items = items.map((maq) => {
        const tipo = data.MaquinariaTipos.find((t) => t.id === maq.tipoMaquinariaId);
        return { ...maq, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    // 🔹 IMPORTANTE: Preparar datos de inventario para la tabla y el buscador
    if (selected === "inventario") {
      items = items.map((inv) => ({
        ...inv,
        // Extraemos el nombre para que el buscador (filteredData) lo encuentre
        name: inv.item?.name || inv.itemName || "Producto sin nombre",
        // Aseguramos que stock esté disponible en el nivel superior si Table.jsx lo busca así
        stock: inv.currentQuantity 
      }));
    }

    return items;
  };

  // Filtrado para el buscador
  const filteredData = getDataWithTypeNames().filter((item) => {
    const nameKey = item.title || item.nombre || item.name || "";
    const typeKey = item.tipoNombre || "";
    const emailKey = item.email || ""; // Para buscar clientes por email
    const idKey = String(item.id || "");

    return (
      nameKey.toLowerCase().includes(search.toLowerCase()) ||
      typeKey.toLowerCase().includes(search.toLowerCase()) ||
      emailKey.toLowerCase().includes(search.toLowerCase()) ||
      idKey.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {titleMap[selected] || selected}
          </h1>

          {/* 🔹 Mostrar buscador en todos lados menos en 'sociales' */}
          {selected !== "sociales" && (
            <div className="flex gap-4 items-center">
              <div className="relative group transition-all duration-500 ease-out">
                <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white outline-none transition-all duration-500 ease-out
                    w-40 group-hover:w-80 focus-within:w-80"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* El botón registrar se oculta en inventario (es de solo lectura o automático) */}
              {selected !== "inventario" && (
                <button
                  className="bg-blue-500 text-white font-bold px-8 py-3 rounded-xl shadow-md transform transition-all duration-200 hover:scale-[1.15] hover:shadow-lg"
                  onClick={() => {
                    setModalOpen(true);
                    setEditItem(null);
                  }}
                >
                  Registrar
                </button>
              )}
            </div>
          )}
        </div>

        {/* 🔹 Renderizado de Tabla para TODOS los apartados (incluido Inventario y Clientes) */}
        <Table
          data={filteredData}
          type={selected}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        {/* Modal de formulario (se oculta si es inventario) */}
        {modalOpen && selected !== "inventario" && (
          <ModalForm
            type={selected}
            onClose={() => setModalOpen(false)}
            onSave={async () => {
              await fetchData(selected);
              setModalOpen(false);
            }}
            item={editItem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;