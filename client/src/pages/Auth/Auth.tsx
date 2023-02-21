import React, {LegacyRef, useRef, useState} from 'react';
import './Auth.css';

type Props = {};

const Auth:React.FC<Props> = (props) => {
	const formRef = useRef() as LegacyRef<any>;
	const passwordRef = useRef() as React.RefObject<HTMLInputElement>;
	const newPasswordRef = useRef() as React.RefObject<HTMLInputElement>;
	const confirmPasswordRef = useRef() as React.RefObject<HTMLInputElement>;
	const [isRegistered, setIsRegistered] = useState<boolean>(true);

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
										<input className="form__password" id="form__password" type="password" name="password" placeholder="Enter your password" ref={passwordRef}/>
										<span className="icon-eye" onClick={(e) => togglePasswordVisibility(e, passwordRef)}></span>
									</div>
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
										<input className="form__password" id="form__password" type="password" name="password" placeholder="Enter your password" ref ={newPasswordRef}/>
										<span className="icon-eye" onClick={(e) => togglePasswordVisibility(e, newPasswordRef)}></span>
									</div>
								</div>
								<div className="auth-form__div">
									<label htmlFor="form__password">
										Confirm Password
									</label>
									<div>
										<input className="form__password" id="form__password" type="password" name="password" placeholder="Confirm your password" ref={confirmPasswordRef} />
										<span className="icon-eye" onClick={(e) => togglePasswordVisibility(e, confirmPasswordRef)}></span>
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
