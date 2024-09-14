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
});