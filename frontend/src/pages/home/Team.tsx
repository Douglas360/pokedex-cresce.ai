import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Loader } from "../../components/Loader"
import PokemonModal from "../../components/PokemonModal"
import { useAuth } from "../../context/useAuth"
import { SideBar } from "../global/SideBar"

export const Team = () => {
  const { listTeam, pokemonTeam, deleteTeam, loading } = useAuth()
  const [pokemonTeams, setPokemonTeams] = useState([])
  const [selectedTeam, setselectedTeam] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const getTeam = async () => {
    try {
      const response = await listTeam()
      setPokemonTeams(response)

      //console.log(response)
    } catch (error) {
      console.log("Erro na função getTeam" + error)
    }
  }

  const handleModalOpen = async (pokemonData) => {

    try {
      const response = await pokemonTeam(pokemonData.id)

      setselectedTeam(response)
      setOpenModal(true)
      //console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  const handleModalClose = async () => {
    setOpenModal(false)
  }

  const handleDeleteTeam = async (pokemonData) => {
    if (!window.confirm('Tem certeza que vai excluir esse time?')) {
      return;
    }
    try {
      await deleteTeam(pokemonData.id)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getTeam()
  }, [deleteTeam])


  return (
    <div className="flex">
      <SideBar />
      <main className="content p-7 w-full">
        <div className="flex justify-center text-3xl">
          <span>Poke Times</span>
        </div>

        {!loading &&
          <Loader />
        }


        <Grid container spacing={0.5}>

          {pokemonTeams.map((pokemonData, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <Card sx={{}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#cbd5e1" }}>

                  <Typography component="div" variant='body2' sx={{ display: 'flex', justifyContent: 'center', maxWidth: '12ch', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pokemonData.name}
                  </Typography>


                </CardContent>

                <CardActions sx={{ backgroundColor: "#081A51", display: 'flex', justifyContent: 'center' }}>
                  <Button size="small" style={{ padding: '2px 6px', fontSize: '10px' }} variant="outlined"
                    onClick={() => handleModalOpen(pokemonData)}
                  >ABRIR</Button>
                  <Button size="small" style={{ padding: '2px 6px', fontSize: '10px' }} variant="outlined"
                    onClick={() => handleDeleteTeam(pokemonData)}
                  >DELETAR</Button>

                </CardActions>
              </Card>
            </Grid>

          ))
          }
        </Grid>

        {openModal &&
          <PokemonModal
            open={openModal}
            onClose={handleModalClose}
            pokemonTeam={selectedTeam} />
        }




      </main>
    </div>
  )
}
