import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/auth'
import { Dashboard } from '../pages/home/Dashboard'
import { Team } from '../pages/home/Team'
import { PokemonPage } from '../pages/home/Pokemon'
import { CreateTeam } from '../pages/home/CreateTeam'

export const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route path='/' element={<Dashboard />} />
          <Route path='/team' element={<Team />} />
          <Route path='/team/create' element={<CreateTeam />} />
          <Route path='/pokemon/:id' element={<PokemonPage />} />

        </Routes>
      </AuthProvider>
    </Router>




  )
}
