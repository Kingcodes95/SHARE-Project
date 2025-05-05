import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import "./Client_Form.css";

export default function Client_Form() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	function getCurrentDate() {
		const now = new Date();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const year = now.getFullYear();
		return `${month}-${day}-${year}`;
	}

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		DOB: "",
		Age: null,
		Ethnicity: null,
		Marital_Status: null,
		DL: null,
		Medicaid: null,
		Medicare: null,
		Phone: null,
		Address: null,
		APT: null,
		City: null,
		State: null,
		Zip: null,
		Church: null,
		Registration_Date: getCurrentDate(),
		last_pick_up: null,
	});

	const handleChange = (key) => (e) => {
		const value = e.target.value;
		const updated = { ...formData };

		if (key === "DOB") {
			updated.Age = calculateAge(value);
		}

		updated[key] = value === "" ? null : value;
		setFormData(updated);
	};

	const calculateAge = (dob) => {
		if (!dob) return null;
		const birthDate = new Date(dob);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age.toString();
	};

	const formatDOB = (dob) => {
		if (!dob) return null;
		const [year, month, day] = dob.split("-");
		return `${month}/${day}/${year}`;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			...formData,
			DOB: formatDOB(formData.DOB),
			Age: calculateAge(formData.DOB),
		};

		try {
			const response = await fetch(
				"http://localhost:8000/clients/create_client",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) throw new Error("Failed to submit client");

			const newClient = await response.json();
			queryClient.setQueryData(["clients"], (oldData = []) => [
				...oldData,
				newClient,
			]);
			navigate("/data");
		} catch (err) {
			console.error(err);
			alert("Error Submitting a new client");
		}
	};

	return (
		<div className="Client-Form-Page">
			<form className="Client-Form-Container" onSubmit={handleSubmit}>
				<div>
					<h3>First Name:</h3>
					<input
						type="text"
						value={formData.firstName}
						onChange={handleChange("firstName")}
						required
					/>
				</div>
				<div>
					<h3>Last Name:</h3>
					<input
						type="text"
						value={formData.lastName}
						onChange={handleChange("lastName")}
						required
					/>
				</div>
				<div>
					<h3>Date of Birth:</h3>
					<input
						type="date"
						value={formData.DOB || ""}
						onChange={handleChange("DOB")}
						required
					/>
				</div>
				<div>
					<h3>Ethnicity:</h3>
					<select
						value={formData.Ethnicity || ""}
						onChange={handleChange("Ethnicity")}>
						<option value="">Select Ethnicity</option>
						<option value="Hispanic / Latino">Hispanic / Latino</option>
						<option value="Non-Hispanic White">Non-Hispanic White</option>
						<option value="Black / African American">
							Black / African American
						</option>
						<option value="Asian">Asian</option>
						<option value="Native American / Alaska Native">
							Native American
						</option>
						<option value="Native Hawaiian / Pacific Islander">
							Pacific Islander
						</option>
						<option value="Middle Eastern">Middle Eastern</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div>
					<h3>Marital Status:</h3>
					<select
						value={formData.Marital_Status || ""}
						onChange={handleChange("Marital_Status")}>
						<option value="">Select Marital Status</option>
						<option value="Single">Single</option>
						<option value="Married">Married</option>
						<option value="Divorced">Divorced</option>
						<option value="Widowed">Widowed</option>
						<option value="Separated">Separated</option>
						<option value="Prefer not to say">Prefer not to say</option>
					</select>
				</div>
				<div>
					<h3>DL / ID #:</h3>
					<input
						type="text"
						value={formData.DL || ""}
						onChange={handleChange("DL")}
					/>
				</div>
				<div>
					<h3>Medicaid:</h3>
					<select
						value={formData.Medicaid || ""}
						onChange={handleChange("Medicaid")}>
						<option value="">Yes/No</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
						<option value="Applying">Applied</option>
					</select>
				</div>
				<div>
					<h3>Medicare:</h3>
					<select
						value={formData.Medicare || ""}
						onChange={handleChange("Medicare")}>
						<option value="">Yes/No</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
						<option value="Applying">Applied</option>
					</select>
				</div>
				<div>
					<h3>Phone:</h3>
					<input
						type="text"
						value={formData.Phone || ""}
						onChange={handleChange("Phone")}
					/>
				</div>
				<div>
					<h3>Address:</h3>
					<input
						type="text"
						value={formData.Address || ""}
						onChange={handleChange("Address")}
					/>
				</div>
				<div>
					<h3>Apartment #:</h3>
					<input
						type="text"
						value={formData.APT || ""}
						onChange={handleChange("APT")}
					/>
				</div>
				<div>
					<h3>City:</h3>
					<input
						type="text"
						value={formData.City || ""}
						onChange={handleChange("City")}
					/>
				</div>
				<div>
					<h3>State:</h3>
					<input
						type="text"
						value={formData.State || ""}
						onChange={handleChange("State")}
					/>
				</div>
				<div>
					<h3>Zip:</h3>
					<input
						type="text"
						value={formData.Zip || ""}
						onChange={handleChange("Zip")}
					/>
				</div>
				<div>
					<h3>Church:</h3>
					<input
						type="text"
						value={formData.Church || ""}
						onChange={handleChange("Church")}
					/>
				</div>
				<div>
					<h3>Registration Date:</h3>
					<input type="text" value={formData.Registration_Date} readOnly />
				</div>
				<div>

				</div>
				<div className="Client-Form-Submit-Button">
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}
