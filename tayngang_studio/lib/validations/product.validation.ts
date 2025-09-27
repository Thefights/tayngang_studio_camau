import * as yup from 'yup'

export const createProductSchema = yup.object({
	name: yup
		.string()
		.required('Name is required')
		.min(2, 'Name must be between 2 and 100 characters long.')
		.max(100, 'Name must be between 2 and 100 characters long.'),

	quantity: yup
		.number()
		.required('Quantity is required')
		.min(0, 'Quantity cannot be negative.')
		.integer('Quantity must be a whole number'),

	price: yup.number().required('Price is required').min(0, 'Price cannot be negative.'),

	description: yup.string().max(1000, 'Description cannot exceed 1000 characters.'),

	rating: yup
		.number()
		.required('Rating is required')
		.min(0, 'Rating cannot be negative.')
		.max(5, 'Rating cannot exceed 5.'),

	review: yup
		.number()
		.required('Review is required')
		.min(0, 'Review cannot be negative.')
		.integer('Review must be a whole number'),

	productCategoryId: yup
		.number()
		.required('ProductCategoryId is required')
		.min(1, 'ProductCategoryId must be at least 1')
		.integer('ProductCategoryId must be a whole number'),
})

export const updateProductSchema = yup.object({
	name: yup
		.string()
		.required('Name is required')
		.min(2, 'Name must be between 2 and 100 characters long.')
		.max(100, 'Name must be between 2 and 100 characters long.'),

	quantity: yup
		.number()
		.required('Quantity is required')
		.min(0, 'Quantity cannot be negative.')
		.integer('Quantity must be a whole number'),

	price: yup.number().required('Price is required').min(0.01, 'Price must be at least 0.01'),

	description: yup.string().max(1000, 'Description cannot exceed 1000 characters.'),

	productCategoryId: yup
		.number()
		.required('ProductCategoryId is required')
		.min(1, 'ProductCategoryId must be at least 1')
		.integer('ProductCategoryId must be a whole number'),
})

export type CreateProductFormData = yup.InferType<typeof createProductSchema>
export type UpdateProductFormData = yup.InferType<typeof updateProductSchema>
