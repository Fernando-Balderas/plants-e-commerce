import { cryptoHexHash } from './hashing'

export function isPasswordCorrect(provided: string, correct: string): boolean {
  let matched = provided.length === correct.length
  for (let i = 0; i < correct.length; i++) {
    if (provided[i] !== correct[i]) matched = false
  }
  return matched
}

export function timeConstantCompare(s1: string, s2: string): boolean {
  const h1 = cryptoHexHash(s1)
  const h2 = cryptoHexHash(s2)
  let accum = 0
  for (let i = 0; i < h1.length; i++) {
    accum |= h1.charCodeAt(i) ^ h2.charCodeAt(i)
  }
  return accum == 0
}
