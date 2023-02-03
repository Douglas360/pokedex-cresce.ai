import prismaClient from "../prisma"

interface PokemonRequest {
    name: string
    type: string
    abilities: string
    url_img: string
}
class CreatePokemonService {
    async create({ name, type, abilities, url_img }: PokemonRequest) {

        const pokemonAlreadyExists = await prismaClient.pokemon.findFirst({
            where: {
                name: name
            }
        })
        if (pokemonAlreadyExists) {
            return pokemonAlreadyExists
        }
        const pokemon = await prismaClient.pokemon.create({
            data: {
                name: name,
                type: type,
                abilities: abilities,
                url_img: url_img
            }
        })


        return pokemon
    }


} export { CreatePokemonService }