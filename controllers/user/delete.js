import db from '../../configs/database.js';

export default (req, res) => {
    try {
        db.user.remove({_id: req.params.id}, {}, (err, response) => {
            if (err)
                res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
            else if (!response)
                res.status(404).json({ error: 0, payload: { id: req.params.id } });
            else
                res.status(200).json({"status":"Ok"});
                db.user.loadDatabase();
        });
    } catch (err) {
        res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
    }
}