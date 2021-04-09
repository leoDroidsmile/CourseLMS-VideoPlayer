import CryptoJS from 'crypto-js'
const CryptoJSAesJson = {
    stringify(cipherParams) {
        var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
        if (cipherParams.iv) j.iv = cipherParams.iv.toString();
        if (cipherParams.salt) j.s = cipherParams.salt.toString();
        return JSON.stringify(j);
    },
    parse(jsonStr) {
        var j = JSON.parse(jsonStr);
        var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
        if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
        if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
        return cipherParams;
    },
};
const sc = 'EB7-@IqAcademy4'; // secret 
export default {
    encrypt(value){
        return CryptoJS.AES.encrypt(JSON.stringify(value), sc, {format: CryptoJSAesJson}).toString();
    },
    decrypt(encrypted){
        return JSON.parse(CryptoJS.AES.decrypt(encrypted, sc, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
    }
}