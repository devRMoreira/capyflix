import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className=" flex">
        <h1 className=" bg-main-orange"></h1>
        <div>TESTE do index</div>
      </div>
    </main>
  );
}
