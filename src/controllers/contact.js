const mongoose = require("mongoose");
const ContactModel = require("../model/contact");


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

  static async update(req, res) {
    
    const body = req.body;
    const contactId = req.params.id;
    let email = body.email;

    const isValidID = mongoose.Types.ObjectId.isValid(contactId);
    if(!isValidID) return res.status(400).send({message: "ID de usuário inválido"});
 
    const userExits = await ContactModel.findById(contactId);
    if(!userExits) return res.status(403).send({message: "Usuário não encontrado!"});
    if(email) {
      const emailExists = await ContactModel.findOne({email: email});
      if(emailExists) {
        if(emailExists.email == email) return res.status(400).send({message: "Você não pode registrar o seu mesmo e-mail de acesso!"})
      }
      if(emailExists) return res.status(400).send({email: "Você não pode registrar esse E-mail, pois ele já está em uso!"})
    }

    try {
      await ContactModel.findByIdAndUpdate(contactId, {...body});

      res.status(201).send({message: "Usuário editado com sucesso!"});

    } catch(err) {
      res.status(500).send({message: "Erro interno do servidor!"});
    }
  }

  static getById() {}

  static async delete(req, res) {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if(!isValidId) return res.status(400).send({message: "Esse ID informado, não é válido!"});

    try {
      const userExists = await ContactModel.findById(id);

      if(!userExists) return res.status(400).send({message: "Esse usuário não existe!"});

      await ContactModel.findByIdAndDelete(id);

      res.status(200).send({message: "Usuário excluído com sucesso!"})
  
    } catch(err) {
      res.status(500).send({message: "Erro interno do servidor!"});
    }


  }
}

module.exports = ContactController;
