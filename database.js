const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.createTable();
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `;
    this.db.run(sql);

    const sql2 = `
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        codigo TEXT,
        preco decimal(12, 3)
      )
    `;
    this.db.run(sql2);

    const insertsProdutos = `
      INSERT INTO products (nome, codigo, preco) VALUES ('produto teste', 'ptest-1', 123.50)
    `;
    this.db.run(insertsProdutos);

    const sql3 = `
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        json TEXT
      )
    `;

    this.db.run(sql3);
  }

  selectAllProducts(callback) {
    const sql = `
      SELECT * FROM products
    `;

    this.db.all(sql, [], callback);
  }

  insertVenda(order, callback) {
    console.log(JSON.stringify(order));
    const sql = `
      INSERT INTO orders (json) VALUES (?)
    `;

    this.db.run(sql, [JSON.stringify(order)], callback);
  }

  selectAllOrders(callback) {
    const sql = `
      SELECT * FROM orders
    `;

    this.db.all(sql, [], callback);
  }

  deleteVenda(id, callback) {
    const sql = `
      DELETE FROM orders WHERE id = ?
    `;

    this.db.run(sql, [id], callback);
  }

  insertProduct(product, callback) {
    const sql = `
      INSERT INTO products (nome, codigo, preco) VALUES (?, ?, ?)
    `;

    this.db.run(sql, [product.nome, product.codigo, product.preco], callback);
  }
}

module.exports = Database;
