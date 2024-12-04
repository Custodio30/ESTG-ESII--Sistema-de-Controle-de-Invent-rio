import { HumanMessage } from "@langchain/core/messages";
import { ChatCohere } from "@langchain/cohere";

export async function invokeCohere(prompt: string): Promise<string> {
  try {
    const model = new ChatCohere({
      apiKey: "7qdmg5xOjNGxKZW55vjLyJibGBVfgLey76JJg816", // Use variáveis de ambiente
    });

    const response = await model.invoke([new HumanMessage(prompt)]);
    return response.text; // Retorna a resposta do modelo
  } catch (error) {
    console.error("Erro ao invocar o modelo Cohere:", error);
    throw new Error("Não foi possível obter a resposta da AI");
  }
}