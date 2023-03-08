import React, {Component} from 'react';
import './Support.css';

type Props = {}
type FormDataType = {
	name: string;
	email: string;
	message: string;
}

const Support:React.FC<Props> = (props) => {

	const handleSupportSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: {value: string},
			email: {value: string},
			message: {value: string}
		};

		const formData: FormDataType = {
			name: target.name.value,
			email: target.email.value,
			message: target.message.value,
		}
		console.log(formData);
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