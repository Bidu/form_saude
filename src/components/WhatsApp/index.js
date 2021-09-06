import React from 'react'

import WhatsAppIcon from "../../assets/img/svg-icons/whatsappIcon.svg";
import "./styles.css"

export default () => {
    
    return (
        <div className="WhatsApp"
            
               onClick={() =>
                    window
                        .open(
                            "https://api.whatsapp.com/send?phone=551133335555",
                            "_blank"
                        )
                        .focus()
                }
            >
                <span>
                    <img  className="WhatsIcon" src={WhatsAppIcon}></img>{" "}
                </span>
                

         
        </div>
    )
}