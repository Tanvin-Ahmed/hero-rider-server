module.exports.config = {
  db_uri: process.env.DB_URI,
  users_collection: process.env.USERS_COLLECTION,
  admins_collection: process.env.ADMINS_COLLECTION,
  purchase_collection: process.env.PURCHASE_COLLECTION,
  admin_collection: process.env.ADMIN_COLLECTION,
  jwt_secret: process.env.JWT_SECRET,
};
