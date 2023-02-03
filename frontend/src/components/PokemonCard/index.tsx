import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PokemonCard({ pokemonData, widthImg, btn, customHandleClick }) {

    return (
        <Card sx={{}}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#cbd5e1" }}>
                <img src={pokemonData.sprites.front_default} alt='' width={widthImg} />
                <Typography component="div" variant='body2' sx={{ display: 'flex', justifyContent: 'center', maxWidth: '12ch', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pokemonData.name}
                </Typography>


            </CardContent>

            <CardActions sx={{ backgroundColor: "#081A51", display: 'flex', justifyContent: 'center' }}>
                <Button size="small" style={{ padding: '2px 6px', fontSize: '10px' }} variant="outlined"
                    onClick={customHandleClick}>{btn}</Button>

            </CardActions>
        </Card>
    );
}