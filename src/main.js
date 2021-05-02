// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')

import handler from './modules/handler'
import installer from './modules/installer'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    
    if (installer.handleSquirrelEvent(app)){
        // this to set desktop icon, shortcuts, update .. etc on installation
        // squirrel event handled and app will exit in 1000ms, so don't do anything else
        return;
    }

    handler.createWindow()
    handler.deepVideoHandler()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

// set protocol for deep linking
app.setAsDefaultProtocolClient('courselmsvideoplayer');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

