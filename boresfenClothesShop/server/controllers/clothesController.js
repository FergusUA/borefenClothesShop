const uuid = require("uuid");
const path = require("path");
const { Clothes, ClothesInfo } = require("../models/models");
const ErrorTool = require("../error/ErrorTool");

class ClothesController {
  async create(req, res, next) {
    try {
      let { name, price, sizeId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const clothes = await Clothes.create({
        name,
        price,
        sizeId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          ClothesInfo.create({
            title: i.title,
            description: i.description,
            clothesId: clothes.id,
          })
        );
      }

      return res.json(clothes);
    } catch (e) {
      next(ErrorTool.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let {sizeId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let clothes;
        if (!sizeId && !typeId) {
          clothes = await Clothes.findAndCountAll({limit, offset})
        }
        if (sizeId && !typeId) {
          clothes = await Clothes.findAndCountAll({where:{sizeId}, limit, offset})
        }
        if (!sizeId && typeId) {
          clothes = await Clothes.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (sizeId && typeId) {
          clothes = await Clothes.findAndCountAll({where:{typeId, sizeId}, limit, offset})
        }
        return res.json(clothes)
  }

  async getOne(req, res, next) {}

  async delete(req, res) {}
}

module.exports = new ClothesController();
