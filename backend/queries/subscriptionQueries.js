const db = require("../db/index");

const getAllSubscriptions = (req, res, next) => {
  try {
      res.status(200).json({
          status: 'Success',
          message: 'got all subscriptions',
          body: {
              subscriptions: await db.any('SELECT * FROM subscriptions')
          }
      })
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const insertSingleSubscription = (req, res, next) => {
    try{
        const { submemmitID, userID } = req.body
        res.status(200).json({
            status: 'Success',
            message: 'User: ' + id + ' subscribed to submemmit: ' + submemmitID,
            body: {
                single_subscription: await db.one('INSERT INTO subscriptions (submemmitID, userID) VALUES ($1, $2) RETURNING *', [submemmitID, userID])
            }
        })
    } catch(error) {
        res.json({
            error: error
        })
    }
}

const deleteSingleSubscription = (req, res, next) => {
    try{
        const {id} = req.params;
        res.status(200).json({
            status: 'Success',
            message: 'User: ' + id + ' unsubscribed from submemmit: ' + submemmitID,
            body: {
                single_unsubscription: await db.one('DELETE FROM subscriptions WHERE id = $1 RETURNING *', id)
            }
        })
    } catch(error){
        res.json({
            error: error
        })
    }
}


module.exports = {getAllSubscriptions, insertSingleSubscription, deleteSingleSubscription }