import { useNavigate } from "react-router-dom"

export default function Add_Client_Button() {

    const navigate = useNavigate()

    return(
       <div>
            <button onClick={() => navigate('/new_client')}>New Client</button> 
       </div>
    )

}