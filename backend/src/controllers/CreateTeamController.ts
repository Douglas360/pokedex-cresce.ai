import { Request, Response } from 'express'
import { CreateTeamService } from "../services/CreateTeamService"

class CreateTeamController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body

            const createTeam = new CreateTeamService()

            const team = await createTeam.create({
                name: name
            })

            return res.status(200).json(team)

        } catch (err) {
            if (err instanceof Error && err.message === 'Team already exist') {
                return res.status(400).json({ error: 'Team already exist' });
            }


            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async list(req: Request, res: Response) {


        try {
            const listPokemonTeam = new CreateTeamService()
            const pokemonTeam = await listPokemonTeam.list()

            return res.status(200).json(pokemonTeam)

        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }



}
export { CreateTeamController }