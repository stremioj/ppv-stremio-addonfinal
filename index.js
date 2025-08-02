const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "ppv.stream.addon",
    version: "1.0.0",
    name: "PPV Stream Addon",
    description: "Direct m3u8 stream with headers",
    resources: ["stream"],
    types: ["movie"],
    catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(() => {
    return Promise.resolve({
        streams: [
            {
                title: "Live PPV Stream",
                url: "https://5nhp186eg31fofnc.chinese-restaurant-api.site/v3/variant/VE1AO1NTbu8mbv12LxEWM21ycrNWYyR3LhhTZ1UzMmlzN3gTMtEGOihTL3EGN00yY4UWYtIjY5YjN2YTZ/master.m3u8",
                behaviorHints: {
                    proxyHeaders: {
                        request: {
                            "Referer": "https://ppv.to",
                            "User-Agent": "Mozilla/5.0"
                        }
                    }
                }
            }
        ]
    });
});

module.exports = async (req, res) => {
    const handler = builder.getInterface();
    const response = await handler(req);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(response));
};
