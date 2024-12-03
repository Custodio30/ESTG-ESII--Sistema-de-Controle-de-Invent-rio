import { OpenAI } from "langchain"; // Verifique se 'langchain' está instalado

const llm = new OpenAI({
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function getAnswer(question: string) {
    let answer = '';

    try {
        answer = await llm.predict(question);
    } catch (e) {
        console.error(e);
    }

    return answer;
}
