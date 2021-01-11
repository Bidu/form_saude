import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import Typography from '@material-ui/core/Typography';
import './dependents.css'

const useStyles = makeStyles({
    btn:{
        background: '#00FEFD',
        color: '#001447',
        marginTop: "15px",
        borderRadius: "60px",

    },
    btnClose:{
      background: '#CCC',
      color: '#001447',
      marginTop: "15px",
      borderRadius: "60px",       
  },
  btnAdd: {
    borderRadius: "50%",
    background: "#00FEFD",
    color: '#001447',
    
  }


})

export default function DialogDependents(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    nome: "",
    nascimento: ""
  })
 
  const [dependents, setDependents] = React.useState([])
  

  const classes = useStyles()

  useEffect(() => {
      
       props.setDependents(dependents)
    
  
  }, [dependents])


  const handleClickOpen = () => {
    setOpen(true);
    const dependentsStorage = JSON.parse(localStorage.getItem("@bidu2/user"))

    if(dependentsStorage.dependents.length > 0 && dependents.length == 0)
        setDependents(dependentsStorage.dependents)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addDependent = () => {
    // setDependents.push(form)
    setOpen(false);
  }
  const calcIdade = (ano_aniversario, mes_aniversario, dia_aniversario)  => {
        var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),

        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}

  const addDependents = async () => {
    if(
      form.nome != "" &&
      form.nome != undefined &&
      form.nascimento != "" &&
      form.nascimento != undefined
       ){
          let dtNascimento = new Date(form.nascimento)
          let now = new Date()
          now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
          let id = dependents.length + 1
          if(form.nascimento > "1920-01-01" && form.nascimento <= now ){
              await setDependents([...dependents, {
                id: id,
                nome: form.nome,
                nascimento: form.nascimento,
                idade: calcIdade(dtNascimento.getFullYear(), dtNascimento.getMonth() + 1, dtNascimento.getDate())
              }])
            }
            else{
              alert("Data inválida")
            }


          setForm({
            nome: "",
            nascimento: ""
          })
          document.querySelector("#nome").focus()
        
        }
        else{
          alert("Nome e data de nascimento são obrigatorias")
          document.querySelector("#nome").focus()
        }
  }
  

  const handleInputChange = e => {
    const {name, value} = e.target
      setForm({...form, [name]: value})
}

  const purgeDependents = (obj) =>{
    setDependents(dependents.filter((e) => e != obj)) 
  }

  

  return (
    <div>
      <Button variant="outlined" color="primary" className={classes.btn} onClick={handleClickOpen}>
        {props.titleName}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title" fullWidth={true} maxWidth={'sm'} style={{borderRadius: "20px"}}>
        <DialogTitle id="max-width-dialog-title">Preencha as informações abaixo</DialogTitle>
        <DialogContent>
        <InputLabel>Nome *</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            id="nome"
            type="text"
            value={form.nome}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            fullWidth={true}
            maxWidth="lg"
            inputProps={{
              autoComplete:"off"
            }}
          />
          </DialogContent>
          <DialogContent>
          <InputLabel>Data de nascimento *</InputLabel>
           <TextField
            margin="dense"
            id="nascimento"
            value={form.nascimento}
            name="nascimento"
            type="date"
            inputProps={{max: "9999-12-12", min: "1920-01-01",  autoComplete:"off"}}
            fullWidth={true}
            maxWidth="lg"
            onChange={handleInputChange}
            onBlur={handleInputChange}
          />
          </DialogContent>
          <DialogContent className="button-add-dependents">
          <Button onClick={addDependents} variant="outlined" color="primary" className={classes.btn}>
           {dependents.length == 0 ? "Adicionar" : "Adicionar outro"}
          </Button>
          </DialogContent>
          <DialogContent>
          { dependents.length > 0 &&
          <>
            <Typography variant="h6" className={classes.title}>
              Lista de dependentes ({dependents.length}): 
            </Typography>
            {dependents.map((e, key) => (
              <List>
               
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonOutlinedIcon  />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${e.nome}, ${e.idade} ${e.idade > 1 ? "anos de idade": "ano de idade"}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton key={key}  aria-label="delete" onClick={() => purgeDependents(e)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
            ))}
            </>
          }</DialogContent>
         
         
        <DialogActions>
          <Button onClick={handleClose}  color="primary" className={classes.btnClose}>
            {dependents.length > 0 ? "Concluir" : "Fechar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}