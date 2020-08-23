import NodeRSA from 'node-rsa'
import aesjs from 'aes-js'

const { utf8, hex } = aesjs.utils

export function encryptStrings (strings:string[], public_key: string): string[] {
    const key = new NodeRSA().importKey(public_key, 'public')

    return strings.map((string) => {
        if (!string || !string.length) {
            return ''
        }

        const aes = window.crypto.getRandomValues(new Uint8Array(32))
        const text = utf8.toBytes(string)
        const aesCtr = new aesjs.ModeOfOperation.ctr(aes, new aesjs.Counter(5))
        const ciphertext = hex.fromBytes(aesCtr.encrypt(text))

        const cipherkey = key.encrypt(hex.fromBytes(aes), 'base64', 'hex')

        return `${cipherkey}:::${ciphertext}`
    })
}
