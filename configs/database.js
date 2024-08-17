import Datastore from 'nedb';

let db = {};

if(!db.user){
    db.user = new Datastore({
        filename: "./data/users.db",
        autoload: true,
    });

    console.log("Banco de dados dos usuarios pronto para uso!");
}

export default db;