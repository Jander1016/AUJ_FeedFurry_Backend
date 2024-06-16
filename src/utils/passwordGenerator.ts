
export const passwordGenerated = (): string => {
  const characters: string = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&?¡¿"
  let password: string = ""
  for (let i: number = 0; i <= 12; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return password
}