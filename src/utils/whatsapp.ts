/**
 * Helper centralizado para geração segura de links do WhatsApp
 */
export function getWhatsAppUrl(
  phone: string = '558187772234',
  message: string = 'Olá KonohaTech! Gostaria de conversar sobre um projeto.'
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
}
