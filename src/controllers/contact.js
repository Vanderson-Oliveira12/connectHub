const ContactModel = require("../model/contact");

const mongoose = require("mongoose");

class ContactController {
  static async getAll(req, res) {

    try {
      const contacts = await ContactModel.find();
      return res.status(200).send(contacts);
    } catch(x) {
      return res.status(500).send({ message: "Erro interno do servidor!" });
    }
  }

  static async create(req, res) {

    const { name, email, phone, category } = req.body;
    const requiredFields = ['name', 'email', 'phone', 'category'];
    const missingFields = [];

    requiredFields.forEach(field => {
      if(!req.body[field]) { 
        missingFields.push(field)
      }
    })


    if(missingFields.length > 0) {
      return res.status(403).send({message: `Existem campos obrigatórios ausentes | ${missingFields.join(', ')}`})
    }

    try {
      const emailExists = await ContactModel.findOne({email: email});

      if(emailExists) {
        return res.status(409).send({message: "Email já registrado!"})
      }

      await ContactModel.create({name, email, phone, category})
      res.status(201).send({message: "Usuário criado com sucesso!"})

    } catch(err) {
      return res.status(500).send({ message: "Erro interno do servidor!" });
    }
  }

  static update() {}

  static getById() {}

  static delete() {}
}

module.exports = ContactController;
