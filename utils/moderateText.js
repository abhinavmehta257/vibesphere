import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET,
});
export default async function moderateText(content) {
  try {
    const response = await openai.moderations.create({
      input: content,
    });

    const results = response.results[0];
    if (results.flagged) {
      console.log(results);
      const { message } = generateModerationResponse(results);
      console.log(message);

      return { isApproved: false, reasons: results.categories, message };
    }
    return { isApproved: true };
  } catch (error) {
    console.error("Moderation error:", error);
    throw new Error("Moderation failed");
  }
}

function generateModerationResponse(moderationResult) {
  const messages = [];
  const flaggedCategories = moderationResult.categories;

  // Map of category to message response
  const categoryMessages = {
    sexual: "Content flagged as containing sexual material.",
    hate: "Content flagged as containing hate speech.",
    harassment: "Content flagged as containing harassment.",
    "self-harm": "Content flagged as promoting self-harm.",
    "sexual/minors": "Content flagged as involving minors in sexual content.",
    "hate/threatening": "Content flagged as threatening hate speech.",
    "violence/graphic": "Content flagged as containing graphic violence.",
    "self-harm/intent": "Content flagged for promoting self-harm intent.",
    "self-harm/instructions":
      "Content flagged for providing self-harm instructions.",
    "harassment/threatening": "Content flagged as threatening harassment.",
    violence: "Content flagged as violent.",
  };

  // Iterate over flagged categories to generate messages
  for (const [category, isFlagged] of Object.entries(flaggedCategories)) {
    if (isFlagged) {
      messages.push(categoryMessages[category]);
    }
  }

  // Create a response based on flagged categories
  if (messages.length > 0) {
    return {
      status: "rejected",
      message: messages,
    };
  } else {
    return {
      status: "approved",
      message: ["Content is approved with no flagged categories."],
    };
  }
}
