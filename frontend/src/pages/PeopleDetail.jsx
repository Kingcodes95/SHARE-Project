import BasicInfo from "../components/BasicInfo/BasicInfo";
import { useNavigate } from "react-router-dom";
import './Pages.css';

export default function PersonDetail() {

	const navigate = useNavigate()

	return(
		<>
			<button className="Home-button" onClick={() => navigate('/data')}>Home</button>
			<BasicInfo />
		</>
	)
}
