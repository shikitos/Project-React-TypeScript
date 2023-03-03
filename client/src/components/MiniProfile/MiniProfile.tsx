import React, {useRef, useState} from 'react';
import {getStore} from "../../utils/storage";
import './MiniProfile.css';

type Props = {
	image: string;
};

const MiniProfile: React.FC<Props> = (props) => {
	const storedData = getStore('user');
	const [showList, setShowList] = useState<boolean>(false);
	const list = useRef() as React.RefObject<HTMLDivElement>;

	const handleShowList = (e: React.MouseEvent) => {
		e.preventDefault();
		console.log(list)
		setShowList(prevState => !prevState);
		list.current!.className = showList ? 'miniprofile-list active' : 'miniprofile-list';
	}

	return (
		<div className='miniprofile'>
			<div className='thumbnail' onClick={handleShowList}>
				<img src={`data:image/png;base64,${props.image}`} alt='User avatar' />
			</div>
			<div className='miniprofile-list' ref={list}>

			</div>
		</div>
	);
};

export default MiniProfile;
