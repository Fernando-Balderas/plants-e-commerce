import { createHash } from 'crypto'
import * as bcrypt from 'bcrypt'

export function cryptoHexHash(
  message: string,
  algorithm: string = 'sha256'
): string {
  const hash = createHash(algorithm)
  hash.update(message)
  return hash.digest('hex')
}

export async function toHash(password: string, saltOrRounds = 8) {
  const p = await bcrypt.hash(password, saltOrRounds)
  const h = await p
  return h
}

export async function isHashMatch(str: string, hash: string) {
  return await bcrypt.compare(str, hash)
}
