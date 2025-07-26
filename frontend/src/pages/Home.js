import { Grid, Card, CardMedia } from '@mui/material';
import gridImg1 from './../resources/images/stick_dash_home.jpg'
import gridImg2 from './../resources/images/white_board_people_sketch.jpg'
import gridImg3 from './../resources/images/white_board_sketch.jpg'
import gridImg4 from './../resources/images/whiteboard_laptop.jpg'

const images = [
    {
      src: gridImg1,
    },
    {
      src: gridImg2,
    },
    {
      src: gridImg3,
    },
    {
      src: gridImg4,
    },
];
export const Home = () => {
    return (
        <div>
            <Grid container spacing={4} style={{ padding: 20 }}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                        <Card>
                            <CardMedia
                            component="img"
                            height="380"
                            image={image.src}
                            alt={`Image ${index + 1}`}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
