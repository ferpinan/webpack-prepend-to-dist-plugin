'use strict'

const fs = require('fs');

var prependFile = require('prepend-file');

class PrependToDist {
    constructor(textToPrepend, path) {
        this.textToPrepend = textToPrepend;
        this.path = path;
    }

    apply(compiler) {
        compiler.plugin('done', compilation => {
            fs.readdir(this.path, (err, files) => {
                files.forEach(file => {
                    var filePath = this.path + "/" + file;
                    var fileStat = fs.lstatSync(filePath);
                    if(fileStat.isFile() && (file.endsWith(".js") || file.endsWith(".css"))){
                        try{
                            prependFile.sync(filePath, this.textToPrepend);
                        }catch(err){
                            console.log(err);
                        }
                    }
                });
            });
        })
    }
}

module.exports = PrependToDist;
