import { useState } from "react";

export default function Ligacoes() {
  const [followingIsClicked, setFollowingIsClicked] = useState(false);
  const [followersIsClicked, setFollowersIsClicked] = useState(false);

  const dropdownFollowing = () => {
    setFollowingIsClicked(!followingIsClicked);
  };

  const dropdownFollowers = () => {
    setFollowersIsClicked(!followersIsClicked);
  };

  return (
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
      {followingIsClicked && (
        <>
          <div className=" flex items-center gap-2 ml-6 mt-2">
            <img src="/icones/avatar.png"></img>
            <p className=" text-laranja-principal font-medium">Carolina</p>
          </div>
          <div className=" flex items-center gap-2 ml-6 mt-7">
            <img src="/icones/avatar.png"></img>
            <p className=" text-laranja-principal font-medium">João</p>
          </div>
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
      {followersIsClicked && (
        <>
          <div className=" flex items-center gap-2 ml-6 mt-2 mb-24">
            <img src="/icones/avatar.png"></img>
            <p className=" text-laranja-principal font-medium">Ana</p>
          </div>
        </>
      )}
    </div>
  );
}
