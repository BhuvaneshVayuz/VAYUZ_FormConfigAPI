export const handleError = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            console.log(error);
            let errObj = {
                status: error?.status || 400,
                message: error?.message || 'failed',
                data: error?.data || null
            }
            res.locals.errObj = errObj
            return next()
        }
    }
}