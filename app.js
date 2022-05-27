const express = require('express')
const path = require('path');
const port = process.env.PORT || 3000;
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
const app = express();
app.use(connectLiveReload());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Test title'
    })
})

app.get('/users', (req, res) => {
    res.render('users', {
        title: 'Users'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/filter', (req, res) => {
    console.log('request: ', req.query.input);
    res.json({response: 'yes'});
})
