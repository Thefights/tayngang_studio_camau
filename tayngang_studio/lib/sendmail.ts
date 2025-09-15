import nodemailer from 'nodemailer'

export interface SendMailOptions {
	email: string
	subject: string
	htmlBody: string
}

export const sendMail = async ({ email, subject, htmlBody }: SendMailOptions) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		})

		const mailOptions = {
			from: {
				name: process.env.WEB_NAME || 'TayNgang Studio Cà Mau',
				address: process.env.EMAIL_USER!,
			},
			to: email,
			subject: subject,
			html: htmlBody,
		}

		const result = await transporter.sendMail(mailOptions)
		console.log('Email sent successfully:', result.messageId)
		return { success: true, messageId: result.messageId }
	} catch (error) {
		console.error('Error sending email:', error)
		return { success: false, error: error }
	}
}
