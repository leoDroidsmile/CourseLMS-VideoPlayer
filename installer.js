var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './CourseLMS Video Player-win32-ia32',
    // Specify the existing folder where 
    outputDirectory: './installer',
    // The name of the Author of the app (the name of your company)
    authors: 'CourseLMS',
    // The name of the executable of your built
    exe: './courselmsvideoplayer.exe',
    setupIcon: './public/assets/icon.ico'
};

resultPromise = electronInstaller.createWindowsInstaller(settings);
 
resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Error: ${e.message}`)
});