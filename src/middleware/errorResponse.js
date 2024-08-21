export const errorResponse = (req, res) => {
    res.json({
        status: res.locals?.errObj?.status || 520,
        message: res.locals?.errObj?.message || 'some error',
        data: res.locals?.errObj?.data || null
    })
}