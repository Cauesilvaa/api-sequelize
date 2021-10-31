const usuario = require('../model/Usuario');
const config = require('../config/database');
const bcryptjs = require('bcryptjs');
const yup = require('yup');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const UsuarioController = {
    Users: async (req, res) => {
        /*
        const {
            cnpj
        } = req.body;
        */
        const usuarios = await usuario.findAll({
            attributes: ['nome']

            /*
            where: {
                cnpj,
                status: 'ATIVO'
            }, 
             group: ['parceiro'],
             order: [ ['status', 'asc'] ]

             offset: 1000, limit: 1000,
             */
        });
        res.status(200).send(usuarios);
    },

    Users2: async (req, res) => {
        const usuarios = await sequelize.query(`SELECT * FROM usuarios`);
        return res.json(usuarios);
    },

    InsertUser: async (req, res) => {

        // Validação token com yup schema
        // Não entendi p q ela serve kkkkkkkk mas segundo o tutorial é importante ter
        let schema = yup.object().shape({
            nome: yup.string().required(),
            senha: yup.string().required(),
            cpf: yup.string().required()
        });

        // se esse retorno for 'false'
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({message:"Dados invalidos"})
        }
        // Fim validação token

        const data = {
            nome,
            senha,
            cpf
        } = req.body;

        // Verificando se o usuario ja existe
        const userExist = await usuario.findOne({
            where: { cpf }
        })

        if (userExist){
            return res.status(400).json({ message:"Usuario existente" }); 
        }

        // Tornando a senha cryptografada
        // Passando no 'hash(senha, quantos caracteres vai gerar)'
        data.senha = await bcryptjs.hash(senha, 8);

        const IncluirUsuario = await usuario.create({
            nome: data.nome,
            senha: data.senha,
            cpf: data.cpf,
            token: ''
        });

        return res.status(200).send(IncluirUsuario);
    },

    AlterUser: async (req, res) => {
        const {
            id,
            nome,
            senha
        } = req.body

        try {

            const BuscaUsuario = await usuario.findOne({
                where: {
                    id
                }
            })

            if (!BuscaUsuario) {
                return res.send("Usuario inexistente")
            }

            BuscaUsuario.nome = nome
            BuscaUsuario.senha = senha

            BuscaUsuario.save()
            return res.status(200).json(BuscaUsuario)

        } catch (error) {
            console.log(error)
        }
    },

    Login: async (req, res) => {
        const {nome, senha} = req.body;

        const userExist = await usuario.findOne({
            where: { nome }
        })

        if (!userExist){
            return res.status(400).json({ message:"Usuario não existe" }); 
        }
    }
};

module.exports = UsuarioController;
