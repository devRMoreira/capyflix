import Link from "next/link"
import { useRouter } from "next/router";

export default function Privacidade() {

    const router = useRouter()

    function handleClick() {
        router.back()
    }
    return (
        <div className="p-1 min-h-screen md:max-w-96 h-full bg-fundo-principal flex flex-col">
            <Link href={""} onClick={handleClick}>
                <img src="/icones/Back.png" className=" ml-4 mt-6"></img>
            </Link>
            <h1 className="ml-10 text-left text-2xl font-semibold mt-10 text-main-white">
                Declaração de Privacidade
            </h1>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                A tua privacidade é importante para nós! Esta Declaração de Privacidade explica como recolhemos, utilizamos e protegemos os teus dados pessoais quando utilizas a App Capyflix&reg;.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">1. Recolha de Dados</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                A App recolhe apenas os dados pessoais que forneces voluntariamente, tais como o nome e endereço de email.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">2. Utilização de Dados</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                Os teus dados pessoais são utilizados apenas para fins académicos, no âmbito do projecto final do VII Bootcamp do Bytes4Future.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">3. Partilha de Dados</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                Os teus dados pessoais não serão partilhados com terceiros sem consentimento.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">4. Segurança de Dados</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                Os teus dados pessoais são armazenados em segurança e os autores da App tomam todas as medidas necessárias para proteger a tua privacidade.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">5. Direitos do Utilizador</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                Tens o direito de aceder, corrigir e eliminar os teus dados pessoais.
            </p>
            <h3 className="text-sm font-normal mb-2 text-main-white">6. Contactos</h3>
            <p className="text-left text-xs leading-relaxed mb-3 text-main-white">
                Em caso de dúvidas ou questões sobre esta Declaração de Privacidade, por favor contacta os autores da App através do email
                <a href="mailto:capyflix@capivaras.nao.usam.email.pt" className="text-main-link">capyflix@capivaras.nao.usam.email.pt</a>.
            </p>
            <p className="text-left text-xs leading-relaxed mb-4 text-main-white">
                Ao utilizares a App, concordas com esta Declaração de Privacidade.
            </p>
        </div>
    )
}