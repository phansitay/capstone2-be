export class CommonUtil {
  static randomString(len, charSet?) {
    charSet =
      charSet ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  static randomStr() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
  }
  static getSecretRefreshToken(secret: string) {
    return `${secret}_rf`;
  }
}
