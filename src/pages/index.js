import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className=" flex">
        <h1 className=" bg-main-orange">ola do index.js</h1>
        <div>TESTE</div>
      </div>
    </main>
  );
}
