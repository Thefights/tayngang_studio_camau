import * as yup from 'yup'

const vietnamesePhoneRegex =
	/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/

export const createUserSchema = yup.object().shape({
	name: yup
		.string()
		.required('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	phone: yup
		.string()
		.required('Phone is required')
		.matches(vietnamesePhoneRegex, 'Invalid Vietnamese phone number'),
	email: yup.string().required('Email is required').email('Invalid email address'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			passwordRegex,
			'Password must be 8-15 characters, with at least one uppercase letter, one lowercase letter, one digit, and one special character.'
		),
	address: yup.string().required('Address is required'),
	role: yup.string().oneOf(['Admin', 'Customer']).required('Role is required'),
})

export const updateUserSchema = yup.object().shape({
	name: yup
		.string()
		.required('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters'),
	phone: yup
		.string()
		.required('Phone is required')
		.matches(vietnamesePhoneRegex, 'Invalid Vietnamese phone number'),
	address: yup.string().required('Address is required'),
	role: yup.string().oneOf(['Admin', 'Customer']).required('Role is required'),
})
