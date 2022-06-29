import React from 'react';
import {Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {DeleteOutline, StarBorder, StarBorderOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from '@mui/icons-material/Star';
const Cards = ({id, name, isBookmark, handleDelete, handleBookmark}) => {

    return (
        <Card elevation={2} sx={{minWidth:250}}>

            <CardHeader
                action={
                    <IconButton onClick={handleBookmark.bind(null, id)}>
                        <StarIcon sx={{color: isBookmark === true ?   'yellow' : 'black'}}/>
                    </IconButton>
                }
                title={name}
            />
            <CardContent sx={{ justifyContent: "center"}}>
                <iframe loading='eager' width={340}  height={270} frameBorder={2}  allowFullScreen src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${name}"}`}>

                </iframe>

            </CardContent>
            <CardActions>
                <Button onClick={handleDelete.bind(null, id)} startIcon={<DeleteOutline/>} size='small' fullWidth color='error' variant='contained'>Delete</Button>
            </CardActions>
        </Card>
    );
}
export default Cards;