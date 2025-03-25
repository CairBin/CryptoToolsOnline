import CryptoJS from "crypto-js";
import { sm3 } from "sm-crypto";

const hmac = (value, key, hash) => {
    if(hash === 'sm3'){
        return sm3(value, {
            key: Buffer.from(key, 'utf-8').toString('hex'),
        });
    }else {
        return CryptoJS['Hmac' + hash.toUpperCase()](value, key).toString(CryptoJS.enc.Hex);
    }

}

export default {
    hmac
}