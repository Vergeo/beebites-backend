export abstract class PaymentInterface {
  abstract processPayment(order: any): Promise<boolean>;
}

// QRISPayment
export class QRISPayment extends PaymentInterface {
  async processPayment(order: any): Promise<boolean> {
    const qrCode = this.generateQRCode();
    console.log(`QRIS QR Code generated: ${qrCode} for order #${order.orderId}`);
    return true;
  }

  generateQRCode(): string {
    return `QRIS-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }
}