import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

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

})


export default function DataGridTable(props) {

const [rows, setRows] = React.useState(props.rows);
const [deletedRows, setDeletedRows] =  React.useState([]);
const classes = useStyles()
const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nome', headerName: 'Nome', width: 500 },
  {
    field: 'idade',
    headerName: 'idade',
    type: 'text',
    width: 70,
  },
];



    // const rows = props.rows


    React.useEffect(() => {
      setRows(props.rows)
    }, [props])
    
    const handleRowSelection = (e) => {

      if( deletedRows.length > 0 && deletedRows.filter((val) => val != e[0] ).length > 0 )
      {
        let rows = deletedRows.filter((val) => val != e[0] )
        // console.log('rows', rows)
        setDeletedRows([...rows, e[0]]);
      }
      else{
        setDeletedRows([...deletedRows,  e[0] ] )
      }
      
      
    };
    
    const handlePurge = () => {
      console.log('par', deletedRows)
      props.purgeFather(deletedRows)
      setRows(
        rows.filter((r) => deletedRows.filter((sr) => sr === r.id).length < 1)
      );
      
    };

  return (
    <div style={{ height: 280, width: '100%' }}>
      {/* { deletedRows.length > 0 &&
      <Button onClick={handlePurge}  color="primary" className={classes.btnClose}>
          Remover
      </Button>
      } */}
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection onSelectionChange={newSelection => {
            handleRowSelection(newSelection.rowIds)

            // **** The following line breaks the page upon selection **** 
            // currentlySelected(newSelection)
          }} />
    </div>
  );
}