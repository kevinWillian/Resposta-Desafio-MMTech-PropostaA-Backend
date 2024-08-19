import db from '../../configs/database.js';

export default (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const keyWord = req.query.keyWord;
    var regexObj = new RegExp(keyWord, 'i');

    try{
        db.user.count({$or: [{name: regexObj},{email: regexObj},{phone: regexObj}]}, function (err, count) {
            if (err){
                res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
            }else {
                res.status(200).json({count});
            }
        });
    } catch (err) {
        res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
    }
}