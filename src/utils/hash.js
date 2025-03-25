import CryptoJS from "crypto-js";
import md2 from "js-md2";
import md4 from 'js-md4';
import {sm3} from "sm-crypto";
import { sha3_224, sha3_256, sha3_384, sha3_512, keccak224, keccak256,keccak384, keccak512 } from "js-sha3";
const EncodeType = CryptoJS.enc;

const hash = (value, algorithm) => {
    if(algorithm === 'md2'){
        return md2(value);
    }else if(algorithm === 'md4'){
        return md4(value);
    }
    else if(algorithm ==='sm3'){
        return sm3(value);
    }else if(algorithm === 'sha3_224'){
        return sha3_224(value);
    }else if(algorithm ==='sha3_256'){
        return sha3_256(value); 
    }
    else if(algorithm ==='sha3_384'){
        return sha3_384(value); 
    }
    else if(algorithm ==='sha3_512'){
        return sha3_512(value); 
    }
    else if(algorithm ==='keccak224'){
        return keccak224(value);
    }
    else if(algorithm ==='keccak256'){
        return keccak256(value);
    }
    else if(algorithm ==='keccak384'){
        return keccak384(value);
    }
    else if(algorithm ==='keccak512'){
        return keccak512(value);
    }
    else
        return CryptoJS[algorithm.toUpperCase()](value).toString(EncodeType.Hex);
}

export default {
    hash,
    EncodeType
}