class ApiError extends Error {
    constructor(stsCode, msg="Something went wrong", err=[]){
        super(msg)
        this.statusCode = stsCode
        this.data = null
        this.message = msg
        this.errors = err
    }
}

export {ApiError}