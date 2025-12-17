# Static browser server

A simple service worker used for the static template in sandpack, allowing users to develop websites like they would locally in the browser.

# Docker Build

Build docker image using the follow build command

```
docker buildx build --platform linux/amd64 -t static-browser-server:0.1.0 .
```

Run the docker image as follows
```
docker run --rm -p 8080:80 static-browser-server:0.1.0
```

Test by visiting the following address, you should see some HTML.
```
curl http://localhost:8080
```

In production you need to put this service behind a wildcard DNS record so dynamic URLs can be generated, that is beyond the scope of this doc.
