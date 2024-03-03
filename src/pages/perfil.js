import { NavPrincipal } from "@/frontend/components/NavPrincipal";
import { PerfilNav } from "@/frontend/components/PerfilNav";

export default function Perfil() {
  return (
    <div className=" min-h-screen max-w-96 h-full bg-fundo-principal flex flex-col items-center">
      <PerfilNav
        avatar="/icones/avatar.png"
        username="Carolina"
        comentarios="/icones/comentarios.png"
        ligacoes="/icones/ligacoes.png"
        config="/icones/configuracoes.png"
      ></PerfilNav>
      <NavPrincipal
        home="/icones/Home.png"
        pesquisar="/icones/Search.png"
        perfil="/icones/avatar.png"
      ></NavPrincipal>
    </div>
  );
}
