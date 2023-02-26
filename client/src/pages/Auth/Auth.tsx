import { request } from 'http';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import './Auth.css';
import { authInputsSignUp } from "../../utils/constants";
import { AuthInput } from "../../components";
import { setStore } from "../../utils/storage";
import {redirect, useNavigate} from "react-router-dom";

type Props = {};
type hasPasswordState = {
	mainPassword: boolean;
	newPassword: boolean;
	confirmPassword: boolean;
}
type requestStatusState = {
	requestRequired: boolean;
	signUpData: {
		fullName?: string;
		username?: string;
		email?: string;
		password?: string;
	};
	signInData: {
		email?: string;
		password?: string;
	};
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
	const navigate = useNavigate();
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
		const createUser = async (data: requestStatusState["signUpData"]) => {
			console.log("Create new user: ", JSON.stringify(data))
			const res = await fetch('http://localhost:5000/api/auth/signup', {
				method: 'POST',
				mode: 'cors',
				'headers': {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const response = await res.text();
			if (res.statusText === "Created") {
				const parsedData = JSON.parse(response);
				setStore('user', {
					username: parsedData.username,
					fullName: parsedData.fullName,
					token: parsedData.token,
					role: parsedData.role,
					email: parsedData.email
				});
				console.log("Success!", parsedData);
				navigate('/');
			}
		}

		const signIn = async (data: requestStatusState["signInData"]) => {
			console.log("Sign In: ", JSON.stringify(data))
			setReqStatus(prev => ({ ...prev, requestRequired: false}));
			const res = await fetch('http://localhost:5000/api/auth/signin', {
				method: 'POST',
				mode: 'cors',
				'headers': {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const response = await res.text();
			if (res.statusText === "OK") {
				const parsedData = JSON.parse(response);
				setStore('user', {
					username: parsedData.username,
					fullName: parsedData.fullName,
					token: parsedData.token,
					role: parsedData.role,
					email: parsedData.email
				});
				console.log("Success!", parsedData);
				navigate('/');
			}
		}


		// console.log()
		if (reqStatus.requestRequired && Object.keys(reqStatus.signInData).length !== 0) {
			signIn(reqStatus.signInData)
				.then(() => {
					setReqStatus(prev => ({ ...prev, requestRequired: false}));
				})
				.catch(error => {
					console.error(error);
				});
		} else if (reqStatus.requestRequired && Object.keys(reqStatus.signUpData).length !== 0) {
			createUser(reqStatus.signUpData)
				.then(() => {
					setReqStatus(prev => ({ ...prev, requestRequired: false}));
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [reqStatus.requestRequired]);

	const togglePasswordVisibility = (e: React.MouseEvent, refItem: React.RefObject<any>) => {
		if (refItem.current) {
			refItem.current.type = refItem.current.type === "password" ? "text" : "password";
		}
	}

	const handleSubmit = (e: React.SyntheticEvent, typeOfSubmit: string) => {
		e.preventDefault();
		console.log(typeOfSubmit);
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
			setFormValidation(prev => ({
				fullName: !!fullName,
				username: !!username,
				email: !!email,
				password: !!password,
				confirmPassword: !!confirmPassword
			}));
			for (let key in formValidation) {
				const validation = formValidation[key as keyof typeof formValidation];
				if (!validation) return false;
			}
			setPasswordValidation(previousState => ({
				...previousState,
				hasNumber: /\d/.test(password),
				hasSufficientLength: password.length >= 8,
				hasBigChar: /[A-Z]/.test(password),
				doesNotMatch: password === confirmPassword ,
				wasValidated: true
			}));
			for (let key in passwordValidation) {
				const validation = passwordValidation[key as keyof typeof passwordValidation];
				if (!validation) console.log(password )
				if (!validation && key !== "wasValidated") return false;
			}
			setReqStatus(prev => ({
				...prev,
				requestRequired: true,
				signUpData: {
					fullName: fullName,
					username: username,
					email: email,
					password: password,
					status: 'user'
				}
			}));
		} else {
			const email = target.email.value;
			const password = target.password.value;
			if (!!email && !!password) {
				setReqStatus(prev => ({
					...prev,
					requestRequired: true,
					signInData: {
						email: email,
						password: password
					}
				}));
			} else {
				return false;
			}
		}
	}

	return (
		<div className="auth">
			<div className="container">
				<div className="auth-form">
					<h1>
						{isRegistered ? "Sign In" : "Sign Up"}
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
										// (newPasswordValidation[newPasswordValidation.length - 1] && newPasswordValidation.some(value => !value)) &&
										// <p className="auth-form__status password">
										// 	{
										// 		newPasswordValidation[3] ?
										// 			'Password & Confirm Password does not match. Try again!' :
										// 			`Your password must contain:
										// 				${newPasswordValidation[0] ? "" :  `at least one number${(!newPasswordValidation[1] || !newPasswordValidation[2]) && ", "}` }
										// 				${newPasswordValidation[1] ? "" :  `length more than 8 symbols${!newPasswordValidation[2] ? ", " : "."}` }
										// 				${newPasswordValidation[2] ? "" :  "one UPPERCASE char." }
										// 			`
										// 	}
										// </p>
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
