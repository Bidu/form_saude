import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import  './drawer.css'
const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const [hospital, setHospital] = React.useState([])
  const [orderValuePlan, setOrderValuePlan] = React.useState("")
  const fixedOptions = [];
  const [value, setValue] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

 
  const toggleDrawer = (anchor, open) => (event) => {
    
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  
  useEffect((e)=>{
    if(props.pushHospital)
        setHospital(props.pushHospital)
  },[props])


  const open = Boolean(anchorEl);

  const filterOrder = () => {
      
      toggleDrawer("left", false);
      
      if(orderValuePlan != "" && value.length == 0)
      {
        props.filterOrder(orderValuePlan, null)
      }
      else if(orderValuePlan == "" && value.length > 0) {
        props.filterOrder(null, value)
      }
      else if(orderValuePlan != "" && value.length > 0){
        props.filterOrder(orderValuePlan, value)
      }
      else{
        alert("É preciso selecionar para filtrar")
      }
      
  }
  const handleChange = (event) => {
    setOrderValuePlan(event.target.value);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      
      <List>
        
           <ListItem  >
           <FormControl component="fieldset">
          <FormLabel component="legend">Ordernar Valor</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={orderValuePlan} onChange={handleChange}>
            <FormControlLabel value="0" control={<Radio />} label="Maior" />
            <FormControlLabel value="1" control={<Radio />} label="Menor" />
          </RadioGroup>
        </FormControl>
          </ListItem>
        
      </List>
      <Divider />
      <List>
          <ListItem  >
            <FormLabel component="legend">Selecionar Hospitais</FormLabel>
          </ListItem>
          <listItem>
          <FormControl component="fieldset" className="price-quote"> 
                      <Autocomplete
                            multiple
                            value={value}
                            id="hospital"
                            name="hospital"
                            disableCloseOnSelect
                            options={hospital}
                            renderTags={(tagValue, getTagProps) =>
                              tagValue.map((option, index) => (
                                <Chip
                                  label={option.prestador}
                                  {...getTagProps({ index })}
                                  disabled={fixedOptions.indexOf(option) !== -1}
                                />
                              ))
                            }
                            getOptionLabel={ (option) => 
                              `${option.prestador} - ${option.estado}`
                            }
                            renderInput={(params) => 
                            <TextField {...params}  style={{marginTop:0}} className="text-autocomplete-filter-hospital" margin="normal" />}
                            onChange={(event, newValue) => {
                              console.log(newValue)
                              setValue([
                                ...fixedOptions,
                                ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                              ]);


                            }}
                       />

             </FormControl>
          </listItem>
      </List>

            
      <List className="button-submit-drawer">
        
           <ListItem>
             <FormControl component="fieldset" onClick={( orderValuePlan != ""  || value.length > 0) && toggleDrawer("left", false) }>
              <Button variant="contained" color="primary" disableElevation 
                                          onClick={filterOrder} 
                                          startIcon={<FilterListOutlinedIcon />}
                                          >
                  Aplicar Filtro
              </Button>
            </FormControl>
          </ListItem>
        
      </List>
    </div>
  );

  return (
    <div>
      
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>Filtros <FilterListOutlinedIcon/></Button>
          <SwipeableDrawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
      
    </div>
  );
}