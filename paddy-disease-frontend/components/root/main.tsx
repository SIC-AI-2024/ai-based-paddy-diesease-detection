import Link from "next/link";

export default function Main() {
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/images/home/main2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-background text-center space-y-4 px-4 gap-4">
        <h1 className="text-5xl font-bold">Cultivating Healthier Crops</h1>
        <div className="text-lg ">
          Empowering farmers with insights for early disease detection
        </div>

        <div className="text-lg max-w-lg">
          Join us in transforming agriculture!
        </div>
        <Link
          href="/app"
          className="rounded-3xl border-[2px] px-5 py-1 transition-all duration-200 cursor-pointer border-background hover:bg-background hover:text-text"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
