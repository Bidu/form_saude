import React, {useState, useEffect} from 'react'
import Wrapper from "../../components/wrapper";
import Title from "../../components/Title";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Link, Redirect } from "react-router-dom";
import { Steps } from "../../components/steps";
import './sucesso.css'
import icon from './icon.svg'
import whatsappIcon from "./whatsappIcon.svg";

export default  () =>{
    useEffect(() => {
        localStorage.setItem("@bidu2/user", JSON.stringify([]))
        localStorage.setItem("@bidu2/saude/plan", JSON.stringify([]))
    }, [])
    
    const [redirect, setRedirect] = useState(false)




    return (
       
        <Wrapper>
          {redirect &&
                <Redirect to="/" />
             }
          <Title text="Plano de" bold="Saúde" className="title"/>
             <Steps step1={true} step2={true} step3={true} step4={true} step5={true} />
            <Grid container spacing={1} className="grid">
                <>
                    <Grid item xs={12}>
                      <img src={icon}></img>
                      <div className="actions">
                <br/>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="wpp--button"
                  onClick={() =>
                    window
                    .open(
                      "https://api.whatsapp.com/send?phone=551133335555",
                      "_blank"
                      )
                      .focus()
                    }
                >
                  <span className="wpp--fale"> FALE COM A GENTE &nbsp;</span>{" "}
                    <span className="wpp--icon">
                    <img src={whatsappIcon}></img>{" "}
                  </span>
                </Button>
              </div>
            </div>
                    <Title bold="Recebemos a sua solicitação"  myClass="subtitle"/>
                      <Title text={`Em breve um de nossos consultores entrará em contato.  Se preferir, você também pode realizar uma nova simulação.`}  myClass="subtitleText"/>
                     
                    </Grid>
                    <div className="actions">
                    <Button  className="btn-next" onClick={()=> setRedirect(true)} >
                      Simular outro plano
                    </Button>
                </div>
                    
                 </>
                 
                 </Grid>
                 
                
          </Wrapper>
    )
}