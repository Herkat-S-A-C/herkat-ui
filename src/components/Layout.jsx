import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
return (
<>
<Header />
<main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
<Footer />
</>
);
}

export default Layout;