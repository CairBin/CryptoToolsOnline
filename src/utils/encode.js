import { Base64 } from "js-base64";
import * as base32 from 'base32.js';
import CryptoJS from 'crypto-js';
// 自定义 Base32 编码函数
function hexToBase32(hex) {
    const words = CryptoJS.enc.Hex.parse(hex);
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let binary = '';
    for (let i = 0; i < words.sigBytes; i++) {
        const byte = (words.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        binary += byte.toString(2).padStart(8, '0');
    }
    let base32 = '';
    for (let i = 0; i < binary.length; i += 5) {
        const segment = binary.slice(i, i + 5);
        const index = parseInt(segment, 2);
        base32 += base32Chars[index];
    }
    return base32;
}

// 十六进制转 Base64 函数
function hexToBase64(hex) {
    const words = CryptoJS.enc.Hex.parse(hex);
    return CryptoJS.enc.Base64.stringify(words);
}

const utf8ToHex = (value) => {
    return Buffer.from(value, 'utf8').toString('hex');
}

const hexToUtf8 = (value) => {
    return Buffer.from(value, 'hex').toString('utf8');
}

const utf8ToBase64 = (value) => {
    return Base64.encode(value);
}

const base64ToUtf8 = (value) => {
    return Base64.decode(value); 
}


const utf8ToBase32 = (value) => {
    let buffer = new TextEncoder().encode(value);
    const encoder = new base32.Encoder();
    return encoder.write(buffer).finalize();
}

const base32ToUtf8 = (value) => {
    // 将Base32字符串解码为普通字符串
    const decoder = new base32.Decoder();
    const byteArray = decoder.write(value).finalize();
    // 将字节数组转换为字符串
    return (new TextDecoder('utf-8').decode(new Uint8Array(byteArray)));
}

const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// Base32 解码函数
function base32Decode(base32) {
    let binary = '';
    for (let i = 0; i < base32.length; i++) {
        const index = base32Chars.indexOf(base32[i]);
        binary += index.toString(2).padStart(5, '0');
    }
    let bytes = [];
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        if (byte.length === 8) {
            bytes.push(parseInt(byte, 2));
        }
    }
    return CryptoJS.lib.WordArray.create(bytes);
}


const switchEncode = (value, from, to) => {
    let words;
    switch (from) {
        case 'utf-8':
            words = CryptoJS.enc.Utf8.parse(value);
            break;
        case 'base32':
            words = base32Decode(value);
            break;
        case 'base64':
            words = CryptoJS.enc.Base64.parse(value);
            break;
        case 'hex':
            words = CryptoJS.enc.Hex.parse(value);
            break;
        default:
            throw new Error(`不支持的编码类型: ${from}`);
    }

    switch (to) {
        case 'utf-8':
            return CryptoJS.enc.Utf8.stringify(words);
        case 'base32':
            let binary = '';
            for (let i = 0; i < words.sigBytes; i++) {
                const byte = (words.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                binary += byte.toString(2).padStart(8, '0');
            }
            let base32 = '';
            for (let i = 0; i < binary.length; i += 5) {
                const segment = binary.slice(i, i + 5);
                const index = parseInt(segment, 2);
                base32 += base32Chars[index];
            }
            return base32;
        case 'base64':
            return CryptoJS.enc.Base64.stringify(words);
        case 'hex':
            return CryptoJS.enc.Hex.stringify(words);
        default:
            throw new Error(`不支持的编码类型: ${to}`);
    }
}

export default {
    utf8ToHex,
    hexToUtf8,
    utf8ToBase64,
    base64ToUtf8,
    base32ToUtf8,
    utf8ToBase32,
    switchEncode,
    hexToBase32,
    hexToBase64
}