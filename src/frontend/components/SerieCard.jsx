import moment from "moment";
import Image from "next/image";


export function SerieCard({serie}){
    return(
        <div>
            <Image src={serie.capa} width="100" height="100" />
            <h2>{serie.titulo}</h2>
            <h2>{serie.tituloOriginal}</h2>
            <h3>{serie.genero.map((ele, index) => index < serie.genero.length - 1 ? ele + "/" : ele)}</h3>
            <h3 className="text-main-black">Data de Lançamento: {moment(serie.dataLancamento).format('DD/MM/YYYY')}</h3>
            <p>{Object.keys(serie.temporadas).length}</p>
            <p>{serie.classificacaoEtaria}</p>
            <p>{serie.mediaAvaliacoes}</p>
        </div>
    )
}