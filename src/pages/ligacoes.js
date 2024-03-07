import { useState, useEffect } from "react";

const id = "65e5a01cde0f619624348e79";

export default function ligacoes() {
  const [followingIsClicked, setFollowingIsClicked] = useState(false);
  const [followersIsClicked, setFollowersIsClicked] = useState(false);
  const [data, setData] = useState(null);
  const [quemSegue, setQuemSegue] = useState(null);
  const [seguidores, setSeguidores] = useState(null);

  const dropdownFollowing = () => {
    setFollowingIsClicked(!followingIsClicked);
  };

  const dropdownFollowers = () => {
    setFollowersIsClicked(!followersIsClicked);
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}`
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

    const fetchSeguidores = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}seguidores`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setSeguidores(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    const fetchQuemSegue = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/utilizador/${id}quemSegue`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const jsonData = await response.json();
        await setQuemSegue(jsonData);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchDataUser();
    fetchSeguidores();
    fetchQuemSegue();
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col md:max-w-96 min-h-screen h-full bg-fundo-principal">
          <a href="/perfil">
            <img src="/icones/Back.png" className=" ml-4 mt-10"></img>
          </a>
          <div className=" flex gap-16 ml-4 mr-4">
            <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
              Seguindo
            </h1>
            <button onClick={dropdownFollowing}>
              {followingIsClicked ? (
                <img src="/icones/arrowUp.png" className=" mt-4"></img>
              ) : (
                <img src="/icones/dropdown.png" className=" mt-4"></img>
              )}
            </button>
          </div>
          {followingIsClicked && quemSegue?.length && (
            <>
              {quemSegue.map((item, index) => (
                <div key={index} className=" flex items-center gap-2 ml-6 mt-2">
                  {item?.imagemPerfil ? (
                    <img
                      src={item?.imagemPerfil}
                      className=" border-2 border-laranja-principal object-cover rounded-full max-w-full max-h-full w-12 h-12"
                    ></img>
                  ) : (
                    <img
                      src="/icones/avatar.png"
                      className=" border-2 border-laranja-principal object-cover rounded-full max-w-full max-h-full w-12 h-12"
                    ></img>
                  )}
                  <p className=" text-laranja-principal font-medium">
                    {item?.nome}
                  </p>
                </div>
              ))}
            </>
          )}
          <div className=" flex gap-12 ml-4 mr-4">
            <h1 className=" mb-6 text-lg mt-10 font-semibold text-main-white">
              Seguidores
            </h1>
            <button onClick={dropdownFollowers}>
              {followersIsClicked ? (
                <img src="/icones/arrowUp.png" className=" mt-4"></img>
              ) : (
                <img src="/icones/dropdown.png" className=" mt-4"></img>
              )}
            </button>
          </div>
          {followersIsClicked && seguidores?.length && (
            <>
              {seguidores.map((item, index) => (
                <div key={index} className=" flex items-center gap-2 ml-6 mt-2">
                  {item?.imagemPerfil ? (
                    <img
                      src={item?.imagemPerfil}
                      className=" border-2 border-laranja-principal object-cover rounded-full max-w-full max-h-full w-12 h-12"
                    ></img>
                  ) : (
                    <img
                      src="/icones/avatar.png"
                      className=" border-2 border-laranja-principal object-cover rounded-full max-w-full max-h-full w-12 h-12"
                    ></img>
                  )}
                  <p className=" text-laranja-principal font-medium">
                    {item?.nome}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
