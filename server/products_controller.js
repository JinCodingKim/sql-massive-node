module.exports = {
  create(req, res, next) {
    const db = req.app.get("db");
    const { name, description, price, imageurl } = req.body;
    db
      .create_product([name, description, price, imageurl])
      .then(products => {
        return res.status(200).json(products);
      })
      .catch(() => res.status(500).send());
  },

  getAll(req, res, next) {
    const db = req.app.get("db");
    db
      .read_products()
      .then(products => {
        return res.status(200).json(products);
      })
      .catch(() => res.status(500).send());
  },

  getOne(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db
      .read_product([id])
      .then(products => {
        res.status(200).json(products);
      })
      .catch(() => res.status(500).send());
  },

  update(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    const { desc } = req.query;
    db
      .update_product([id, desc])
      .then(products => {
        res.status(200).json(products);
      })
      .catch(() => res.status(500).send());
  },

  delete(req, res, next) {
    const db = req.app.get("db");
    const { id } = req.params;
    db
      .delete_product([id])
      .then(products => {
        res.status(200).json(products);
      })
      .catch(console.log);
  }
};
