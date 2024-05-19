import { customAlphabet } from 'nanoid'

const nanoIdCustomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const getNanoId = (): string => {
  const nanoid = customAlphabet(nanoIdCustomChars, 10)
  return nanoid()
}
