const express = require('express')
const path = require('path');
const port = process.env.PORT || 3000;
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const api = require('./api.js');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
const app = express();
app.use(connectLiveReload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', [
//     express.static(__dirname + '/node_modules/bootstrap/dist/css'),
//     express.static(__dirname + '/node_modules/jquery/dist/'),
//     express.static(__dirname + '/node_modules/datatables.net-bs5/js'),
//     express.static(__dirname + '/node_modules/datatables.net-bs5/css'),
//     express.static(__dirname + '/node_modules/datatables.net/js'),
// ]);


app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Test title'
    })
})

app.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use('/api', api);
