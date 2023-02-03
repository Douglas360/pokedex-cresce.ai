import prismaClient from "../prisma"

interface TeamRequest {
    team_id: number
}
class DeleteTeamService {
    async delete({ team_id }: TeamRequest) {

        await prismaClient.teamPokemon.delete({
            where: {
                team_id: team_id
            }
        })

        await prismaClient.team.delete({
            where: {
                id: team_id
            }
        })

    }


} export { DeleteTeamService }