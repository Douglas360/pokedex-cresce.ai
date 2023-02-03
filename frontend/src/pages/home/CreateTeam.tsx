import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import { useAuth } from "../../context/useAuth";
import { SideBar } from "../global/SideBar"
import { Loader } from "../../components/Loader"
import { toast } from "react-toastify";

export const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedPokemon, setSearchedPokemon] = useState(null);


    const { searchPokemon, createTeam, loading } = useAuth()

    //Função de busca de Pokemon
    const handleSearchPokemon = async (e) => {
        e.preventDefault();
        try {

            const response = await searchPokemon(searchTerm)
            // Verificar se o Pokemon foi encontrado
            if (response === undefined) {
                setSearchedPokemon("Not found")
            } else {
                setSearchedPokemon(response);
            }

        } catch (error) {
            console.error(error);
        }
    };

    // Função de criação de time
    const handleCreateTeam = async (e) => {
        e.preventDefault();

        // Verificar se o nome do time está vazio
        if (teamName === '') {
            return toast.error('Digite o nome do time', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        // Verificar se há pelo menos 1 Pokemon na lista
        if (pokemonList.length <= 0) {
            return toast.error('Adicione pelo menos 1 pokemon', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        try {
            createTeam(teamName, pokemonList)
            setTeamName("")
        } catch (error) {
            console.error(error);
        }
    };

    // Função de validações ao clicar em Adicionar
    const handleClickValidations = (searchedPokemon) => {

        // Verificar se já existem 6 Pokemons no time
        if (pokemonList.length >= 6) {
            return toast.error('Time completo, clique em CRIAR', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        // Verificar se o Pokemon já existe na lista
        if (pokemonList.find(p => p.id === searchedPokemon.id)) {
            return toast.error('Esse Pokemon ja existe em seu time', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        setPokemonList([...pokemonList, searchedPokemon])
    }

    return (
        <div className="flex">
            <SideBar />
            <main className="content p-7 w-full">
                <div className="flex justify-center text-3xl">
                    <span>Criar Poke Time</span>
                </div>
                {!loading &&
                    <Loader />}

                <form onSubmit={handleCreateTeam}>
                    <Box
                        display={'grid'}>
                        <TextField
                            variant="filled"
                            type="text"
                            label="Nome do time"
                            value={teamName}
                            onChange={((e) => setTeamName(e.target.value))}
                            inputProps={{ maxLength: 50 }} />
                    </Box>
                    <div className="flex justify-center mt-3">
                        <Button size="small" variant="outlined" type="submit">Criar</Button>
                    </div>
                </form>

                <div className="w-full h-3/4 flex mt-5" id="pokemonList ">
                    <Grid container spacing={1}>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="search"
                                label="Procure seu pokemon"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchPokemon(e);
                                    }
                                }}
                                sx={{ marginBottom: '20px' }}
                            />

                            {searchedPokemon === "Not found" ? (
                                <div>Pokemon encontrado...</div>
                            ) : searchedPokemon ? (
                                <PokemonCard
                                    pokemonData={searchedPokemon}
                                    widthImg={200}
                                    btn={"Adicionar ao time"}
                                    customHandleClick={() => handleClickValidations(searchedPokemon)}
                                />
                            ) : null}

                        </Grid>

                        <Grid item xs={6}>

                            <Grid container spacing={0.5}>

                                {pokemonList.map((pokemon, index) => (
                                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }} key={index}>
                                        <Card sx={{ width: "120px" }}>

                                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#cbd5e1" }}>
                                                <img src={pokemon.sprites.front_default} alt='' width={100} />
                                                <Typography component="div" variant='body2' sx={{ display: 'flex', justifyContent: 'center', maxWidth: '12ch', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {pokemon.name}
                                                </Typography>


                                            </CardContent>

                                            <CardActions sx={{ backgroundColor: "#081A51", display: 'flex', justifyContent: 'center' }}>
                                                <Button size="small" style={{ padding: '2px 6px', fontSize: '10px' }} variant="outlined"
                                                    onClick={() => setPokemonList(pokemonList.filter(p => p.name !== pokemon.name))}>Remover</Button>

                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}


                            </Grid>

                        </Grid>

                    </Grid>


                </div>

            </main>

        </div>
    )
}
