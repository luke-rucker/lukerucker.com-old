// Thanks mdn :) https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string

export async function md5(text: string) {
  const txtAsUint8 = new TextEncoder().encode(text) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('MD5', txtAsUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array

  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
}
