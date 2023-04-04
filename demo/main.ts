import { PreviewController } from "..";

const files = {
  "/index.html": `<html>
  <head>
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    Hello world!
  </body>
</html>`,
  "/styles.css": "body { background: purple; color: white; }",
};

function makeAnIframe(url: string) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("src", url);
  iframe.style.width = "1000px";
  iframe.style.height = "1000px";
  document.body.appendChild(iframe);
}

async function run() {
  const previewController = new PreviewController({
    baseUrl: "https://zhk6yt-3000.preview.csb.app/",
    getFileContent: (filepath) => {
      console.log("request file content", filepath);
      return files[filepath];
    },
  });

  const previewUrl = await previewController.initPreview();
  makeAnIframe(previewUrl);
}

run().catch(console.error);
