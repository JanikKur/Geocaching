function checkLocation(req, res, next){
    if(!req.body.name || !req.body.description || !req.body.difficulty || !req.body.position){
        res.status(400).end();
    }
    next();
}
module.exports = checkLocation;