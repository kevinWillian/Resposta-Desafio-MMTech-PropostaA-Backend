import db from '../../configs/database.js';
import Ajv from 'ajv';
import emailValidator from 'email-validator'
import {phone} from 'phone';


export default (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);

    var avj = new Ajv();

    const schema = {
        type: "object",
        properties: {
            name: {type: "string"},
            email: {type: "string"},
            phone: {type: "string"}
        },
        required: ["name", "email"],
        additionalProperties: false
    }

    const validate = avj.compile(schema);

    if(!validate(req.body)){
        res.status(400).json({error: {code: '400', message: 'bad request'}});
        return;
    }

    let regex = /^[a-zA-Z ]+$/;
    if(!regex.test(req.body.name)){
        res.status(400).json({error: {code: '400', message: 'name invalid'}});
        return;
    }

    if(!emailValidator.validate(req.body.email)){
        res.status(400).json({error: {code: '400', message: 'email invalid'}});
        return;
    }

    if(req.body.phone){
        if(!phone(req.body.phone).isValid){
            res.status(400).json({error: {code: '400', message: 'phone invalid'}});
            return;
        }
    }else {
        req.body.phone = phone(req.body.phone).phoneNumber;
    }

    try {
        db.user.insert(req.body, (err, response) => {
            if (err) res.status(500).json({ error: { message: err.message }, payload: null });
            else if (response.length) res.status(201).json({ error: 0, payload: { comments: response } });
            else res.json({"status":"Ok"});
        });
    } catch (err) {
        res.status(500).json({ error: { code: '500', message: err.message }, payload: null });
    }
}

