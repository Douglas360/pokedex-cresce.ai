import Router from 'express'

import { CreateTeamController } from './controllers/CreateTeamController'
import { CreatePokemonController } from './controllers/CreatePokemonController'
import { CreatePokemonTeamController } from './controllers/CreatePokemonTeamController'
import { DeleteTeamController } from './controllers/DeleteTeamController'

const router = Router()

router.post('/team/create', new CreateTeamController().create)
router.get('/team/list', new CreateTeamController().list)
router.delete('/team/delete', new DeleteTeamController().delete)
router.post('/pokemon/create', new CreatePokemonController().create)
router.post('/pokemonteam/create', new CreatePokemonTeamController().create)
router.post('/pokemonteam/list', new CreatePokemonTeamController().list)



export { router }
