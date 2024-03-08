import Link from "next/link";
import { useRouter } from "next/router";

export default function termos() {

    const router = useRouter()

    function handleClick() {
        router.back()
    }

    return (
        <div className="p-1 min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
            <Link href={""} onClick={handleClick}>
                <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
            </Link>
            <h1 className=" text-center text-2xl font-semibold mt-10 text-main-white">
                Termos de Utilização
            </h1>
            <h2 className="text-main-white text-left text-sm mt-4">Obrigado por utilizares a App Capyflix&reg;!
                Estes Termos de Utilização regem o teu acesso e utilização da App Capyflix&reg;, desenvolvida no âmbito do projecto final do VII Bootcamp do Bytes4Future. Ao utilizares a App,  concordas com estes Termos.</h2>
            <h3 className="font-semibold text-main-white text-left text-xs mt-4">1. Âmbito de Utilização</h3>
            <p className="text-main-white text-left text-xs mb-1">A App é um protótipo funcional desenvolvido para fins académicos. A sua utilização é gratuita e não comercial.</p>
            <h3 className="font-semibold text-main-white text-left text-xs">2. Conteúdo e Propriedade Intelectual</h3>
            <p className="text-main-white text-left text-xs mb-1">O conteúdo da App, incluindo imagens, vídeos, textos e outros materiais, é protegido por direitos de autor e propriedade intelectual. Não podes copiar, distribuir, modificar ou reproduzir o conteúdo da App sem a autorização expressa dos autores.</p>
            <h3 className="font-semibold text-main-white text-left text-xs">3. Limitação de Responsabilidade</h3>
            <p className="text-main-white text-left text-xs mb-1">A App é fornecida "no seu estado actual", sem qualquer garantia expressa ou implícita. Os autores da App não se responsabilizam por quaisquer danos ou perdas causadas pela sua utilização.</p>
            <h3 className="font-semibold text-main-white text-left text-xs">4. Rescisão</h3>
            <p className="text-main-white text-left text-xs mb-1">Os autores da App reservam o direito de rescindir o teu acesso à App a qualquer momento, sem aviso prévio.</p>
            <h3 className="font-semibold text-main-white text-left text-xs">5. Alterações aos Termos</h3>
            <p className="text-main-white text-left text-xs mb-1">Os autores da App podem alterar estes Termos a qualquer momento. As alterações entrarão em vigor após a sua publicação na App.</p>
            <h3 className="font-semibold text-main-white text-left text-xs">6. Lei Aplicável</h3>
            <p className="text-main-white text-left text-xs mb-1">Estes Termos são regidos pela lei portuguesa.</p>
            <h3 className=" font-semibold text-main-white text-left text-xs">7. Contactos</h3>
            <p className="text-main-white text-left text-xs mb-1">Em caso de dúvidas ou questões sobre estes Termos, por favor contacta os autores da App através do email [capyflix@capivaras.nao.usam.email.pt].</p>

        </div>
    )
}