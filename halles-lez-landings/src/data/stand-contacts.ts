/** Helpers téléphone — formatage & lien tel: (numéros vérifiés, stockés bruts). */

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
  }
  return phone;
}

export function phoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) return `tel:+33${digits.slice(1)}`;
  return `tel:+${digits}`;
}
