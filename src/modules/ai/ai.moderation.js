const moderatePrompt = 
    async (prompt) => {
        if (prompt.length > 5000) {
            throw new Error("Prompt too long")
        }

        return true
    }

export default moderatePrompt