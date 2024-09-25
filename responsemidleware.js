var requestCount = 0;
var responseTime = 0;

const responseMiddleware = (req,res,next)=>{
    const start = Date.now();

    res.on('finish', ()=>{
        const end  = Date.now();

        const timetaken = end - start;
        requestCount += 1

        responseTime += timetaken

        const avgtime = requestCount / responseTime;

        console.log(avgtime);
        
    })

    next();

}

module.exports = {responseMiddleware}