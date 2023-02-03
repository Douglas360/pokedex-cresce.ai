import { Request, Response } from "express";
import { DeleteTeamService } from "../services/DeleteTeamService";

class DeleteTeamController {
    async delete(req: Request, res: Response) {
        try {
            const { team_id } = req.body

            const deleteTeam = new DeleteTeamService()

            await deleteTeam.delete({ team_id })

            return res.status(200).json({ message: "Team removed successfully" });

        } catch (error) {
            return res.status(500).json({ error });
        }

    }

} export { DeleteTeamController }