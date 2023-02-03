import { Grid, Typography } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { SideBar } from '../global/SideBar';

export const PokemonPage = () => {
  const location = useLocation();
  const pokemon = location.state.pokemonData

  return (
    <div className="flex">
      <SideBar />

      <main className="w-full p-7 ">

        <div className="flex justify-center text-6xl bg-dark p-4 text-white rounded-t-2xl">
          <span>{pokemon.name}</span>
        </div>

        <div className='w-full h-4/5 bg-slate-300  mt-4 rounded-b-2xl '>
          <Grid container >

            <Grid item xs={6} style={{ display: 'flex' }}>

              <div className='bg-slate-400 rounded-lg flex justify-center m-2'>

                <img src={pokemon.sprites.front_default} alt={pokemon.name} width={300} />

              </div>


              <Grid >

                <Typography variant='h5'>Nome:{pokemon.name}</Typography>
                <Typography variant='h5'>Experiencia:{pokemon.base_experience}</Typography>
                <Typography variant='h5'>Peso:{pokemon.weight}</Typography>
                <Typography variant='h5'>Altura:{pokemon.height}</Typography>
                <Typography variant='h5'>Tipo:{pokemon.types[0].type.name}</Typography>

                <Typography variant='h5'>
                  Habilidades:
                  {pokemon.abilities.map((ability, index) => (

                    <span key={index} style={{ marginRight: '3px' }}>
                      {ability.ability.name},
                    </span>
                  ))}
                </Typography>




              </Grid>


            </Grid>

          </Grid>
        </div>





      </main>
    </div>
  );
}
