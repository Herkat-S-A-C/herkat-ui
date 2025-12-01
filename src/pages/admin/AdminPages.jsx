import { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
// 🔹 IMPORTAR NUEVO MODAL DE MOVIMIENTOS
import ModalInventoryMovements from "/src/components/ui/ModalInventoryMovements";

// Servicios Existentes
import { getSocialMedia } from "/src/services/socialMediaServices.js";
import { getAllProducts, deleteProduct } from "/src/services/productsServices.js";
import { getAllServices, deleteService } from "/src/services/servicesServices.js";
import { getAllMachines, deleteMachine } from "/src/services/machineryServices.js";
import { getAllBanners, deleteBanner } from "/src/services/bannerServices.js";
import { getAllMachineTypes, deleteMachineType } from "/src/services/typeMachineryServices.js";
import { getAllProductTypes, deleteProductType } from "/src/services/typeProductsServices.js";
import { getAllServiceTypes, deleteServiceType } from "/src/services/typeServicesServices.js";

// Servicios Nuevos
import { getAllClients, deleteClient } from "/src/services/clientServices.js";
import { getAllInventoryBalances } from "/src/services/inventoryBalanceServices.js";

const AdminPage = () => {
  const [data, setData] = useState({
    banner: [],
    productos: [],
    servicios: [],
    maquinaria: [],
    sociales: [],
    clientes: [],
    inventario: [],
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
    clientes: "Clientes",
    ProductosTipos: "Tipos de productos",
    ServiciosTipos: "Tipos de servicios",
    MaquinariaTipos: "Tipos de maquinaria",
    inventario: "Inventario",
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
      clientes: deleteClient,
    }),
    []
  );

  const [selected, setSelected] = useState("banner");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  
  // 🔹 ESTADOS PARA EL MODAL DE MOVIMIENTOS
  const [movementsModalOpen, setMovementsModalOpen] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  // Filtro de inventario
  const [inventoryFilter, setInventoryFilter] = useState("ALL");

  const serviceMap = useMemo(
    () => ({
      productos: getAllProducts,
      servicios: getAllServices,
      maquinaria: getAllMachines,
      banner: getAllBanners,
      sociales: getSocialMedia,
      clientes: getAllClients,
      inventario: getAllInventoryBalances,
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
    setSearch("");
    setInventoryFilter("ALL");
    fetchData("ProductosTipos");
    fetchData("ServiciosTipos");
    fetchData("MaquinariaTipos");
  }, [selected, fetchData]);

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

    if (selected === "inventario") {
      items = items.map((inv) => ({
        ...inv,
        name: inv.item?.name || inv.itemName || "Producto sin nombre",
        stock: inv.currentQuantity 
      }));
    }

    return items;
  };

  const filteredData = getDataWithTypeNames().filter((item) => {
    const nameKey = item.title || item.nombre || item.name || "";
    const typeKey = item.tipoNombre || "";
    const emailKey = item.email || "";
    const idKey = String(item.id || "");

    const matchesSearch = (
      nameKey.toLowerCase().includes(search.toLowerCase()) ||
      typeKey.toLowerCase().includes(search.toLowerCase()) ||
      emailKey.toLowerCase().includes(search.toLowerCase()) ||
      idKey.toLowerCase().includes(search.toLowerCase())
    );

    if (selected === "inventario" && inventoryFilter !== "ALL") {
      return matchesSearch && item.itemType === inventoryFilter;
    }

    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {titleMap[selected] || selected}
            </h1>

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

          {selected === "inventario" && (
            <div className="flex gap-2 items-center bg-white p-2 rounded-xl shadow-sm w-fit">
              <span className="text-gray-600 text-sm font-semibold px-2">Filtrar por:</span>
              <button
                onClick={() => setInventoryFilter("ALL")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  inventoryFilter === "ALL"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setInventoryFilter("PRODUCT")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  inventoryFilter === "PRODUCT"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setInventoryFilter("MACHINE")}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  inventoryFilter === "MACHINE"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Maquinaria
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Pasamos onViewMovements a la Tabla */}
        <Table
          data={filteredData}
          type={selected}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          onViewMovements={(item) => {
            console.log("Abriendo movimientos para:", item);
            setSelectedInventoryItem(item);
            setMovementsModalOpen(true);
          }}
        />

        {/* Modal Genérico (Productos, Clientes, etc.) */}
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

        {/* 🔹 Modal Específico de Movimientos de Inventario */}
        {movementsModalOpen && selected === "inventario" && (
          <ModalInventoryMovements
            item={selectedInventoryItem}
            onClose={() => {
              setMovementsModalOpen(false);
              fetchData("inventario"); // Recargar stock al cerrar
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;