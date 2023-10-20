const { pool } = require("../database");


const getBook = async (req, res) => {

    let sql = `SELECT * FROM book WHERE id_user = ${req.query.id_user};`

    try {
        let result = await pool.query(sql);
        res.send(result);
    }
    catch(err){
        console.log(err);
    }
}

const getBookId = async (req, res) => {

    const userId = req.query.id_user;
    const bookId = req.query.id_book;

    let sql = 'SELECT * FROM book WHERE id_user = ? AND id_book = ?';

    try {
        let result = await pool.query(sql, [userId, bookId]);
        res.send(result);
    }
    catch(err){
        console.log(err);
    }
}

const postBook = async (req, res) =>
 {

    try 
    {

        let sql = "INSERT INTO book (id_user, title, type, author, price, photo) " + 
                  "VALUES ('" + req.body.id_user + "', '" +
                                req.body.title + "', '" +
                                req.body.type + "', '" +
                                req.body.author + "', '" +
                                req.body.price + "', '" +
                                req.body.photo + "')";
        
        console.log(sql);
        let [result] = await pool.query(sql);
        console.log(result);

        if (result.insertId)
           res.send(String(result.insertId));

        else
          res.send("-1");
    }
    catch(err)
    {
        console.log(err);
    }
 } 

 const putBook = async (req, res) =>
 {
     try
     {   
         console.log(req.body);
         let params = [req.body.title,
                       req.body.type,
                       req.body.author,
                       req.body.price,
                       req.body.photo,
                       req.body.id_book,
                       req.body.id_user]
 
         let sql = "UPDATE book SET title = COALESCE(?, title) , " + 
                                    "type = COALESCE(?, type), " +
                                    "author = COALESCE(?, author), " +
                                    "price = COALESCE(?, price), " +
                                    "photo = COALESCE(?, photo) WHERE id_book = ? AND id_user = ?";

         console.log(sql);
         let [result] = await pool.query(sql, params);
         res.send(result); 
     }
     catch(err)
     {
         console.log(err)
     }
 }

 const deleteBook = async (req, res) =>
 {

    try 
    {
        console.log(req.body);
        let sql = "DELETE FROM book WHERE id_book = ?";
        console.log(sql);
        let [result] = await pool.query(sql, [req.body.id_book]);
        res.send(result);
    }
    catch(err)
    {
        console.log(err);
    }
 } 
 
module.exports = {getBook, getBookId, postBook, putBook, deleteBook}
