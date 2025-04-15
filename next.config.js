/** @type {import('next').NextConfig} */
const nextConfig = {
    // Attempted to disable webpack devtools which uses eval and violates csp.
    // webpack: (config, {dev}) =>
    // {
    //     if(dev) {
    //         config.devtool = 'cheap-module-source-map'
    //     }
    //     return config
    // }
}

module.exports = nextConfig
