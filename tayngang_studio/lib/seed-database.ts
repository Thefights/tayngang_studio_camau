import { OrderStatus, PaymentStatus } from '../enum/payment-enum'
import connectToDatabase from '../lib/mongodb'
import Product from '../models/product'
import Voucher from '../models/voucher'

const sampleProducts = [
	{
		name: 'Sổ Tay Xứ Mũi - Tiếng Việt',
		description:
			'Quyển sổ được vẽ lại hình ảnh các di tích nổi bật nơi đất Mũi, vùng đất nổi tiếng rừng vàng biển bạc của Việt Nam. Ở mỗi địa điểm, quyển sổ đều được tích hợp mã QR dẫn đến video hành trình trải nghiệm thực tế do chính nhóm tác giả thực hiện.',
		category: 'notebook',
		basePrice: 35000,
		currency: 'VND',
		variants: [
			{
				name: 'Bản tiếng Việt',
				price: 35000,
				stock: 100,
				sku: 'STXM-VN-001',
				images: ['/assets/products/notebook-vi.jpg'],
				description: 'Sổ tay du lịch Cà Mau bản tiếng Việt',
			},
		],
		images: ['/assets/products/notebook-vi.jpg'],
		stock: 100,
		isActive: true,
		isCombo: false,
		tags: ['du lịch', 'cà mau', 'sổ tay', 'việt nam'],
		language: 'vi',
		qrCode: 'https://example.com/qr/notebook-vi',
	},
	{
		name: 'Sổ Tay Xứ Mũi - Tiếng Anh',
		description:
			'Travel notebook featuring illustrations of notable landmarks in the Cape region, the famous land of golden forests and silver seas of Vietnam. Each location in the notebook is integrated with QR codes leading to real experience journey videos created by the authors themselves.',
		category: 'notebook',
		basePrice: 35000,
		currency: 'VND',
		variants: [
			{
				name: 'English Version',
				price: 35000,
				stock: 50,
				sku: 'STXM-EN-001',
				images: ['/assets/products/notebook-en.jpg'],
				description: 'Ca Mau travel notebook English version',
			},
		],
		images: ['/assets/products/notebook-en.jpg'],
		stock: 50,
		isActive: true,
		isCombo: false,
		tags: ['travel', 'ca mau', 'notebook', 'vietnam', 'english'],
		language: 'en',
		qrCode: 'https://example.com/qr/notebook-en',
	},
	{
		name: 'Móc khóa Mascot Cà Mau - Mẫu 1',
		description:
			'Móc khóa được vẽ mascot, địa danh liên quan đến dự án. Chất liệu: Acrylic, Kích thước: ~5-6 cm, Phụ kiện: Khoen kim loại chắc chắn, dễ gắn vào chìa khóa, balo, túi xách.',
		category: 'keychain',
		basePrice: 15000,
		currency: 'VND',
		variants: [
			{
				name: 'Mẫu 1',
				price: 15000,
				stock: 200,
				sku: 'MK-M1-001',
				images: ['/assets/products/keychain-1.jpg'],
				description: 'Móc khóa mascot Cà Mau mẫu 1',
			},
		],
		images: ['/assets/products/keychain-1.jpg'],
		stock: 200,
		isActive: true,
		isCombo: false,
		tags: ['móc khóa', 'mascot', 'cà mau', 'acrylic'],
		material: 'Acrylic',
		dimensions: { length: 6, width: 5 },
	},
	{
		name: 'Móc khóa Mascot Cà Mau - Mẫu 2',
		description:
			'Móc khóa được vẽ mascot, địa danh liên quan đến dự án. Chất liệu: Acrylic, Kích thước: ~5-6 cm, Phụ kiện: Khoen kim loại chắc chắn, dễ gắn vào chìa khóa, balo, túi xách.',
		category: 'keychain',
		basePrice: 15000,
		currency: 'VND',
		variants: [
			{
				name: 'Mẫu 2',
				price: 15000,
				stock: 200,
				sku: 'MK-M2-001',
				images: ['/assets/products/keychain-2.jpg'],
				description: 'Móc khóa mascot Cà Mau mẫu 2',
			},
		],
		images: ['/assets/products/keychain-2.jpg'],
		stock: 200,
		isActive: true,
		isCombo: false,
		tags: ['móc khóa', 'mascot', 'cà mau', 'acrylic'],
		material: 'Acrylic',
		dimensions: { length: 6, width: 5 },
	},
	{
		name: 'Móc khóa Mascot Cà Mau - Mẫu 3',
		description:
			'Móc khóa được vẽ mascot, địa danh liên quan đến dự án. Chất liệu: Acrylic, Kích thước: ~5-6 cm, Phụ kiện: Khoen kim loại chắc chắn, dễ gắn vào chìa khóa, balo, túi xách.',
		category: 'keychain',
		basePrice: 15000,
		currency: 'VND',
		variants: [
			{
				name: 'Mẫu 3',
				price: 15000,
				stock: 200,
				sku: 'MK-M3-001',
				images: ['/assets/products/keychain-3.jpg'],
				description: 'Móc khóa mascot Cà Mau mẫu 3',
			},
		],
		images: ['/assets/products/keychain-3.jpg'],
		stock: 200,
		isActive: true,
		isCombo: false,
		tags: ['móc khóa', 'mascot', 'cà mau', 'acrylic'],
		material: 'Acrylic',
		dimensions: { length: 6, width: 5 },
	},
	{
		name: 'Móc khóa Mascot Cà Mau - Mẫu 4',
		description:
			'Móc khóa được vẽ mascot, địa danh liên quan đến dự án. Chất liệu: Acrylic, Kích thước: ~5-6 cm, Phụ kiện: Khoen kim loại chắc chắn, dễ gắn vào chìa khóa, balo, túi xách.',
		category: 'keychain',
		basePrice: 15000,
		currency: 'VND',
		variants: [
			{
				name: 'Mẫu 4',
				price: 15000,
				stock: 200,
				sku: 'MK-M4-001',
				images: ['/assets/products/keychain-4.jpg'],
				description: 'Móc khóa mascot Cà Mau mẫu 4',
			},
		],
		images: ['/assets/products/keychain-4.jpg'],
		stock: 200,
		isActive: true,
		isCombo: false,
		tags: ['móc khóa', 'mascot', 'cà mau', 'acrylic'],
		material: 'Acrylic',
		dimensions: { length: 6, width: 5 },
	},
]

