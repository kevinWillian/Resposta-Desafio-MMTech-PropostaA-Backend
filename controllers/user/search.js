import db from '../../configs/database.js';


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const keyWord = escapeRegExp(req.query.keyWord);
    var regexObj = new RegExp(keyWord, 'i');
    db.user.find({$or: [{name: regexObj},{email: regexObj},{phone: regexObj}]})
    .skip(Number(req.query.skip))
    .limit(Number(req.query.limit)).sort({name: 1}).exec((err, response) => {
        if (err)
            res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
        else{
            res.status(200).json(response);
        }
    })
}