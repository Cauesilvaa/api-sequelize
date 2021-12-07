const express = require('express');
const routes = express.Router();
const UsuarioController = require('./controller/UsuarioController');
const AuthMidleware = require('../src/midleware/AuthMidleware')

//Para upload de arquivo
const multer = require('multer');
const path = require('path'); 
const {uuid} = require('uuidv4');
const uploadsFolder = path.resolve(__dirname, './uploads');
const upload = multer({
    Storage: multer.diskStorage({
        destination: uploadsFolder,
        filename: (req, file, callback) => callback(console.log('erro'), uuid() + file.originalname)
    })
    //dest: './uploads'
});

//Retorna o arquivo - no postman: localhost:8080/getFiles/"nomearquivo.extencao"
routes.use('/getFiles', express.static(uploadsFolder));

routes.get('/', (req, res)=> {
    res.send('Hello world!')
});

//Rota de upload de arquivo
routes.post('/upload', upload.single('file'), (req, res) => {
    res.send('Foi');
});

routes.get('/user', AuthMidleware, UsuarioController.Users);
routes.get('/user2', AuthMidleware, UsuarioController.Users2);
routes.post('/user/insert',  UsuarioController.InsertUser);
routes.post('/user/alter', AuthMidleware, UsuarioController.AlterUser);
routes.post('/user/login', UsuarioController.Login);

// Exportando o 'routes' para poder usar ela em toda aplicação
// Ex: To chamando o routes em 'server.js'
module.exports = routes;