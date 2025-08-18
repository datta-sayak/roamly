import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const topPlacesToVisit = async function (place){
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: `Top places to visit in ${place}. Reply ONLY with a valid JSON object in this format:
    {
      "places_to_visit": [
        "Place 1",
        "Place 2",
        ...
      ]
    }
    Do not include any explanation or extra text.`,
    store: false,
  });
  return response.output_text;
}

export { topPlacesToVisit }