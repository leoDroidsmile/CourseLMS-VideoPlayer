import axios from 'axios'
axios.defaults.headers.common['PLATFORM'] = 'DESKTOP';

import cryptoHelper from './crypto-helper'
export default{
    getVideo(id, token, version){
        let api = 'https://api.iq-academy.com';
        // let api = 'http://192.168.1.5/lms/public';
        
        return new Promise((resolve, reject)=>{
            
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            axios.get(api + '/video/desktop/' + id  + '?version=' + version).then(response=>{
                let data = {};

                // decrypt url
                let decrypted = cryptoHelper.decrypt(response.data.u);
                data.url = decrypted.replace('&h=1', ''); // this symbol will give our backend the ability to know that it's from desktop app
                data.update = response.data.update;
                resolve(data);

            }).catch(err=>{
                reject(err);
            })

        })
    }
}