const comboProducts = [
	{
		name: 'Combo Sổ Tay + Móc Khóa (Tiếng Việt)',
		description:
			'Combo bao gồm 1 quyển sổ tay Xứ Mũi bản tiếng Việt + 1 móc khóa (tùy chọn mẫu). Giá ưu đãi chỉ 45.000 VND thay vì 50.000 VND khi mua lẻ.',
		category: 'combo',
		basePrice: 45000,
		currency: 'VND',
		variants: [],
		images: ['/assets/products/combo-vi.jpg'],
		stock: 100,
		isActive: true,
		isCombo: true,
		comboRules: [
			{
				name: 'Combo Sổ + Móc khóa VN',
				description: '1 Sổ tay tiếng Việt + 1 Móc khóa bất kỳ',
				requiredProducts: [
					{ productId: null, quantity: 1 },
					{ productId: null, quantity: 1 },
				],
				discountPrice: 45000,
				isActive: true,
			},
		],
		tags: ['combo', 'sổ tay', 'móc khóa', 'ưu đãi', 'cà mau'],
	},
	{
		name: 'Combo Sổ Tay + Móc Khóa (Tiếng Anh)',
		description:
			'Combo bao gồm 1 quyển sổ tay Xứ Mũi bản tiếng Anh + 1 móc khóa (tùy chọn mẫu). Giá ưu đãi chỉ 45.000 VND thay vì 50.000 VND khi mua lẻ.',
		category: 'combo',
		basePrice: 45000,
		currency: 'VND',
		variants: [],
		images: ['/assets/products/combo-en.jpg'],
		stock: 50,
		isActive: true,
		isCombo: true,
		comboRules: [
			{
				name: 'Combo Sổ + Móc khóa EN',
				description: '1 Sổ tay tiếng Anh + 1 Móc khóa bất kỳ',
				requiredProducts: [
					{ productId: null, quantity: 1 },
					{ productId: null, quantity: 1 },
				],
				discountPrice: 45000,
				isActive: true,
			},
		],
		tags: ['combo', 'notebook', 'keychain', 'discount', 'ca mau', 'english'],
	},
]

