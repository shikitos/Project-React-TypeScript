import { request } from 'http';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import './Auth.css';
import { authInputsSignUp } from "../../utils/constants";
import { AuthInput } from "../../components";

type Props = {};
type hasPasswordState = {
	mainPassword: boolean;
	newPassword: boolean;
	confirmPassword: boolean;
}
type requestStatusState = {
	requestRequired: boolean;
	signInData: object;
	signUpData: object;
}
type PasswordValidation = {
	hasNumber: boolean;
	hasSufficientLength: boolean;
	hasBigChar: boolean;
	doesNotMatch: boolean;
	wasValidated: boolean;
}
type formValidation = {
	fullName: boolean;
	username: boolean;
	email: boolean;
	password: boolean;
	confirmPassword: boolean;
}

const Auth:React.FC<Props> = (props) => {
	const formRef = useRef() as React.RefObject<HTMLFormElement>;
	const passwordRef = useRef() as React.RefObject<HTMLInputElement>;
	const newPasswordRef = useRef() as React.RefObject<HTMLInputElement>;
	const confirmPasswordRef = useRef() as React.RefObject<HTMLInputElement>;
	const [isRegistered, setIsRegistered] = useState<boolean>(true);
	const [hasPassword, setHasPassword] = useState<hasPasswordState>({
		mainPassword: false,
		newPassword: false,
		confirmPassword: false
	});
	const [newPasswordValidation, setNewPasswordValidation] = useState<boolean[]>([
		false, // hasNumber
		false, // hasSufficientLength
		false, // hasBigChar
		false, // doesn't match
		false // wasValidated
	]);
	const [formValidation, setFormValidation] = useState<formValidation>({
		fullName: true,
		username: true,
		email: true,
		password: true,
		confirmPassword: true,

	});
	const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
		hasNumber: true,
		hasSufficientLength: true,
		hasBigChar: true,
		doesNotMatch: true,
		wasValidated: true
	});
	const [reqStatus, setReqStatus] = useState<requestStatusState>({
		requestRequired: false,
		signInData: {},
		signUpData: {}
	})
	let signInStatus = true;

	useEffect(() => {
		if (reqStatus.requestRequired) {
			fetch('http://localhost:3000/api')
				.then(response => response.text())
				.then(data => console.log(data))
				.finally(() => setReqStatus(prev => ({ ...prev, requestRequired: false})))
		}
	}, [reqStatus.requestRequired]);

	const togglePasswordVisibility = (e: React.MouseEvent, refItem: React.RefObject<any>) => {
		if (refItem.current) {
			refItem.current.type = refItem.current.type === "password" ? "text" : "password";
		}
	}

	const handleSubmit = (e: React.SyntheticEvent, typeOfSubmit: string) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			fullName: {value: string},
			username: {value: string},
			email: {value: string},
			password: {value: string},
			confirmPassword: {value: string}
		}
		if (typeOfSubmit === 'signUp') {
			const fullName = target.fullName.value;
			const username = target.username.value;
			const email = target.email.value;
			const password = target.password.value;
			const confirmPassword = target.confirmPassword.value;
			console.log(confirmPassword)
			// if (password !== confirmPassword) {
			// 	setNewPasswordValidation(prev => [...prev.slice(0, 3), true]);
			// 	return false;
			// }
			setFormValidation(prev => ({
				fullName: !!fullName,
				username: !!username,
				email: !!email,
				password: !!password,
				confirmPassword: !!confirmPassword
			}));
			console.log(formValidation)
			for (let key in formValidation) {
				const validation = formValidation[key as keyof typeof formValidation];
				if (!validation) return false;
			}

			setNewPasswordValidation(previousState => [
				/\d/.test(password),
				password.length >= 8,
				/[A-Z]/.test(password),
				true
			]);
			setPasswordValidation(previousState => ({
				...previousState,
				hasNumber: /\d/.test(password),
				hasSufficientLength: password.length >= 8,
				hasBigChar: /[A-Z]/.test(password),
				doesNotMatch: password !== confirmPassword,
				wasValidated: true
			}));
			for (let key in passwordValidation) {
				const validation = passwordValidation[key as keyof typeof passwordValidation];
				if (!validation && key !== "wasValidated") return false;
			}
			const invalidValidations = newPasswordValidation.filter(elem => !elem);
			if (invalidValidations.length) return false;
			setReqStatus(prev => ({
				...prev,
				requestRequired: true,
				signUpData: {
					fullName: fullName,
					username: username,
					email: email,
					password: password
				}
			}));
		} else {
			const email = target.email.value;
			const password = target.password.value;
			setReqStatus(prev => ({
				...prev,
				requestRequired: true,
			}));
		// 	setFormValidation(prev => ({
		// 		...prev,
		// 		email: !!email,
		// 		password: !!password,
		// 	}));
		}
	}

	return (
		<div className="auth">
			<div className="container">
				<div className="auth-form">
					<h1>
						{isRegistered ? "Sign Up" : "Sign In"}
					</h1>
					{
						isRegistered ?
							<form
								ref={formRef}
								onSubmit={(e) => handleSubmit(e, "signIn")}
							>
								<AuthInput
									labelContent="Email"
									inputClassName="form__login"
									inputType="email"
									inputName="email"
									inputPlaceholder="Enter your email"
									hasValue={true}
								/>
								<div className="auth-form__div">
									<label htmlFor="form__password">
										Password
									</label>
									<div>
										<input
											className="form__password"
											id="form__password"
											type="password"
											name="password"
											placeholder="Enter your password"
											ref={passwordRef}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasPassword(prevState => ({ ...prevState, mainPassword: !!e.target.value }))}
										/>
										{
											hasPassword.mainPassword &&
											<span className="icon-eye"
											      onClick={(e) => togglePasswordVisibility(e, passwordRef)}
											>
											</span>
										}
									</div>
									{
										!signInStatus &&
										<p className="auth-form__status">
											Password & Confirm Password does not match. Try again!
										</p>
									}
								</div>
								<div className="auth-form__div">
									<input className="form__submit" id="form__submit" type="submit" value="Sign In" />
								</div>
							</form>
							:
							<form
								ref={formRef}
								onSubmit={(e) => handleSubmit(e, "signUp")}
							>
								{
									authInputsSignUp.map((value, index) => (
										<>
											<AuthInput
												key={index}
												labelContent={value.labelContent}
												inputClassName={value.inputClassName}
												inputType={value.inputType}
												inputName={value.inputName}
												inputPlaceholder={value.inputPlaceholder}
												hasValue={formValidation[value.inputName as keyof typeof formValidation]}
											/>
										</>
									))
								}
								<div className="auth-form__div">
									<label htmlFor="form__password">
										Password
									</label>
									<div>
										<input
											className="form__password"
									        id="form__password"
									        type="password"
									        name="password"
									        placeholder="Enter your password"
											ref ={newPasswordRef}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasPassword(prevState => ({ ...prevState, newPassword: !!e.target.value }))}
										/>
										{
											hasPassword.newPassword &&
											<span className="icon-eye"
											      onClick={(e) => togglePasswordVisibility(e, newPasswordRef)}
											>
											</span>
										}
									</div>
									{
										formValidation.password ?
											'' :
											<p
												className="auth-form__status">
												{
													`Password is required`
												}
											</p>
									}
								</div>

								<div className="auth-form__div">
									<label htmlFor="form__password">
										Confirm Password
									</label>
									<div>
										<input
											className="form__password"
											id="form__password"
											type="password"
											name="confirmPassword"
											placeholder="Confirm your password"
										    ref={confirmPasswordRef}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasPassword(prevState => ({ ...prevState, confirmPassword: !!e.target.value }))}
										/>
										{
											hasPassword.confirmPassword &&
											<span className="icon-eye" onClick={(e) => togglePasswordVisibility(e, confirmPasswordRef)}></span>
										}
									</div>
									{
										formValidation.confirmPassword ?
											'' :
											<p
												className="auth-form__status">
												{
													`Confirm Password is required.`
												}
											</p>
									}
									{
										(newPasswordValidation[newPasswordValidation.length - 1] && newPasswordValidation.some(value => !value)) &&
										<p className="auth-form__status password">
											{
												newPasswordValidation[3] ?
													'Password & Confirm Password does not match. Try again!' :
													`Your password must contain: 
														${newPasswordValidation[0] ? "" :  `at least one number${(!newPasswordValidation[1] || !newPasswordValidation[2]) && ", "}` }
														${newPasswordValidation[1] ? "" :  `length more than 8 symbols${!newPasswordValidation[2] ? ", " : "."}` }
														${newPasswordValidation[2] ? "" :  "one UPPERCASE char." }
													`
											}
										</p>
									}
								</div>
								<div className="auth-form__div">
									<input className="form__submit" id="form__submit" type="submit" value="Sign In" />
								</div>
							</form>
					}
					<div className="auth-register">
						<div>
							<div className="line"></div><span>OR</span><div className="line"></div>
						</div>
						<p>
							{isRegistered ? "Already have an account? " : "New here? "}
							<span onClick={() => setIsRegistered(prev => !prev)}>
								{isRegistered ? "Sign In" : "Sign Up"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
