import accessCodeModel from "./accessCode.model.js";

const createAccessCode = 
    async (payload) => {
        return await accessCodeModel.create(
            payload
        )
    }

const findCode =
    async (code) => {
        return await accessCodeModel.findOne(
            {code}
        )
    }

    const accessCodeService = {
    createAccessCode,
    findCode
    }

    export default accessCodeService