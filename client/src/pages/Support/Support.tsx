import React, {Component, useEffect, useState} from 'react';
import './Support.css';

type Props = {}
type FormDataType = {
	name?: string;
	email?: string;
	message?: string;
	submitted?: boolean;
}

const Support:React.FC<Props> = (props) => {
	const [formData, setFormData] = useState<FormDataType>({
		name: undefined,
		email: undefined,
		message: undefined,
		submitted: false,
	});
	const [messageStatus, setMessageStatus] = useState<boolean>(false);

	useEffect(() => {
		const sendMessage = async () => {
			console.log("Submit Data")
			try {
				const res = await fetch("http://localhost:5000/api/email", {
					method: "POST",
					mode: 'cors',
					'headers': {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(formData)
				});
				if (!res.ok) {
					console.error(`HTTP error! Status: ${res.status}`);
					return;
				}
				const data = await res.json();
				setMessageStatus(prev => true);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
		if (formData.submitted) sendMessage().then(r => setFormData(prev => ({
			name: undefined,
			email: undefined,
			message: undefined,
			submitted: false,
		})));
	}, [formData.submitted]);

	const handleSupportSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: {value: string},
			email: {value: string},
			message: {value: string},
		};

		const formData: FormDataType = {
			name: target.name.value,
			email: target.email.value,
			message: target.message.value,
		}

		setFormData(prev => ({
			name: target.name.value,
			email: target.email.value,
			message: target.message.value,
			submitted: true,
		}));
	}

	return (
		<section className='support'>
			<div className='container'>
				<div className='support-heading'>
					<h1>Support form</h1>
				</div>
				<div className='support-form'>
					<form onSubmit={handleSupportSubmit}>
						<div className='support-form__input'>
							<label htmlFor='name'>
								Name
							</label>
							<input id='name' type='text' name='name' placeholder='Write your name...' required/>
						</div>
						<div className='support-form__input'>
							<label htmlFor='email'>
								Email
							</label>
							<input id='email' type='email' name='email' placeholder='Write your email...' required/>
						</div>
						<div className='support-form__input'>
							<label htmlFor='message'>
								Message
							</label>
							<textarea id='message' name='message' placeholder='Write your question...' required/>
						</div>
						<div className='support-form__input'>
							<input id='submit' type='submit' placeholder='Write your question...'/>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Support;