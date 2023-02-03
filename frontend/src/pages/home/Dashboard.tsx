import { SideBar } from "../global/SideBar"
import { BsSearch } from 'react-icons/bs'
import PokemonCard from "../../components/PokemonCard"
import { Grid } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "../../context/useAuth"
import { AppPagination } from "../../components/Pagination"
import { Loader } from "../../components/Loader"
import { FaSadCry } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"


export const Dashboard = () => {
    const { getPokemon, getPokemonData, loading } = useAuth()
    const [pokemon, setPokemon] = useState([])
    const [pokemonData, setPokemonData] = useState([])
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({

        from: 0,
        to: 32
    })

    const navigate = useNavigate()

    const handlePageChange = (e, page) => {
        const from = (page - 1) * 32;
        const to = (page - 1) * 32 + 32;

        setPagination({ ...pagination, from: from, to: to });
    };

    const listPokemon = async () => {
        try {

            // Busca a lista de Pokémon
            const response = await getPokemon()

            // Atualiza o estado com a lista de Pokémon
            setPokemon(response)

            // Cria promessas para obter os dados de cada Pokémon
            const promises = response.map(async (pokemon) => {

                // Obtém os dados do Pokémon
                const pokemonData = await getPokemonData(pokemon);

                // Retorna o Pokémon com seus dados
                return {
                    ...pokemon,
                    ...pokemonData
                };

            })

            // Espera pelo término de todas as promessas
            const responseData = await Promise.all(promises)

            // Atualiza o estado com os dados dos Pokémon
            setPokemonData(responseData)

        } catch (error) {
            console.log("Um erro")
        }
    }

    const handleChange = (e) => {

        setSearch(e.target.value)
        searchFunction()
    }

    const searchFunction = () => {
        return pokemonData.filter((pokemons) => {
            return pokemons.name.toLowerCase().includes(search.toLowerCase());

        });
    }

    const handleClick = ((pokemonData) => {

        navigate('/pokemon/' + pokemonData.name, { state: { pokemonData } });

    })

    useEffect(() => {

        listPokemon()

    }, [])

    return (

        <div className="flex">
            <SideBar />

            <main className="w-full p-7 ">

                <div className="flex justify-center text-3xl">
                    <span>Lista de Pokemons</span>
                </div>



                <Grid container spacing={0.5}>
                    <Grid item xs={12} >
                        <div className="flex items-center rounded-md bg-slate-200   mt-6 px-4 py-2 ">
                            <BsSearch className='text-dark text-lg block float-left cursor-pointer mr-2' />
                            <input type="search" placeholder="Pesquise" className="text-base bg-transparent w-full text-dark focus:outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </Grid>

                    {searchFunction().length === 0 && search.length > 0 && (
                        <div className="w-full flex flex-col items-center text-2xl">Pokemon não encontrado...<FaSadCry /> </div>
                    )}

                    {searchFunction().slice(pagination.from, pagination.to).map((pokemons, index) => (

                        <Grid item xs={12} sm={6} md={4} lg={1.5} xl={1.5} key={index}>

                            <PokemonCard
                                pokemonData={pokemons}
                                widthImg={100}
                                btn={"Habilidades"}
                                customHandleClick={() => handleClick(pokemons)}
                            />
                        </Grid>

                    ))}

                </Grid>

                {pokemon.length > 0 && searchFunction().length > 0 &&
                    <AppPagination
                        count={pokemon.length}
                        onPageChange={handlePageChange}

                    />}

                {!loading &&
                    <Loader />}


            </main>
        </div>
    )

}
