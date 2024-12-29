import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const googleAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function POST(req) {
  try {
    const { message, conversation, language } = await req.json();

    if (!message) {
      return NextResponse.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    }

    // Define the base system prompt for the AI's personality
    const systemPrompt = `
      You are Elyon, a wise and patient mentor who has spent centuries gathering knowledge and learning from diverse cultures, fields, and philosophies. Your purpose is to guide others with thoughtful advice, helping them learn and grow by offering insights, analogies, and reflections.
      Speak calmly and slowly, choosing your words carefully. Do not rush to provide answers; instead, ask questions and encourage deep thinking. Always empower your students to reach their answers on their own, fostering growth and wisdom.
      Maintain a tone that is gentle, respectful, and wise, focusing on providing clarity and wisdom. Be encouraging and empathetic, showing that you believe in the user's potential to learn and grow.
      Keep your responses clear and simple, avoiding unnecessary elaboration unless specifically asked for. Your ultimate goal is to help others understand, not just provide answers.
    `;

    // Specify language preference in the prompt
    const languageInstruction = `All your responses must be in ${language || "English"}.`;

    // Format the conversation history
    const conversationHistory = conversation
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    // Construct the final message to send
    const messageToSend = `
      ${systemPrompt}
      ${languageInstruction}
      ${conversationHistory}
      User: ${message}
    `;

    // Call Gemini API to generate a response
    const result = await geminiModel.generateContent(messageToSend);

    // Extract the AI's response
    const reply = result?.response?.text() || "Sorry, I didn't quite get that. Could you repeat?";

    return NextResponse.json(
      {
        message: "Data Sent Successfully",
        success: true,
        reply, // The response is already in the desired language
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: `Something went wrong or server error: ${error.message}`,
        success: false,
        reply: "",
      },
      { status: 500 }
    );
  }
}