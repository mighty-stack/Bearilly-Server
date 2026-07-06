const blockedTopics = [
    "hack",
    "bypass",
    "malware",
    "illegal"
]

const validatePrompt = 
    (prompt) => {
        const lower =
        prompt.toLowerCase()

        const blocked =
        blockedTopics.some(
            topics => lower.includes(topic)
        )

        if (blocked) {
            throw new Error(
                "Prompt violates Policy"
            )
        }
        return true
    }

    const aiGuardrails = {validatePrompt}

    export default aiGuardrails