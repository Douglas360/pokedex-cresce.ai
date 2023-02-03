import prismaClient from "../prisma"

interface TeamRequest {
    name: string
}
class CreateTeamService {
    async create({ name }: TeamRequest) {

        const teamAlreadyExists = await prismaClient.team.findFirst({
            where: {
                name: name
            }
        })
        if (teamAlreadyExists) {
            throw new Error("Team already exist")
        }
        const team = await prismaClient.team.create({
            data: {
                name: name
            }
        })
       
        return team
    }

    async list() {
        const pokemonTeams = await prismaClient.team.findMany()
        return pokemonTeams
    }


} export { CreateTeamService }