const {
  Basket,
  BasketClothes,
  Clothes,
  ClothesInfo,
} = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
class BasketController {
  async addClothes(req, res) {
    try {
      const { id } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketClothes.create({ basketId: basket.id, clothesId: id });
      return res.json("Товар додан");
    } catch (e) {
      console.error(e);
    }
  }

  async getClothes(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = await Basket.findOne({ where: { userId: user.id } });
      const basket = await BasketClothes.findAll({ where: { basketId: id } });

      const basketArr = [];
      for (let i = 0; i < basket.length; i++) {
        const basketClothes = await Clothes.findOne({
          where: {
            id: basket[i].clothesId,
          },
          include: {
            model: ClothesInfo,
            as: "info",
            where: {
              clothesId: basket[i].clothesId,
              [Op.or]: [
                {
                  clothesId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });
        basketArr.push(basketClothes);
      }

      return res.json(basketArr);
    } catch (e) {
      console.error(e);
    }
  }
}
module.exports = new BasketController();
