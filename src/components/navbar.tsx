import { Link } from "@tanstack/react-router";

const navigation = [
  { name: "Table of Contents", href: "/toc", isRoute: true },
  { name: "Characters", href: "#", isRoute: false },
  { name: "Mr. Finnigan's Diary", href: "#", isRoute: false },
];

export default function Navbar() {
  return (
    <header className="bg-black">
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-slate-200"
          >
            The Lakehouse Stories
          </Link>
        </div>

        <div className="flex lg:gap-x-12">
          {navigation.map((item) =>
            item.isRoute ? (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-semibold leading-6 text-slate-200"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-slate-200"
              >
                {item.name}
              </a>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
