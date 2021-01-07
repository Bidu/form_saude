import React, {useEffect, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';
import './termosuso.css'

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
  }));

  
export default (props) =>{
    const [checked, setChecked] = React.useState(false)
  

      const classes = useStyles();
      const [open, setOpen] = React.useState(false);
      const dialogRef = useRef(null);
      const activeSlideRef = useRef(null);
      const [fullWidth, setFullWidth] = React.useState(true);

      const [maxWidth, setMaxWidth] = React.useState('lg');



      useEffect(() => {
        if(open){
          let a = window.document.querySelector("iframe")
          a = a
          console.log(a, "a")
        }
        
      
      
      }, [open])
        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleMaxWidthChange = (event) => {
            setMaxWidth(event.target.value);
        };

        const handleFullWidthChange = (event) => {
            setFullWidth(event.target.checked);
        };
        const handleChange = (event) => {
            setChecked(event.target.checked);
            props.optinChange(checked)
        };
    return (
        <div>
       
        <p >   
        <Checkbox 
            color="primary"
            onChange={handleChange}
            value={checked}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />Li e concordo com os <bold/> 
            <a class="termos-uso" href="https://www.bidu.com.br/termos-de-uso/" 
            target="blank"
               ><u>Termos de uso</u></a> e  &nbsp;
            <a  class="termos-uso"  href="https://www.bidu.com.br/politica-de-privacidade/" 
            target="blank"><u>Política de Privacidade</u></a>
            </p>

            <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
            
            
      >
        <DialogContent className="dialog-iframe"  >
          <DialogContentText>
              <iframe
              
           

            src="https://www.bidu.com.br/termos-de-uso/" id="iframe" style={{width: '100%', height:'800px'}} 
              title="Privacidade"></iframe>
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}