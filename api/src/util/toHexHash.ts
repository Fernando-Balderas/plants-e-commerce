import { createHash } from 'crypto'

export default async function toHexHash(
  message: string,
  algorithm: string = 'sha256'
): Promise<string> {
  const hash = createHash(algorithm)
  hash.update(message)
  return hash.digest('hex')
}
