import db from '../../configs/database.js';

export default (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        db.user.find({}).limit(Number(req.query.limit)).skip(Number(req.query.skip)).sort({name: 1}).exec((err, response) =>{
            if (err)
                res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
            else if (response.length)
                res.status(200).json(response);
            else
                res.status(404).json({ error: "User not found" });
        })
    }catch (err) {
        res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
    }
}