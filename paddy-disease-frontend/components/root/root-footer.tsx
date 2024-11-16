export default function RootFooter() {
  return (
    <>
      <footer className="bg-foreground shadow h-24 content-center">
        <div className="w-full  p-4 px-8 flex items-center justify-between text-background">
          <span className="text-sm  ">
            © 2024
            <a href="#" className="hover:underline">
              RiceSense™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
