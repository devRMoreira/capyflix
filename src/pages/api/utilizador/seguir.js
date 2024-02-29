export default async function handler(req, res) {

    if (req.method === "PATCH") {

        const novoSeguidor = {
            quemSeguir: req.body.quemSeguir,
            quemSegue: req.body.quemSegue
        }

        

    } else {
        return res.status(404).json(undefined)
    }
}