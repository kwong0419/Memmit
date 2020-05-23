const db = require("../db/index");

const getAllSubmemmits = (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "get ALL submemmits",
      body: {
          submemmits: await db.any('SELECT * FROM submemmits')
      },
    });
  } catch (error) {
    res.json({
        error: error,
    })
  }
};

const getSingleSubmemmitById = (req, res, next) => {
    try{
        const {id} = req.params;
        res.status(200).json({
            status: "Success",
            message: "got single submemmit by id: " + id,
            body: {
                submemmit: await db.one('SELECT * FROM submemmits WHERE id = $1', id)
            }
        })
    } catch(error){
        res.json({
            error: error,
        })
    }
}

const insertSingleSubmemmit = (req, res, next) => {
    try {
        const {name, owner_id} = req.body;
        res.status(200).json({
          status: "Success",
          message: "get ALL submemmits",
          body: {
              submemmits: await db.any('INSERT INTO submemmits (name, owner_id) VALUES ($1, $2) RETURNING *', [name, owner_id])
          },
        });
      } catch (error) {
        res.json({
            error: error,
        })
      }
}

const deleteSingleSubmemmit = (req, res, next) => {
    try {
        const {id} = req.params;
        res.status(200).json({
            status: "Success",
            message: "Deleted submemmit with id: " + id,
            body: {
                single_submemmit: await db.one('DELETE FROM submemmits WHERE id = $1 RETURNING *', id)
            }
        });
    } catch (error) {
        res.json({
            error: error,
        })
  }
}

module.exports = { getAllSubmemmits, getSingleSubmemmitById, insertSingleSubmemmit, deleteSingleSubmemmit }