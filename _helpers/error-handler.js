module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    console.log(res);
    if (typeof (err) === 'string') {
        return res.status(400).json({message: err});
    }

    if (typeof (err) === 'ValidationError') {
        // mongoose validation
        return res.status(400).json({message: err.message});
    }

    //add return invalid authentication

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}