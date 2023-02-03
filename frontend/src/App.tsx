import './App.css';
import { AppRouter } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} />
      <AppRouter />
    </>
  );
}

export default App;