const sampleVouchers = [
	{
		code: 'WELCOME10',
		name: 'Chào mừng khách hàng mới',
		description: 'Giảm 10% cho đơn hàng đầu tiên, tối đa 20.000 VND',
		discountType: 'percentage',
		discountValue: 10,
		maxDiscountAmount: 20000,
		minOrderAmount: 50000,
		currency: 'VND',
		usageLimit: 1000,
		usageCount: 0,
		usageLimitPerUser: 1,
		isActive: true,
		validFrom: new Date(),
		validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
		isFirstTimeOnly: true,
	},
	{
		code: 'CAMAU2024',
		name: 'Khuyến mãi Cà Mau 2024',
		description: 'Giảm 15% cho tất cả sản phẩm, tối đa 30.000 VND',
		discountType: 'percentage',
		discountValue: 15,
		maxDiscountAmount: 30000,
		minOrderAmount: 100000,
		currency: 'VND',
		usageLimit: 500,
		usageCount: 0,
		usageLimitPerUser: 3,
		isActive: true,
		validFrom: new Date(),
		validTo: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), 
		isFirstTimeOnly: false,
	},
	{
		code: 'FREESHIP',
		name: 'Miễn phí vận chuyển',
		description: 'Giảm 25.000 VND phí vận chuyển cho đơn hàng từ 150.000 VND',
		discountType: 'fixed',
		discountValue: 25000,
		minOrderAmount: 150000,
		currency: 'VND',
		usageLimit: 200,
		usageCount: 0,
		usageLimitPerUser: 5,
		isActive: true,
		validFrom: new Date(),
		validTo: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), 
		isFirstTimeOnly: false,
	},
]

export async function seedDatabase() {
	try {
		await connectToDatabase()

		console.log('Starting database seeding...')

		await Product.deleteMany({})
		await Voucher.deleteMany({})

		console.log(' Cleared existing data')

		const insertedProducts = await Product.insertMany(sampleProducts)
		console.log(` Inserted ${insertedProducts.length} individual products`)

		const notebookVi = insertedProducts.find((p) => p.name.includes('Tiếng Việt'))
		const notebookEn = insertedProducts.find((p) => p.name.includes('Tiếng Anh'))
		const keychain1 = insertedProducts.find((p) => p.name.includes('Mẫu 1'))

		if (notebookVi && keychain1) {
			comboProducts[0].comboRules![0].requiredProducts[0].productId = notebookVi._id
			comboProducts[0].comboRules![0].requiredProducts[1].productId = keychain1._id
		}

		if (notebookEn && keychain1) {
			comboProducts[1].comboRules![0].requiredProducts[0].productId = notebookEn._id
			comboProducts[1].comboRules![0].requiredProducts[1].productId = keychain1._id
		}

		const insertedCombos = await Product.insertMany(comboProducts)
		console.log(` Inserted ${insertedCombos.length} combo products`)

		const insertedVouchers = await Voucher.insertMany(sampleVouchers)
		console.log(` Inserted ${insertedVouchers.length} vouchers`)

		console.log(' Database seeding completed successfully!')
		console.log(' Summary:')
		console.log(`  - ${insertedProducts.length + insertedCombos.length} products`)
		console.log(`  - ${insertedVouchers.length} vouchers`)
		console.log(`  - Order Status: ${Object.values(OrderStatus).join(', ')}`)
		console.log(`  - Payment Status: ${Object.values(PaymentStatus).join(', ')}`)

		return {
			products: insertedProducts.length + insertedCombos.length,
			vouchers: insertedVouchers.length,
		}
	} catch (error) {
		console.error(' Database seeding failed:', error)
		throw error
	}
}

if (require.main === module) {
	seedDatabase()
		.then((result) => {
			console.log('Seeding result:', result)
			process.exit(0)
		})
		.catch((error) => {
			console.error('Seeding error:', error)
			process.exit(1)
		})
}
