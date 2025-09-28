import * as yup from 'yup'

export const loginSchema = yup.object().shape({
	email: yup.string().required('Email is required').email('Invalid email format'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
			'Password must be between 8 and 15 characters, and contain one uppercase, one lowercase, one digit, and one special character'
		),
})

export const registerSchema = yup.object().shape({
	name: yup
		.string()
		.required('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	phone: yup
		.string()
		.required('Phone number is required')
		.matches(
			/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
			'Invalid Vietnamese phone number'
		),
	email: yup.string().required('Email is required').email('Invalid email format'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/,
			'Password must be 8-15 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), undefined], 'Passwords must match')
		.required('Confirm Password is required'),
})
