import React from 'react';

type Props = {
	labelContent: string;
	inputClassName: string;
	inputType: string;
	inputName: string;
	inputPlaceholder: string;
	hasValue: boolean;
}

const AuthInput:React.FC<Props> = (props) => {
	return (
		<div className="auth-form__div">
			<label htmlFor={props.inputClassName}>
				{props.labelContent}
			</label>
			<input className={props.inputClassName} id={props.inputClassName}  type={props.inputType} name={props.inputName} placeholder={props.inputPlaceholder}/>
			{
				props.hasValue ?
					 '' :
					<p
						className="auth-form__status">
						{
							`${props.labelContent} is required`
						}
					</p>

			}
		</div>
	);
};

export default AuthInput;
