export default {
    getLink(){
        let deepUrl;

        if (process.platform == "win32") {
            deepUrl = this.getLinkWin();
        }
        
        // testing
        // deepUrl = 'iqacademyplayer://?videoId=254&token=iEAsXxCcEFFKk9rEAm64yOq63S25lsUbV0c4bZnrjFdi9ZWmKFWNul0MA9Sm';
        // deepUrl = 'courselmsvideoplayer://video/?user=2&class=1';
        if (deepUrl.search("courselmsvideoplayer") == -1){
            return null;
        }
        let url = new URL(deepUrl);
        return {
            user : url.searchParams.get('user'),
            class: url.searchParams.get('class'),
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