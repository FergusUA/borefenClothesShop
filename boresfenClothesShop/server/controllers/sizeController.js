const {Size, Type} = require('../models/models')
class SizeController {
    async create(req, res) {
      const {name} = req.body
      const size = await Size.create({name})
      return res.json(size)
    }
  
    async getAll(req, res) {
      const sizes = await Size.findAll();
      return res.json(sizes);
    }

    async delete(req, res) {}
  }
  
  module.exports = new SizeController();
  