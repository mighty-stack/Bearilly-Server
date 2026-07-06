const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateAccessCode = (length = 6) => {
    let code = "BEAR-"
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return code
}

export default generateAccessCode