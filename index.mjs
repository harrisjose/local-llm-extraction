import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import inputs from "./data.js";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe("name of the restaurant mentioned in the tweet"),
    location: z
      .array(z.string())
      .describe("location of the place mentioned in the tweet"),
    food: z.array(z.string()).describe("food items mentioned in the tweet if any"),
  })
);

const ollamaLLM = new ChatOllama({
  model: "mistral",
});

const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    "Extract information from input as best as possible.\n{format_instructions}\n{input}"
  ),
  ollamaLLM,
  parser,
]);

for (const input of inputs) {
  const response = await chain.invoke({
    input: input.tweet,
    format_instructions: parser.getFormatInstructions(),
  });
  console.log(response);
}