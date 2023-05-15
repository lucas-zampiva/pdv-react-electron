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
  }

  selectAll(callback) {
    const sql = `
      SELECT * FROM users
    `;

    this.db.all(sql, [], callback);
  }

  selectOne(id, callback) {
    const sql = `
      SELECT * FROM users WHERE id = ?
    `;

    this.db.get(sql, [id], callback);
  }

  insert(user, callback) {
    const sql = `
      INSERT INTO users (name, email) VALUES (?, ?)
    `;

    this.db.run(sql, [user.name, user.email], callback);
  }

  update(user, callback) {
    const sql = `
      UPDATE users SET name = ?, email = ? WHERE id = ?
    `;

    this.db.run(sql, [user.name, user.email, user.id], callback);
  }

  delete(id, callback) {
    const sql = `
      DELETE FROM users WHERE id = ?
    `;

    this.db.run(sql, [id], callback);
  }

  selectAllProducts(callback) {
    const sql = `
      SELECT * FROM products
    `;

    this.db.all(sql, [], callback);
  }
}

module.exports = Database;