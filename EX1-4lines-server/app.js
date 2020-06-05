const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req)
    res.send('<h1>Hello World</h1>')
    //process.exit()
})

server.listen(3000)