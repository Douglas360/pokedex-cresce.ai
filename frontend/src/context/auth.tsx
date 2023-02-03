import { ReactNode, createContext, useState, useEffect } from 'react'
import axios from 'axios';
import { api } from '../services/api'
import { toast } from 'react-toastify'

type AuthProviderProps = {
    children: ReactNode
}

type Pokemon = {
    name: string;
    url: string;
}

type Team = {
    team_id: number

}

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(true)

    const getPokemonData = async (pokemon: Pokemon) => {
        setLoading(false)
        try {
            const response = await axios.get(pokemon.url)

            setLoading(true)
            return response.data

        } catch (error) {
            setLoading(true)
            console.error(error)

        }

    }

    const getPokemon = async () => {
        setLoading(false)

        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')

            setLoading(true)

            return response.data.results as Pokemon[]

        } catch (error) {
            setLoading(false)
            console.error(error);
        }

    }

    const searchPokemon = async (searchPokemon: string) => {


        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)

            return response.data

        } catch (error) {
            console.error(error);
        }

    }

    const createTeam = async (TeamName: string, pokemonsTeam) => {
        setLoading(false)
        try {

            const teamResponse = await api.post('team/create', {
                name: TeamName
            })
            const teamId = teamResponse.data.id
            for (const pokemon of pokemonsTeam) {

                const response = await api.post('pokemon/create', {
                    name: pokemon.name,
                    type: pokemon.types[0].type.name,
                    abilities: pokemon.abilities[0].ability.name,
                    url_img: pokemon.sprites.front_default
                });

                console.log(pokemon.sprites.front_default)

                const pokemonId = response.data.id;

                await api.post('pokemonteam/create', {
                    team_id: teamId,
                    pokemon_id: pokemonId
                });
                console.log(pokemonId, teamId)
            }
            setLoading(true)
            toast.success('🦄 Time Cadastrado com sucesso! ', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {

            const alreadyExists = error.response.data.error
            if (alreadyExists === "Team already exist") {
                setLoading(true)
                toast.error('Já existe um time com esse nome!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                console.log(error)
            }

        }
    }

    const listTeam = async () => {
        try {
            const listTeam = await api.get('team/list')
            return listTeam.data
        } catch (error) {
            console.log(error)
        }
    }

    const pokemonTeam = async (team_id: Team) => {
        try {
            const response = await api.post('/pokemonteam/list', {
                team_id
            })

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTeam = async (team_id: Team) => {
        setLoading(false)

        try {
            await api.delete('/team/delete', {
                data: {
                    team_id
                }
            })
            setLoading(true)
            toast.success('🦄 Time Deletado com sucesso! ', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <AuthContext.Provider value={{
            getPokemon, searchPokemon, getPokemonData, createTeam, listTeam, pokemonTeam, deleteTeam, loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

