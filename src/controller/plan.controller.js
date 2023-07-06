import db from "../config/db.js";

export async function getPlans(req, res) {
  try {
    const result = await db.query("select * from plan");

    res.send(result.rows);
    result.rows.n
  } catch (error) {
    res.status(400).send({ message: error.message });
    console.log(error);
  }
}


// orm -> object 
// orm -> tayyor methods
// orm -> biroz sekin, 
// orm organish, lekin 90  
