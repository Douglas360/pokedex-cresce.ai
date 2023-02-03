import prismaClient from "../prisma"

interface PokemonTeamRequest {
    team_id: number,
    pokemon_id: number
}

interface ListPokemonRequest{
    team_id:number
}
class CreatePokemonTeamService {
    async create({ team_id, pokemon_id }: PokemonTeamRequest) {

        const team = await prismaClient.teamPokemon.create({
            data: {
                team_id: team_id,
                pokemon_id: pokemon_id
            }
        })
        console.log(pokemon_id)
        return team
    }

    async list({ team_id }: ListPokemonRequest) {
        const listPokemonTeams = await prismaClient.teamPokemon.findMany({
            where: { 
                team_id: team_id
            },
            include:{
                pokemon:true
            }
           
        })
       
        return listPokemonTeams
    }


} export { CreatePokemonTeamService }