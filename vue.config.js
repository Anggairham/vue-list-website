module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-list-website/'
    : '/'
    // ,devServer: {
    //     proxy: 'http://localhost:3000'
    // }
}