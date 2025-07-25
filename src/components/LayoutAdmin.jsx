function LayoutAdmin({ children }) {
return (
<div className="flex min-h-screen">
<aside className="w-64 bg-gray-900 text-white p-6">
<h2 className="text-xl font-bold mb-4">Panel Admin</h2>
<nav className="space-y-2">
<a href="/admin/products" className="block hover:text-blue-400">Productos</a>
<a href="/admin/services" className="block hover:text-blue-400">Servicios</a>
<a href="/admin/machinery" className="block hover:text-blue-400">Maquinaria</a>
</nav>
</aside>
<main className="flex-1 bg-gray-50 p-8">{children}</main>
</div>
);
}
export default LayoutAdmin;