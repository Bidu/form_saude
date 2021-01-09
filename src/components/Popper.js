import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import InputLabel from "@material-ui/core/InputLabel";
const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    fontSize: '15px',
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TransitionsPopper(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <div>
     <InputLabel shrink id="gender" onClick={handleClick} style={{cursor: 'pointer'}}> {props.textLabel} </InputLabel>
     
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={30} onClick={handleClick}>
            <div className={classes.paper}>“Entidade de classe é um grupo que reúne e representa pessoas de uma determinada categoria profissional. Como por exemplo a OAB (Advogados) e o CREA (Engenheiros).”</div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}