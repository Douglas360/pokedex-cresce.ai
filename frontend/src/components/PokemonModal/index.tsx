import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PokemonModal({ pokemonTeam, open, onClose }) {
  const classes = useStyles();
  console.log(pokemonTeam)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>

          <div className={classes.paper}>
            <h2 id="transition-modal-title">Time</h2>
            <List component="nav">
              {pokemonTeam.map(pokemon => (
                <ListItem key={pokemon.id}>
                  <ListItemText primary={pokemon.pokemon.name} />
                  <img src={pokemon.pokemon.url_img} alt={pokemon.pokemon.name} />
                </ListItem>
              ))}
            </List>
          </div>


        </Fade>
      </Modal>
    </div>
  );
}
