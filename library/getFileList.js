const fs = require('fs')

exports.getFileList = dir => {
    let res = []

    fs.readdirSync(dir).forEach(file => {
        const fileDir = `${dir}/${file}`
        const stat = fs.statSync(fileDir)

        if (stat && stat.isDirectory())
            res = res.concat(exports.getFileList(fileDir))
        else res.push(fileDir)
    })

    return res
}