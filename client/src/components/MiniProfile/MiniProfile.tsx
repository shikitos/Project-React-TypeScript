import React, {useEffect, useRef, useState} from 'react';
import {getStore, removeItem} from "../../utils/storage";
import './MiniProfile.css';
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
	image: string;
};

const MiniProfile: React.FC<Props> = (props) => {
	const storedData = getStore('user');
	const [showList, setShowList] = useState<boolean>(false);
	const [logout, setLogout] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();
	const list = useRef() as React.RefObject<HTMLDivElement>;
	const avatar = useRef() as React.RefObject<HTMLDivElement>;
	let storeData = getStore('user');


	useEffect(() => {
		console.log(showList)
		// list.current!.className = showList ? 'miniprofile-list active' : 'miniprofile-list';
	}, [showList]);


	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (list.current && !list?.current.contains(event.target as Node)) {
				if (list.current.dataset.showed === "1") {
					setShowList(prevState=> false);
				}
				list.current.dataset.showed = list.current.dataset.showed === "0" ? "1" : "0";
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [list]);

	useEffect(() => {
		const logoutReq = async() => {
			const res = await fetch('http://localhost:5000/api/logout', {
				method: 'POST',
				credentials: 'include'
			});
			return await res.text();
		}

		if (logout && storeData.success) {
			logoutReq()
				.then(() => setLogout(prev => false))
				.then(() => removeItem('user'))
				.finally(() => navigate('/'));
		}
	}, [logout, storeData]);

	const handleListClick = (e: React.MouseEvent<HTMLLIElement>, navigateTo: string, doDataStore: boolean) => {
		navigate(navigateTo, doDataStore ? { state: { userData: location.state.userData }} : undefined);
		setShowList(prev => false);
		console.log(e)
		if ((e.target as HTMLLIElement).dataset.act === 'logout') {
			setLogout(prev => true);
		}
		console.log("Go to " + navigateTo)
	}

	return (
		<div className='miniprofile'>
			<div className='thumbnail' ref={avatar} onMouseDown={() => setShowList(prevState => !prevState)}>
				<img src={`data:image/png;base64,${props.image}`} alt='User avatar' />
			</div>
			{
				showList &&
				<div className={`miniprofile-list ${showList && "active"}`} data-showed={0} ref={list}>
					<ul>
						<li onClick={(e) => handleListClick(e, '/', true)}>
							Homepage
						</li>
						<li onClick={(e) => handleListClick(e, '/profile', true)}>
							Profile
						</li>
						<li onClick={(e) => handleListClick(e, '/support', true)}>
							Support
						</li>
						<li data-act={"logout"}  onClick={(e) => handleListClick(e, '/', false)}>
							Logout
						</li>
					</ul>
				</div>
			}
		</div>
	);
};

export default MiniProfile;
