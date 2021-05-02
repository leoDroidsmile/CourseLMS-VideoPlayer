const {app, ipcMain, BrowserWindow} = require('electron')
const path = require('path')
import video from './video'
import deep from './deep'

export default {
    mainWindow: null,
    createWindow () {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({
            width: 1200,
            height: 900,
            minWidth: 800,
            minHeight: 600,
            backgroundColor: '#fff', // #23AFB1
            webPreferences: {
                webviewTag: true,
                nodeIntegration: true,
                plugins: true,
                preload: path.join(__dirname, 'public/preload.js')
            }
        })
        this.mainWindow.setMenu(null)
    
        // and load the index.html of the app.
        this.mainWindow.loadFile('public/index.html')
    
        // set content protection (no record / screen shots)
        this.mainWindow.setContentProtection(true)
    
        // Open the DevTools (testing)
        this.mainWindow.webContents.openDevTools()
    },
    
    
    // deep linking, get video, decrypt .. etc
    deepVideoHandler(){
        // check if user comes from 'website' by deep linking:
        let linkData = deep.getLink();
        
        // testing
    
        // let linkData = {
        //     id: 254,
        //     token: 'iEAsXxCcEFFKk9rEAm64yOq63S25lsUbV0c4bZnrjFdi9ZWmKFWNul0MA9Sm',
        // };
        
        // if user comes from 'website':
        if (linkData){
            // listen for msg from renderer process (js of index.html) to send reply with the url of iframe
            ipcMain.on("asynchronous-message", (event)=>{
                
                // get url from api, decrypt it .. etc (in modules/video.js)
                let appVersion = app.getVersion();
                video.getVideo(linkData.user, linkData.class, appVersion).then(data=>{
                    
                    if (data.update){
                        // app version is old and user must update
                        this.mainWindow.loadFile('public/update.html')
    
                    }else{
                        // reply with "url" of iframe
                        event.reply('asynchronous-reply', data.url);
                    }
    
                }).catch(err=>{
                    
                    this.error(1);
                });
                // event.reply('asynchronous-reply', linkData.videoUrl);

            });
                        
        }else{
            // no deep linking, just welcome page will appear!
        }
    },
    

    error(n=0){
        
        let response = dialog.showMessageBox({
            type: "error", 
            message: "حدث خطأ في الإتصال، تواصل مع الدعم (" + n + ")", // API returned false or error
            buttons: ["اغلاق"]
        });
            // after error msg close app
        if (response == 0) {
            //close APP
            app.quit();
        }
    }
}