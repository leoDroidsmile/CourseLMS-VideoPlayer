export default {
    getLink(){
        let deepUrl;

        if (process.platform == "win32") {
            deepUrl = this.getLinkWin();
        }
        
        // testing
        // deepUrl = 'iqacademyplayer://?videoId=254&token=iEAsXxCcEFFKk9rEAm64yOq63S25lsUbV0c4bZnrjFdi9ZWmKFWNul0MA9Sm';
        
        if (deepUrl.search("iqacademyplayer") == -1){
            return null;
        }
        let url = new URL(deepUrl);
        return {
            id: url.searchParams.get('videoId'),
            token: url.searchParams.get('token')
        }
    },
    getLinkWin(){
        let deepUrl = process.argv.slice(1).toString();
        deepUrl = deepUrl.replace(/%20/g, " ");
        return deepUrl ? deepUrl : null;
    },
    getLinkMac(){

    }
}