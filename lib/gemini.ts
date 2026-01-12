"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface SearchResultItem {
  title: string;
  description: string;
  url?: string;
  date?: string;
  source?: string;
}

export interface SearchResults {
  tools: SearchResultItem[];
  tutorials: SearchResultItem[];
  companies: SearchResultItem[];
  news: SearchResultItem[];
  isMock?: boolean;
}

const MOCK_RESULTS: SearchResults = {
  isMock: true,
  tools: [
    { title: "Example AI Tool", description: "A powerful tool for generating content.", url: "#", source: "ToolHub" },
    { title: "GenVideo Maker", description: "Create videos from text in seconds.", url: "#", source: "VideoAI" }
  ],
  tutorials: [
    { title: "How to use AI for slide decks", description: "A comprehensive guide on creating slides.", url: "#", source: "Medium" },
    { title: "Video generation masterclass", description: "Learn the secrets of AI video generation.", url: "#", source: "YouTube" }
  ],
  companies: [
    { title: "OpenAI", description: "Creators of ChatGPT and DALL-E.", url: "https://openai.com", source: "OpenAI" },
    { title: "Google DeepMind", description: "Solving intelligence to advance science.", url: "https://deepmind.google", source: "Google" }
  ],
  news: [
    { title: "New AI regulations proposed", description: "Governments discuss safety measures.", date: "2023-10-27", source: "TechCrunch" },
    { title: "Breakthrough in LLM efficiency", description: "New architecture reduces cost by 50%.", date: "2023-10-26", source: "ArXiv" }
  ]
};

export const searchGemini = async (query: string): Promise<SearchResults> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY not found, returning mock data.");
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_RESULTS;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log(`Searching Gemini for: ${query}`);

    const prompt = `
      You are a helpful AI assistant. The user is searching for: "${query}".
      Please provide a list of relevant resources categorized into:
      1. AI Tools (software, web apps, etc.)
      2. Tutorials (articles, videos, guides)
      3. Companies (top companies involved in this field)
      4. News (recent articles or updates)

      Format the output strictly as a JSON object with the following structure:
      {
        "tools": [{ "title": "...", "description": "...", "url": "...", "source": "..." }],
        "tutorials": [{ "title": "...", "description": "...", "url": "...", "source": "..." }],
        "companies": [{ "title": "...", "description": "...", "url": "...", "source": "..." }],
        "news": [{ "title": "...", "description": "...", "date": "...", "source": "..." }]
      }
      Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini Raw Response:", text);

    // Robust JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const jsonString = jsonMatch[0];
    const parsedData = JSON.parse(jsonString) as SearchResults;

    return { ...parsedData, isMock: false };

  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    // Return mock results but maybe with a flag indicating it was an error?
    // For now, let's stick to MOCK_RESULTS but log the error clearly.
    return MOCK_RESULTS;
  }
};
