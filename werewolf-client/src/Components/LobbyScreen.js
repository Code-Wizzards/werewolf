import React, {useContext, useState, Keyboard} from 'react';
import { GameContext } from '../gameManagers/game-manager'
import { makeStyles } from '@material-ui/core/styles';
import PlayerList from './PlayerList'
import { Container, Box, Button, TextField, Paper, LinearProgress, Typography } from '@material-ui/core';
import { setPlayerStatus } from '../RestServer';
import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}))

const LobbyScreen = ({ players }) => {
  const [ statusInput, setStatusInput ] = useState('')
  const { playerId, gameId, startGame } = useContext(GameContext)

  const handleChange = (e) => {
    setStatusInput(e.target.value)
  }

  const handleKeyPress = (e) => {
    if(e.keyCode == 13){
      setPlayerStatus(playerId, gameId, statusInput)
      setStatusInput('')
      document.activeElement.blur();
    }
  }

  const classes = useStyles();

  return (
    <Container>

      <h2>Your game ID is {gameId}</h2>

      <Box p={1}>
        <Paper elevation={3}>
          <PlayerList players={players} />
        </Paper>
      </Box>

      <Box p={1} textAlign='center'>
      <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                Waiting for more players to join
              </Typography>
        <LinearProgress />
      </Box>
      <div className={classes.root}>
        <TextField value={statusInput} id="status-input" label="Set a Status" variant="outlined" onChange={handleChange} onKeyDown={handleKeyPress}/>
        <Button onClick={startGame} color="primary" variant="contained" >
          Start The Game
        </Button>
      </div>
    </Container>
  )
}

export default LobbyScreen