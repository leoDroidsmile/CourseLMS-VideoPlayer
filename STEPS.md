- user click, deep linking to app with param (videoId, userId)
- send request to API (params: videoId, userId, version of app) to get video, and log this transcation with userId
- if version not supported, return update, else return video url encrypted
- decrypt video url then set to webview

- stop capture or record flag