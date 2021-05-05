A simple demo to reproduce https://bugs.chromium.org/p/chromium/issues/detail?id=1204880.

1. modify `index.js` to specify the path to the browser (version `91.0.4472.0` or later which
   includes https://chromium-review.googlesource.com/c/chromium/src/+/2804358).
2. run `yarn install` to install `puppeteer-core`.
3. run `yarn start`

**Update on May 5, 2021**:

The Chromium team decided to make it work with frame target too. See https://chromium.googlesource.com/chromium/src/+/4681bc7cd33fe8b42dac32c59487f13b752e789e.
So now it's valid to send the `Browser.setDownloadBehavior` command to the `page` target.

Here are the logs for Chromium `92.0.4499.0 (Developer Build) (x86_64)`:

```
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadWillBegin","params":{"frameId":"A3EC1EEFE211DE43DC19B2F2FE3C5EE6","guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","url":"https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Mac%2F878144%2FREVISIONS?generation=1619830882614039&alt=media","suggestedFilename":"Mac_878144_REVISIONS"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +18ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadWillBegin","params":{"frameId":"A3EC1EEFE211DE43DC19B2F2FE3C5EE6","guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","url":"https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Mac%2F878144%2FREVISIONS?generation=1619830882614039&alt=media","suggestedFilename":"Mac_878144_REVISIONS"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":0,"state":"inProgress"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":0,"state":"inProgress"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +1ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"inProgress"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Browser.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"completed"},"sessionId":"A33023AB81BBB7B3716BB1B2DD7BA36A"} +0ms
puppeteer:protocol:RECV ◀ {"method":"Page.downloadProgress","params":{"guid":"e7dcf203-a280-4e88-ad01-251cd27fb95e","totalBytes":110,"receivedBytes":110,"state":"completed"},"sessionId":"4CB3ADB42388F431A8562D41479E60D7"} +0ms
```


<del>The bug is proved to be invalid. The `Browser.setDownloadBehavior` should be sent to the `browser` target
instead of the `page` target.</del>

<del>The information below is not valid anymore. Leave them here just for reference.</del>

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
