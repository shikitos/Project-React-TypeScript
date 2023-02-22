import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import './Auth.css';

type Props = {};
type hasPasswordState = {
	mainPassword: boolean;
	newPassword: boolean;
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
	const [passwordValidation, setPasswordValidation] = useState<boolean[]>([
		false, // hasNumber
		false, // hasSufficientLength
		false, // hasBigChar
		false // wasValidated
	]);


	const togglePasswordVisibility = (e: React.MouseEvent, refItem: React.RefObject<any>) => {
		if (refItem.current) {
			refItem.current.type = refItem.current.type === "password" ? "text" : "password";
		}
	}

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: {value: string},
			password: {value: string},
		}
		const email = target.email.value;
		const password = target.password.value;
		console.log(`Email: ${email}, password: ${password}`);
		setPasswordValidation(previousState => [
			/\d/.test(password),
			password.length >= 8,
			/[A-Z]/.test(password),
			true
		]);
		const invalidValidations = passwordValidation.filter(elem => !elem);
		if (invalidValidations.length) return false;
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
								onSubmit={handleSubmit}
							>
								<div className="auth-form__div">
									<label htmlFor="form__login">
										Email
									</label>
									<input className="form__login" id="form__login"  type="email" name="email" placeholder="Enter your email" />
								</div>
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
										(passwordValidation[3] && passwordValidation.some(value => !value)) &&
										<p>
											{`Your password must contain: 
											${passwordValidation[0] ? "" :  `at least one number${(!passwordValidation[1] || !passwordValidation[2]) && ", "}` }
											${passwordValidation[1] ? "" :  `length more than 8 symbols${!passwordValidation[2] ? ", " : "."}` }
											${passwordValidation[2] ? "" :  "one UPPERCASE char." }
											`}
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
								onSubmit={handleSubmit}
							>
								<div className="auth-form__div">
									<label htmlFor="form__name">
										Full Name
									</label>
									<input className="form__name" id="form__name"  type="text" name="text" placeholder="Enter your full name" />
								</div>
								<div className="auth-form__div">
									<label htmlFor="form__login">
										Username
									</label>
									<input className="form__login" id="form__username"  type="text" name="text" placeholder="Enter your username" />
								</div>
								<div className="auth-form__div">
									<label htmlFor="form__login">
										Email
									</label>
									<input className="form__login" id="form__login"  type="email" name="email" placeholder="Enter your email" />
								</div>
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
											name="password"
											placeholder="Confirm your password"
										    ref={confirmPasswordRef}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasPassword(prevState => ({ ...prevState, confirmPassword: !!e.target.value }))}
										/>
										{
											hasPassword.confirmPassword &&
											<span className="icon-eye" onClick={(e) => togglePasswordVisibility(e, confirmPasswordRef)}></span>
										}
									</div>
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
