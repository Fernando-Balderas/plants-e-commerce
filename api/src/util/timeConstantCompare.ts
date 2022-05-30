import toHexString from './subtleCryptoDigest'

export default async function timeConstantCompare(
  s1: string,
  s2: string
): Promise<boolean> {
  const h1 = await toHexString(s1)
  const h2 = await toHexString(s2)
  let accum = 0
  for (let i = 0; i < h1.length; i++) {
    accum |= h1.charCodeAt(i) ^ h2.charCodeAt(i)
  }
  return accum == 0
}
