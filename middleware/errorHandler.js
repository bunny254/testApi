const errorHandler = (error, req, res, next )=>{
    
    //Error handling response to the client
    return res.status(500).send({
        error:error.message
    })
}


module.exports = errorHandler;