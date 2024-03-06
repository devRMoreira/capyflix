import { useState, useEffect } from "react";

const id = "65e5a01cde0f619624348e79";

export default function queroAssistir() {
  const [data, setData] = useState(null);
  const [queroAssistir, setQueroAssistir] = useState(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}`
          // { body: { lista: "visto" } }
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setData(jsonData.utilizadorFiltrado);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchDataPorVer = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}porVer`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setQueroAssistir(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchDataUser();
    fetchDataPorVer();
  }, []);

  return (
    <>
      {data && (
        <div className=" min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
          <div className=" ml-4 mr-4 mb-24">
            <a href="/perfil">
              <img src="/icones/Back.png" className="  mt-6"></img>
            </a>
            <h1 className=" mb-6 text-lg mt-8 font-semibold text-main-white">
              Quero Assistir
            </h1>
            <div className="flex flex-wrap justify-center gap-10">
              {queroAssistir?.map((item, index) => (
                <a
                  key={index}
                  href="/filme"
                  className=" flex justify-center gap-10"
                >
                  <img className=" w-36" src={item?.capa}></img>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
