import Link from "next/link";

export default function RootNavbar({ isScrolled }: { isScrolled: boolean }) {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "App", path: "/app" },
  ];

  const itemStyles = `rounded-3xl border-[2px] px-5 py-2 transition-all duration-200 cursor-pointer 
    inline-block w-[100px] text-center
    ${
      isScrolled
        ? "text-black border-background hover:bg-foreground hover:text-background"
        : "text-background border-transparent hover:bg-background hover:text-text"
    }`;

  return (
    <div className="h-20 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <ul className="hidden md:flex gap-x-12 mx-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className={itemStyles}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
