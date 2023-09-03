import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <h1 className="text-xl lg:text-3xl">Aprendiendo ⚛️React</h1>
      <h2 className="text-lg lg:text-xl">Desaprendiendo 💲JQuery</h2>
      <p className="text-base lg:text-lg">
        -- Reactionarios de{" "}
        <Link href="https://www.webreactiva.com/">Web Reactiva</Link>
        --
      </p>
    </main>
  );
}
