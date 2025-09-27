import { ICategory } from './category'

export interface IProduct {
	id: number
	name: string
	quantity: number
	price: number
	description: string
	rating: number
	review: number
	productCategoryName: string | null
	productCategoryId: number
	imageUrl: string | null
	productCategory?: ICategory
}
