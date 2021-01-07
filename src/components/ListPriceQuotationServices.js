// Componente usado para dinamizar icones de cotação

import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default ({ cotacao }) => {

  const  firstWord = (text)  => {
    var loweredText = text.toLowerCase().replace(/[ ]\W/g, "")

    var words = loweredText.split(" ")

    for (var a = 0; a < words.length; a++) {
        var w = words[a]
       
          var firstLetter = w[0]
          w = firstLetter.toUpperCase() 
          words[a] = w;
        
       
    }
    return words.join("/");
}

function titleize(text) {
  var loweredText = text.toLowerCase();
  var words = loweredText.split(" ");
  for (var a = 0; a < words.length; a++) {
      var w = words[a];

      var firstLetter = w[0];
      w = firstLetter.toUpperCase() + w.slice(1);

      words[a] = w;
  }
  return words.join(" ");
}

  return (
    <div>
      <table className="table-body">
        <tbody>
          <tr>
            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/participation.svg")}`}
                />
              </figure>
              <br />
              {cotacao.coparticipacao == true ? "Com Coparticipação" : "Sem Coparticipação"}
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/brazil.svg")}`}
                  
                />
              </figure>
              <br />
            {titleize(cotacao.abrangencia)}
            </td>

            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/bed-outline.svg")}`}
                />
              </figure>
              <br />
              {titleize(cotacao.acomodacao)}
            </td>
            <td className="coberturas">
              <figure className="icon">
                <img
                  alt="hdmi"
                  src={`${require("../assets/img/svg-icons/hospital.svg")}`}
                />
              </figure>
              <br />
              Segmentação {firstWord(cotacao.segmentacao)}
            </td>
          </tr>

          {/* <tr>
          <td>
              {cotacao.segmentacao == "Ambulatorial + Hospitalar com Obstetrícia"? 
                (                
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )              
              }
            </td>
            <td>
              {cotacao.segmentacao == "Ambulatorial + Hospitalar com Obstetrícia" ||
              cotacao.segmentacao == "Hospitalar com Obstetrícia" ? 
                (                
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )              
              }
            </td>
            <td>
              {cotacao.abrangencia == "Nacional" ? 
                (                
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )              
              }
            </td>
            <td>
              {cotacao.acomodacao == "Coletiva" ? 
                (                
                  <CheckCircleIcon color="primary" />
                ) : (
                  <CancelIcon color="secondary" />
                )              
              }
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
