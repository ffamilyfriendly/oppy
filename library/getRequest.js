const https = require('https')

module.exports = url => new Promise((resolve, reject) => {
    https.get(url, res => {
        let data = ''

        res.on('data', chunk => data += chunk)
        res.on('end', () => resolve(JSON.parse(data)))
    }).on('error', reject)
})