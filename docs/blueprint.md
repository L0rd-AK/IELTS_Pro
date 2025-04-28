# **App Name**: IELTS Ace

## Core Features:

- AI Evaluation: Evaluate writing and speaking tests using OpenAI's API (GPT-3.5-turbo) based on IELTS criteria, providing band scores and feedback.
- Test Interfaces: Implement test interfaces for Reading, Writing, Listening, and Speaking with necessary input components (text editor, audio player, voice recorder).
- Performance Dashboard: Display performance using score charts, graphs, and detailed feedback, including strengths, weaknesses, and improvement suggestions, while allowing students to review their progress.

## Style Guidelines:

- Primary color: Teal (#008080) for a sense of calm and focus.
- Secondary color: Light gray (#F0F0F0) for clean backgrounds.
- Accent: Gold (#FFD700) to highlight scores and important feedback.
- Clear and readable sans-serif fonts to ensure readability.
- Use simple, intuitive icons for navigation and features.
- Clean and organized layout with clear sections for each test component and feedback area.
- Subtle transitions and animations to provide feedback and guide users through the tests.

## Original User Request:
AI Options for IELTS Evaluation
For a free AI API capable of evaluating all four IELTS components, I recommend:
OpenAI's API with GPT-3.5-turbo:

It's powerful enough to assess reading, writing, listening, and speaking responses
It offers a free tier with some usage limitations (currently around 5M tokens/month)
Can be effectively prompted to evaluate according to IELTS criteria

Alternatives to consider:

Google's Gemini API: Offers a free tier with similar capabilities
Anthropic's Claude (limited free tier): Good for writing assessment
Hugging Face's open-source models: Can be self-hosted if you have the technical resources

Website Design Structure
Here's a proposed structure for your IELTS practice website:
1. Core Pages

Home/Landing Page: Overview of the platform
Dashboard: User progress tracking
Test Selection: Where users choose which test to take
Individual Test Pages: One for each test type
Results & Analysis: AI feedback and scoring
Progress Tracking: Performance history
Resource Library: Study materials

2. Test Components Design
Reading Test:

Multiple passages with varying difficulty
Question types: multiple choice, matching, fill-in-blanks, etc.
AI evaluates answers against correct responses

Writing Test:

Task 1 (data/graph description) and Task 2 (essay)
Text editor with word count
AI evaluates based on IELTS criteria (task achievement, coherence, vocabulary, grammar)

Listening Test:

Audio player with embedded recordings
Question interface synchronized with audio segments
AI compares user answers with correct responses

Speaking Test:

Voice recording capability for each part
AI transcribes and evaluates responses
Feedback on pronunciation, fluency, vocabulary, grammar

Performance Scoring Design
The AI scoring system should:

Follow IELTS Bands (0-9):

Each component scored separately
Overall score calculated as per IELTS rules


Provide Detailed Feedback:

Strengths and weaknesses
Specific examples from the user's responses
Suggestions for improvement


Visual Representation:

Score band charts/graphs
Progress tracking over time
Comparison with target scores


Performance Dashboard:

Overall band score
Individual component scores
Detailed breakdown of sub-skills
Historical performance tracking

Create this project in next.js
  