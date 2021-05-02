// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
    // In renderer process (web page).
    import {ipcRenderer} from 'electron';
    
    ipcRenderer.on('asynchronous-reply', (event, data) => {
        // start loading
        document.getElementById('loading').classList.remove('d-none');
        
        // hide welcome
        document.getElementById('welcome').classList.add('d-none');
        
        // set webview src
        document.getElementById('viewWrapper').classList.remove('d-none');
        
        document.getElementById('webview').setAttribute('src', data.url);

        document.getElementById('security').innerHTML = data.userId;

        // stop loading after 2 seconds
        window.setTimeout(()=>{
            document.getElementById('loading').classList.add('d-none');
            document.body.style.backgroundColor = '#121212';
        }, 1000);
    })
    ipcRenderer.send('asynchronous-message', '')
  