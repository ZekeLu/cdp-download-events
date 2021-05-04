A simple demo to reproduce https://bugs.chromium.org/p/chromium/issues/detail?id=1204880.

1. modify `index.js` to specify the path to the browser (version `91.0.4472.0` or later which
   includes https://chromium-review.googlesource.com/c/chromium/src/+/2804358).
2. run `yarn install` to install `puppeteer-core`.
3. run `yarn start`

The bug is proved to be invalid. The `Browser.setDownloadBehavior` should be sent to the `browser` target
instead of the `page` target.

The information below is not valid anymore. Leave them here just for reference.

> The verbose logs look like this:
>
> ```
> ...
> puppeteer:protocol:SEND ► {"sessionId":"0E6A61B521E9DE1886B5BD71B2711485","method":"Browser.setDownloadBehavior","params":{"behavior":"allowAndName","downloadPath":"/tmp","eventsEnabled":true},"id":17} +1ms
> ...
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadWillBegin","params":{"frameId":"16C0456FC2385CF51D6111AD90443C04","guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","url":"https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Mac%2F878144%2FREVISIONS?generation=1619830882614039&alt=media","suggestedFilename":"Mac_878144_REVISIONS"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +14ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":0,"state":"inProgress"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"30732aa8-6c83-46ef-8aa2-1a0e34f1b1a7","totalBytes":110,"receivedBytes":110,"state":"completed"},"sessionId":"F4150448F05C6209AD9C69D46ECF5522"} +0ms
> ```
>
> Expect to see `Browser.downloadWillBegin` and `Browser.downloadProgress` in the log.
