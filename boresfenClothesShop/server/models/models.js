const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketClothes = sequelize.define("basket_clothes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Clothes = sequelize.define("clothes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Size = sequelize.define("size", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const ClothesInfo = sequelize.define("clothes_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const TypeSize = sequelize.define("type_size", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketClothes);
BasketClothes.belongsTo(Basket);

Type.hasMany(Clothes);
Clothes.belongsTo(Type);

Size.hasMany(Clothes);
Clothes.belongsTo(Size);

Clothes.hasMany(BasketClothes);
BasketClothes.belongsTo(Clothes);

Clothes.hasMany(ClothesInfo, { as: "info" });
ClothesInfo.belongsTo(Clothes);

Type.belongsToMany(Size, { through: TypeSize });
Size.belongsToMany(Type, { through: TypeSize });

module.exports = {
  User,
  Basket,
  BasketClothes,
  Clothes,
  Type,
  Size,
  TypeSize,
  ClothesInfo,
};
