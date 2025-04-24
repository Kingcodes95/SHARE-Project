import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../DataCenter/data";
import "./BasicInfo.css";

export default function BasicInfo() {
	const { id } = useParams();
	const location = useLocation();
	const [user, setUser] = useState(location.state?.user ?? null);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		if (user) setFormData({ ...user });
	}, [user]);

	useEffect(() => {
		if (!user) {
			const found = data.find((p) => p.id === parseInt(id, 10));
			setUser(found ?? undefined);
		}
	}, [id, user]);

	if (user === undefined) {
		return (
			<div className="BasicInfo-container">
				<Link to="/data">← Back</Link>
				<p>User not found.</p>
			</div>
		);
	}

	if (!user) {
		return <p>Loading…</p>;
	}

	const schema = [
		{ label: "First Name", key: "firstName" },
		{ label: "Last Name", key: "lastName" },
		{ label: "Date of Birth", key: "DOB" },
		{ label: "Age", key: "Age" },
		{ label: "Ethnicity", key: "Ethnicitiy" },
		{ label: "Marital Status", key: "MaritalStatus" },
		{ label: "DL / ID #", key: "DL" },
		{ label: "Medicaid", key: "Medicaid" },
		{ label: "Medicare", key: "Medicare" },
		{ label: "Phone", key: "Phone" },
		{ label: "Address", key: "Address" },
		{ label: "Apt #", key: "APT" },
		{ label: "City", key: "City" },
		{ label: "State", key: "State" },
		{ label: "Zip", key: "Zip" },
		{ label: "Church Home", key: "Church" },
		{ label: "Registration Date", key: "RegistrationDate" },
	];

	const handleChange = (key) => (e) =>
		setFormData({ ...formData, [key]: e.target.value });

	const handleSave = () => {
		setUser({ ...formData });
		setEditMode(false);
	};

	const handleCancel = () => {
		setFormData({ ...user });
		setEditMode(false);
	};

	return (
		<div className="BasicInfo-container">
			<div className="BasicInfo-actions">
			</div>
			<div className="BasicInfo-content-container">
				{schema.map(({ label, key }) => {
					const value = editMode ? formData[key] : user[key];
					if (value === undefined || value === null) return null;
					return (
						<div className="BasicInfo-field" key={key}>
							<span className="BasicInfo-term">{label}:</span>
							{editMode ? (
								<input value={value} onChange={handleChange(key)} />
							) : (
								<span className="BasicInfo-desc">{value}</span>
							)}
						</div>
					);
				})}
                
			</div>
			{editMode && (
				<div className="BasicInfo-actions">
					<button onClick={handleSave}>Save</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
			)}
            <div className="edit-button-div">
            {!editMode && <button onClick={() => setEditMode(true)} className="BasicInfo-edit-button">Update</button>}
            </div>
		</div>
        
	);
}
