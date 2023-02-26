import React from 'react';
import {getStore} from "../../utils/storage";


type Props = {}

const Profile: React.FC<Props> = () => {
	let storeData = getStore('user');

	return (
		<div>
			<div className='container'>
				Hello, {storeData.fullName}!
			</div>
		</div>
	);
};

export default Profile;
