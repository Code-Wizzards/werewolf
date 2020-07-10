import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PlayerList from './PlayerList'
import { Container, Box, Button, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function LobbyScreen({ players }) {
  return (
    <Container alignItems="center">

      <PlayerList players={players} />
      <Button color="primary" variant="contained" align="center">
        Start The Game
      </Button>

      <Box>
        <Box p={3}>
          <TextField id="name-input" label="Set a Status" variant="outlined" />
          <Button color="secondary" variant="contained" align="center" >
            Set
        </Button>
        </Box>
      </Box>

    </Container>
  )
}