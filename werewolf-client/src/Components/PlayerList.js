import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  imageSize: {
    width: 'auto',
    height:'80%'
  }
}));

export default function PlayerList({ players }) {

  const classes = useStyles();

  const playerRows = players.map(player => PlayerRow(player, classes))
  return (
    <List>
      {playerRows}
    </List>
  )
}

const PlayerRow = (player, classes) => {
  const avatarNumber = Math.floor(player.id/100) +1
  const playerAvatarFile = `/Avatars/a${avatarNumber}.png`
  return (
    <Container>
      <ListItem>
        <ListItemAvatar>
          <Avatar classes={{img: classes.imageSize}} variant="square" alt={player.name} src={playerAvatarFile}/>
        </ListItemAvatar>
        <ListItemText id={player.id}
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {player.name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            player.status
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </Container>
  )
}