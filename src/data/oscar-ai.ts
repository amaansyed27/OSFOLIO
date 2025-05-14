// OSCAR's AI response engine
import { knowledgeBase, fallbackResponses, greetings, topicIntroductions, KnowledgeCategory } from './oscar-knowledge-base';

interface MatchResult {
  score: number;
  text: string;
  category: string;
  subcategory: string;
}

export class OscarAI {
  // Simple keyword matching to find relevant knowledge
  static findRelevantKnowledge(query: string): MatchResult[] {
    query = query.toLowerCase();
    const matches: MatchResult[] = [];

    // Check each category and subcategory for matching keywords
    knowledgeBase.forEach(category => {
      category.subcategories.forEach(subcategory => {
        // Check if any keywords match
        const matchingKeywords = subcategory.keywords.filter(keyword => 
          query.includes(keyword.toLowerCase())
        );

        if (matchingKeywords.length > 0) {
          // For each fact, add it to matches with a score based on keyword matches
          subcategory.facts.forEach(fact => {
            matches.push({
              score: matchingKeywords.length,
              text: fact,
              category: category.category,
              subcategory: subcategory.name
            });
          });
        }
        
        // Also check if the query directly mentions the subcategory name
        if (query.includes(subcategory.name.toLowerCase())) {
          subcategory.facts.forEach(fact => {
            matches.push({
              score: 2, // Higher score for direct subcategory match
              text: fact,
              category: category.category,
              subcategory: subcategory.name
            });
          });
        }
      });

      // Check if the query directly mentions the category
      if (query.includes(category.category.toLowerCase())) {
        category.subcategories.forEach(subcategory => {
          subcategory.facts.forEach(fact => {
            matches.push({
              score: 1, // Base score for category match
              text: fact,
              category: category.category,
              subcategory: subcategory.name
            });
          });
        });
      }
    });

    // Sort matches by score (highest first)
    return matches.sort((a, b) => b.score - a.score);
  }

  // Generate a conversational response based on the query
  static generateResponse(query: string): string {
    const lowercaseQuery = query.toLowerCase();
    
    // Handle greetings
    if (this.isGreeting(lowercaseQuery)) {
      return this.getRandomGreeting();
    }
    
    // Handle general inquiries about what OSCAR can do
    if (this.isCapabilityQuestion(lowercaseQuery)) {
      return this.getRandomTopicIntroduction();
    }

    // Find relevant knowledge
    const matches = this.findRelevantKnowledge(query);
    
    // If we have matches, construct a response
    if (matches.length > 0) {
      return this.constructResponse(matches, query);
    }
    
    // No matches, return a fallback response
    return this.getRandomFallback();
  }

  // Check if the query is a greeting
  private static isGreeting(query: string): boolean {
    const greetingTerms = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    return greetingTerms.some(term => query.includes(term));
  }

  // Check if the query is asking about what OSCAR can do
  private static isCapabilityQuestion(query: string): boolean {
    const capabilityTerms = ['what can you do', 'what do you know', 'help me', 'what can you tell me', 'how can you help'];
    return capabilityTerms.some(term => query.includes(term));
  }

  // Get a random greeting
  private static getRandomGreeting(): string {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Get a random fallback response
  private static getRandomFallback(): string {
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // Get a random topic introduction
  private static getRandomTopicIntroduction(): string {
    return topicIntroductions[Math.floor(Math.random() * topicIntroductions.length)];
  }

  // Construct a response from matching facts
  private static constructResponse(matches: MatchResult[], query: string): string {
    // If we have multiple facts from the same subcategory, group them
    const topCategory = matches[0].category;
    const topSubcategory = matches[0].subcategory;
    
    // Get all top matching facts (same category and subcategory)
    const topMatches = matches.filter(m => 
      m.category === topCategory && m.subcategory === topSubcategory
    ).slice(0, 3); // Limit to 3 facts to avoid too long responses
    
    // Construct the response based on the subcategory
    if (topMatches.length === 1) {
      // Single fact response
      return topMatches[0].text;
    } else {
      // Multiple facts response
      let response = `Let me tell you about Amaan's ${topSubcategory.toLowerCase()}:\n\n`;
      topMatches.forEach((match, i) => {
        response += `${i + 1}. ${match.text}\n`;
      });
      
      // Add a prompt for more information if not all facts are included
      const totalFacts = matches.filter(m => 
        m.category === topCategory && m.subcategory === topSubcategory
      ).length;
      
      if (totalFacts > topMatches.length) {
        response += `\nI have more information about Amaan's ${topSubcategory.toLowerCase()} if you're interested!`;
      }
      
      return response;
    }
  }
}
