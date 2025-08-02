const express = require("express");
const { addonBuilder } = require("stremio-addon-sdk");

const app = express();

const manifest = {
    id: "custom.stream.addon",
    version: "1.0.0",
    name: "My Custom Stream",
    description: "Direct m3u8 stream",
    resources: ["stream"],
    types: ["movie"],
    catalogs: []
};

const builder = new addonBuilder(manifest);

// Use the addon interface (serves /manifest.json and /stream/...)
app.use("/", builder.getInterface());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Stremio Addon running at http://localhost:${port}`));
