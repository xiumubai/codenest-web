
/**
 * 根据手机号生成用户昵称
 * @param {string} phone - 手机号
 * @returns {string} 生成的昵称
 */
export function generateNickname(phone: string): string {
  const lastFourDigits = phone.slice(-4);
  return `道友${lastFourDigits}`;
}

/**
 * 根据手机号生成头像URL
 * @param {string} phone - 手机号
 * @returns {string} 头像URL
 */
export function generateAvatar(phone: string): string {
  const lastFourDigits = phone.slice(-4);
  // 使用手机号后四位作为种子生成头像
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${lastFourDigits}`;
}
