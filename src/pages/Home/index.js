import React, {useState, useEffect} from 'react'
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import './inicio.css'

export default  () =>{
    useEffect(() => {
        localStorage.setItem("@bidu2/user", JSON.stringify([]))
        localStorage.setItem("@bidu2/brufselect", JSON.stringify([]))
        localStorage.setItem("@bidu2/saude/plan", JSON.stringify([]))
    }, [])
    
    const [voce, setVoce] = useState(false)
    const [familia, setFamilia] = useState(false)
    const [empresa, setEmpresa] = useState(false)




    return (
       
        <Wrapper>
             {voce &&
                <Redirect to="/sobre-voce" />
             }
              {empresa &&
                <Redirect to="/sobre-a-empresa" />
             }
            <Title text="Plano de" bold="Saúde" className="title"/>
                { familia == false &&
            <Grid container spacing={3} className="grid">
                <>
                    <Grid item xs={12}>
                    <Title text="Que tipo de plano você procura?"  myClass="subtitleHome"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" className="buttonHome" onClick={() => setVoce(true)}>
                            PARA VOCÊ
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" className="buttonHome"  onClick={() => setFamilia(true)}>
                            PARA SUA FAMÍLIA
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" className="buttonHome"  onClick={() => setEmpresa(true)}>
                            PARA SUA EMPRESA
                        </Button>
                    </Grid>
                 </>
                 
                 </Grid>
                 }
                
                 {
                     familia &&
                     <Grid container spacing={3} className="gridFamily">
                            <Grid item xs={12} >
                                <Title text="Para" bold="sua família"  myClass="subtitleFamily"/>
                                <Title  bold="Você possui CNPJ?"  myClass="subtitleFamilyCnpj"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="outlined" className="buttonFamily" onClick={() => setEmpresa(true)}>
                                    Sim
                                </Button>
                                <Button variant="outlined" className="buttonFamily"  onClick={() => setVoce(true)}>
                                    Não
                                </Button>
                            </Grid>
                           
                        </Grid>
                 }
                
          </Wrapper>
    )
}