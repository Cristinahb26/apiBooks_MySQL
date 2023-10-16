const { pool } = require("../database");


const postRegister = async (req, res) =>
{

   try 
   {

       let sql = "INSERT INTO user (name, last_name, email, password, photo) " + 
                 "VALUES ('" + req.body.name + "', '" +
                               req.body.last_name + "', '" +
                               req.body.email + "', '" +
                               req.body.password + "', '" +
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

const postLogin = async (req, res) =>
{
   const { email, password } = req.body;

   try 
   {

       let sql = "SELECT id_user, name, last_name, email, photo FROM user WHERE email = ? AND password = ?";
       
       let [result , data] = await pool.query(sql, [email, password]);
       console.log(result);
       res.send(result);
       

}
catch(err)
{
    console.log(err);
}
} 
module.exports = {postRegister, postLogin};