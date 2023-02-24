interface AuthInputData {
	labelContent: string;
	inputClassName: string;
	inputType: string;
	inputName: string;
	inputPlaceholder: string;
}

export const authInputsSignUp: AuthInputData[] = [
	{
		labelContent: "Full Name",
		inputClassName: "form__name",
		inputType: "text",
		inputName: "fullName",
		inputPlaceholder: "Enter your full name",
	},
	{
		labelContent: "Username",
		inputClassName: "form__username",
		inputType: "text",
		inputName: "username",
		inputPlaceholder: "Enter your username",
	},
	{
		labelContent: "Email",
		inputClassName: "form__login",
		inputType: "email",
		inputName: "email",
		inputPlaceholder: "Enter your email",
	},
]