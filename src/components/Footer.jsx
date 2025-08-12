import { social_networks } from "/src/constants/dataItems";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-10 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          {social_networks.map(({ id, icon: Icon, url, hoverColor, title }) => {
            const isEmail = url?.startsWith("mailto:");
            return (
              <a
                key={id}
                href={url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={`text-white transition ${hoverColor || ""}`}
                title={title || ""}
              >
                {Icon && <Icon size={22} />}
              </a>
            );
          })}
        </div>
        © {new Date().getFullYear()} HerKat Group SAC — Todos los derechos reservados.
      </div>
    </footer>
  );
}
