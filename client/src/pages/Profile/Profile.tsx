import React, {useEffect, useRef, useState} from 'react';
import {getStore} from "../../utils/storage";
import {useLocation} from "react-router-dom";


type Props = {}
type userData = {
	fullName?: string;
	photo?: string;
	description?: string;
	city?: string;
	address?: string;
}

const Profile: React.FC<Props> = () => {
	const [base64Image, setBase64Image] = useState<string>('');
	const [readyToSubmit, setReadyToSubmit] = useState<boolean>(false);
	const [userData, setUserData] = useState<userData>({});
	const storeData = getStore('user');
	const descriptionRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	let storedData = getStore('user');
	const location = useLocation();
	console.log(location);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const photo = base64Image;
		const description = descriptionRef.current?.value;
		const city = cityRef.current?.value;
		const address = addressRef.current?.value;
		setReadyToSubmit(previousState  => true)
	};

	useEffect(() => {
		const fetchRequest = async (data: object) => {
			const res = await fetch(`http://localhost:5000/api/users/update`, {
				method: 'PATCH',
				credentials: 'include',
				'headers': {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const response = await res.text();
		};

		if (readyToSubmit) {
			fetchRequest({
				photo: base64Image,
				description:  descriptionRef.current?.value,
				city: cityRef.current?.value,
				address: addressRef.current?.value
			})
		}
	}, [readyToSubmit]);

	/*useEffect(() => {
		const getUserData = async () => {
			const res = await fetch(`http://localhost:5000/api/user/`, {
				method: 'GET',
				credentials: 'include'
			});
			return await res.json();
		}

		getUserData()
			.then((data) => {setUserData(prev => data.user)})
			.catch((error) => console.error(error));
	},[]);*/

	useEffect(() => {
		return () => {
			const reader = new FileReader();
			reader.removeEventListener('load', handleFileLoad);
		};
	}, []);

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', handleFileLoad);
			reader.readAsDataURL(file);
		}
	};

	const handleFileLoad = (event: ProgressEvent<FileReader>) => {
		const base64 = event.target?.result?.toString().split(',')[1];

		if (base64) {
			setBase64Image(base64);
		}
	};

	return (
		<div className="profile">
			<div className="container">
				<h1>Hello, {location.state?.userData?.fullName}!</h1>
				<div>
					<form onSubmit={handleSubmit} className='profile-form'>
						<div className="profile-inputblock">
							{base64Image || location.state?.userData.photo && <img src={`data:image/png;base64,${location.state?.userData?.photo ? location.state?.userData.photo : base64Image}`} alt="Uploaded file" />}
							<label>Photo</label>
							<input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleFileInputChange} />
						</div>
						<div className="profile-inputblock">
							<label>Description</label>
							<input type="text" ref={descriptionRef} defaultValue={location.state?.userData?.description} />
						</div>
						<div className="profile-inputblock">
							<label>City</label>
							<input type="text" ref={cityRef} defaultValue={location.state?.userData?.city}/>
						</div>
						<div className="profile-inputblock">
							<label htmlFor="">Address</label>
							<input type="text" ref={addressRef} defaultValue={location.state?.userData?.address}/>
						</div>
						<input type="submit" />
					</form>
				</div>
			</div>
		</div>
	);
};


export default Profile;
