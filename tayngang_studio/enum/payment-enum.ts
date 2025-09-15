export enum PaymentProvider {
	PAYOS = 'PAYOS',
}
export enum PaymentStatus {
	PENDING = 'ĐANG XỬ LÝ',
	PAID = 'ĐÃ THANH TOÁN',
	FAILED = 'ĐÃ THẤT BẠI',
	CANCELLED = 'ĐÃ HỦY',
	REFUNDED = 'ĐÃ HOÀN TIỀN',
}

export enum PaymentMethod {
	PAYOS = 'PAYOS',
	CASH = 'TIỀN MẶT',
	BANK_TRANSFER = 'CHUYỂN KHOẢN NGÂN HÀNG',
}

export enum OrderStatus {
	PENDING = 'ĐANG XỬ LÝ',
	PAID = 'ĐÃ THANH TOÁN',
	CONFIRMED = 'ĐÃ XÁC NHẬN',
	COMPLETED = 'ĐÃ HOÀN THÀNH',
	CANCELLED = 'ĐÃ HỦY',
}
