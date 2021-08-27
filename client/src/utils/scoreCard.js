import React from 'react'

import{
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@material-ui/core'
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import StarIcon from '@material-ui/icons/Star';

const ScoreCard = ({current}) => {
    return (
        <List className="scorecard">
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our score" secondary={current.store}
                className="rating" />
            </ListItem>
            <Divider variant="inset" component="li"/>
            
            <ListItem>
                <ListItemAvatar>
                    <Avatar><PersonIcon/></Avatar>
                </ListItemAvatar>
                <div>
                    {current.actors.map((item,index)=>(
                        <Chip key={index}
                        item={item}
                        label={item}
                        color="primary"
                        className="chip"
                        />
                    ))}
                </div>
                
            </ListItem>
            <Divider variant="inset" component="li"/>

            <ListItem>
                <ListItemAvatar>
                    <Avatar><MovieIcon/></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Director" secondary={current.director}
                className="rating" />
            </ListItem>
            
        </List>
    )
}

export default ScoreCard
