import { Request, Response } from 'express'
import { CreatePokemonService } from "../services/CreatePokemonService"

class CreatePokemonController {
    async create(req: Request, res: Response) {
        try {
            const { name, type, abilities, url_img } = req.body

            const createPokemon = new CreatePokemonService()

            const pokemon = await createPokemon.create({
                name: name,
                type: type,
                abilities: abilities,
                url_img: url_img
            })


            return res.status(200).json(pokemon)

        } catch (err) {
            return res.status(500).json({ err });
            //console.log(err)
        }

    }



}
export { CreatePokemonController }