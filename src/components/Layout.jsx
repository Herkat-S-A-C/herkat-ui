import Header from "./Header";
import Footer from "./Footer";
import ButtonWhatsApp from "../components/ButtonWhatsApp";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow w-full overflow-x-hidden">{children}</main>
      <ButtonWhatsApp />
      <Footer />
    </div>
  );
}

export default Layout;
