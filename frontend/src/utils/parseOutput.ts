export interface ParsedOutput {
  cleanedText: string;
  thoughts: string[];
}

export function parseLLMOutput(text: string): ParsedOutput {
  if (!text) return { cleanedText: "", thoughts: [] };

  // Remove ephemeral messages completely
  let processed = text.replace(/<EPHEMERAL_MESSAGE>[\s\S]*?<\/EPHEMERAL_MESSAGE>/gi, "");

  // Extract thoughts
  const thoughts: string[] = [];
  const thinkRegex = /<think>([\s\S]*?)<\/think>/gi;
  let match;
  
  while ((match = thinkRegex.exec(processed)) !== null) {
    if (match[1].trim()) {
      thoughts.push(match[1].trim());
    }
  }

  // Remove think blocks from the final output
  processed = processed.replace(/<think>[\s\S]*?<\/think>/gi, "");

  return {
    cleanedText: processed.trim(),
    thoughts,
  };
}
