import db from '../../configs/database.js';

export default (req, res) => {
    const keyWord = req.query.keyWord;
    var regexObj = new RegExp(keyWord, 'i');
    db.user.find({$or: [{name: regexObj},{email: regexObj},{phone: regexObj}]})
    .skip(req.query.skip)
    .limit(req.query.limit).sort({name: 1}).exec((err, response) => {
        if (err)
            res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
        else if (response.length)
            res.status(200).json(response);
        else
            res.status(404).json({ error: 0 });
    })
}