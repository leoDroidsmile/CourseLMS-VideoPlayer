import axios from 'axios'
axios.defaults.headers.common['PLATFORM'] = 'DESKTOP';

import cryptoHelper from './crypto-helper'
export default{
    getVideo(userId, classId, version){
        // let api = 'https://api.iq-academy.com';
        // let api = 'http://192.168.1.5/lms/public';
        let api = 'http://lms.olmaa.net/api/v1/';
        
        return new Promise((resolve, reject)=>{
            
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            
            axios.get(api + 'contentWithVideo' + '?version=' + version + '&userId=' + userId + '&contentId=' + classId).then(response=>{
                let data = {};

                // decrypt url
                // let decrypted = cryptoHelper.decrypt(response.data.u);
                // data.url = decrypted.replace('&h=1', ''); // this symbol will give our backend the ability to know that it's from desktop app
                // data.update = response.data.update;
                if(response.data.provider.search("Vimeo") != -1)
                    response.data.url = "https://vimeo.com/" + response.data.url;

                resolve(response.data);

            }).catch(err=>{
                reject(err);
            })

        })
    }
}