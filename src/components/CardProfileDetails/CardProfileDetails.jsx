import Button from "react-bootstrap/Button";


import Accordion from 'react-bootstrap/Accordion';
import "./CardProfileDetails.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const CardProfile = ({  icon,description,placeholder, type, name, handler, statusDisabled , statusFocus}) => {
  return (
    <div className="cardProfile">      
          <div className="datesUser">
            <div className="icon_description">{description}<img src={icon} alt="" /></div>
            <div className="valueDates"> <input readOnly ={statusDisabled} disabled={statusFocus} placeholder={placeholder} type={type} name={name} onChange={(e) => handler(e)}></input>
          </div>
         </div>
    </div>
   
  );
};
