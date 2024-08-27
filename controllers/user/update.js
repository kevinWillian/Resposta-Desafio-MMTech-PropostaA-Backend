import db from '../../configs/database.js';
import Ajv from 'ajv';
import emailValidator from 'email-validator'
import {phone} from 'phone';

export default (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const avj = new Ajv();
    const schema = {
        type: "object",
        properties: {
            name: {type: "string"},
            email: {type: "string"},
            phone: {type: "string"}
        },
        required: [],
        additionalProperties: false
    }

    const validate = avj.compile(schema);

    if(!validate(req.body)){
        res.status(400).json({error: {code: '400', message: 'bad request'}});
        return;
    }

    if(req.body.name){
        let regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if(!regex.test(req.body.name)){
            res.status(400).json({error: {code: '400', message: 'name invalid'}});
            return;
        }

    }

    if(req.body.email){
        if(!emailValidator.validate(req.body.email)){
            res.status(400).json({error: {code: '400', message: 'email invalid'}});
            return;
        }
    }
    if(req.body.phone){
        if(!phone(req.body.phone).isValid){
            res.status(400).json({error: {code: '400', message: 'phone invalid'}});
            return;
        }else {
            req.body.phone = phone(req.body.phone).phoneNumber;
        }
    }

    let upcased;
    try {
        let _id = req.params.id;

        db.user.find({ _id }, (err, response) => {
            if (err)
                res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
            else if (response.length){

                upcased = response.slice()[0];

                if(req.body.name){
                    upcased.name = req.body.name;
                }
                if(req.body.email){
                    upcased.email = req.body.email;
                }
                if(req.body.phone){
                    upcased.phone = req.body.phone;
                }

                try {
                    db.user.update({_id: req.params.id}, upcased, {}, (err, response) => {
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
            else
                res.status(404).json({ error: 0 });
            
        });
    } catch (err) {
        res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
    }
}