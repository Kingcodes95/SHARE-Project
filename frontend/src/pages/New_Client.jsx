import { useNavigate } from "react-router-dom";
import Client_Form from "../components/Add_Client_Button/Client_Form";

export default function New_Client() {

    const navigate = useNavigate()

    return(
        <div>
            <button className="Home-button" onClick={() => navigate('/data')}>Home</button>
            <Client_Form />
        </div>
    );
}