var orm = require("orm");


module.exports.connectdb = function(db,username,password,host,port,dbname){
   
    db.use(orm.express("mysql://"+username+":"+password+"@"+host+":"+port+"/"+dbname, {
        define: function (db, models, next) {
            models.articles = db.define("articles", {
                aid      : {
                    type:'serial',
                    key:true
                },
                atitle   : String,
                acat       : String, // FLOAT 
                aimg      : String,
                acontent : String,
                atime     : String
            });
            next();
        }
    }));
}


