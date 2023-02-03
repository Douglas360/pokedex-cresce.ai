import { Request, Response } from 'express'
import { CreatePokemonTeamService } from "../services/CreatePokemonTeamService"

class CreatePokemonTeamController {
    async create(req: Request, res: Response) {
        try {
            const { team_id, pokemon_id } = req.body

            const createPokemonTeam = new CreatePokemonTeamService()

            const pokemonTeam = await createPokemonTeam.create({
                team_id: team_id,
                pokemon_id: pokemon_id
            })

            return res.status(200).json(pokemonTeam)

        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async list(req: Request, res: Response) {


        try {
            const { team_id } = req.body
            const listPokemonTeam = new CreatePokemonTeamService()
            const pokemonTeam = await listPokemonTeam.list({ team_id: team_id })

            return res.status(200).json(pokemonTeam)

        } catch (err) {
            //return res.status(500).json({ error: 'Internal server error' });
            return res.status(500).json({ err });
        }
    }



}
export { CreatePokemonTeamController }