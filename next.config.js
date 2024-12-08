const withNextIntl = require("next-intl/plugin")("./i18n.ts");

module.exports = withNextIntl({
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/app/api/:path*',
            },
        ];
    },
    env: {
        CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_GRAPHQL_ENDPOINT: process.env.CONTENTFUL_GRAPHQL_ENDPOINT,
        CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.ctfassets.net"
            }
        ]
    }
});
