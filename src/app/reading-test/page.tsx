'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { generateQuestions } from '@/ai/flows/generate-questions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { evaluateWritingTest } from '@/ai/flows/evaluate-writing-test';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const passages = [
  {
    title: 'The Impact of Climate Change',
    content: `Climate change refers to significant changes in global temperatures and weather patterns over time. While climate change is a natural phenomenon, scientific evidence shows that human activities are currently driving an unprecedented rate of change. The burning of fossil fuels, deforestation, and industrial processes release greenhouse gases into the atmosphere, leading to global warming and other environmental impacts.`,
  },
  {
    title: 'The Evolution of Technology',
    content: `Technology has evolved at an unprecedented pace over the last century. From the invention of the telephone to the rise of the internet, technological advancements have transformed how we communicate, work, and live. The digital revolution has led to the creation of smartphones, artificial intelligence, and cloud computing, which continue to shape our daily lives and economies.`,
  },
  {
    title: 'The Importance of Biodiversity',
    content: `Biodiversity refers to the variety of life on Earth, including the variety of species, ecosystems, and genetic diversity within species. It is crucial for ecosystem health, providing services such as pollination, nutrient cycling, and climate regulation. However, human activities such as habitat destruction and pollution are leading to a rapid decline in biodiversity, threatening ecosystems and human well-being.`,
  },
  {
    title: 'The Role of Education in Society',
    content: `Education plays a vital role in shaping individuals and societies. It provides knowledge, skills, and values necessary for personal development and social cohesion. Education systems vary globally, but they all aim to prepare individuals for the workforce and responsible citizenship. Challenges such as access to quality education and educational inequality remain significant issues in many parts of the world.`,
  },
  {
    title: 'The Future of Renewable Energy',
    content: `Renewable energy sources, such as solar, wind, and hydroelectric power, are becoming increasingly important in the fight against climate change. These sources are sustainable and have a lower environmental impact compared to fossil fuels. The transition to renewable energy is essential for reducing greenhouse gas emissions and achieving energy security in the future.`,
  },
  {
    title: 'The Significance of Mental Health Awareness',
    content: `Mental health awareness is crucial for reducing stigma and promoting understanding of mental health issues. Mental health affects how we think, feel, and act, and it is essential for overall well-being. Increasing awareness can lead to better support systems, improved access to mental health care, and a more compassionate society.`,
  },
  {
    title: 'The Challenges of Urbanization',
    content: `Urbanization refers to the increasing population in urban areas, leading to the growth of cities. While urbanization can drive economic development and innovation, it also presents challenges such as overcrowding, pollution, and inadequate infrastructure. Sustainable urban planning is essential to address these issues and improve the quality of life for urban residents.`,
  },
  {
    title: 'The Influence of Social Media on Society',
    content: `Social media has transformed how people communicate and share information. Platforms like Facebook, Twitter, and Instagram allow users to connect with others globally, share experiences, and express opinions. However, social media also raises concerns about privacy, misinformation, and its impact on mental health, making it a complex aspect of modern society.`,
  },
];

interface Passage {
  title: string;
  content: string;
}

export default function ReadingTest() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [passage, setPassage] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [currentPassage, setCurrentPassage] = useState<number>(0);
  const [selectedPassages, setSelectedPassages] = useState<Passage[]>([]);

  const selectRandomPassages = () => {
    const shuffled = [...passages].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 2);
    setSelectedPassages(selected);
    setPassage(selected[0].content);
    setCurrentPassage(0);
  };

  const startTest = () => {
    selectRandomPassages();
    setTestStarted(true);
  };

  const changePassage = (index: number) => {
    setCurrentPassage(index);
    setPassage(selectedPassages[index].content);
  };

  useEffect(() => {
    if (currentPassage >= 0 && selectedPassages.length > 0) {
      const fetchQuestions = async () => {
        setIsLoading(true);
        setError(null);
        setFeedback(null);
        try {
          const result = await generateQuestions({
            topic: 'IELTS Reading Test',
            context: `Passage about ${selectedPassages[currentPassage].title}`,
            numQuestions: 5,
          });
          setQuestions(result.questions);
          setAnswers(Array(result.questions.length).fill(''));
        } catch (e: any) {
          setError(e.message || 'Failed to generate questions.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuestions();
    }
  }, [currentPassage, selectedPassages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (testStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1/60);
      }, 1000);
    } else if (timeRemaining <= 0) {
      handleSubmit();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testStarted, timeRemaining]);

  const handleAnswerChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    setTestStarted(false);

    try {
      const allPassagesAnswers = selectedPassages.map((p, idx) => {
        return `Passage ${idx + 1}: ${p.title}\n${questions
          .map((q, i) => `Q: ${q}\nA: ${answers[i]}`)
          .join('\n')}`;
      }).join('\n\n');

      const evaluationResult = await evaluateWritingTest({
        task1Response: allPassagesAnswers,
        task2Response: 'Reading Comprehension Evaluation',
      });

      setFeedback(
        `Band Score: ${evaluationResult.bandScore}\nTask 1 Feedback: ${evaluationResult.task1Feedback}\nTask 2 Feedback: ${evaluationResult.task2Feedback}\nStrengths: ${evaluationResult.strengths}\nWeaknesses: ${evaluationResult.weaknesses}\nSuggestions: ${evaluationResult.suggestions}`
      );
    } catch (e: any) {
      setError(e.message || 'Failed to evaluate answers.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">IELTS Reading Test</h1>
      <p className="text-lg mb-8 text-center text-muted-foreground">
        Read passages and answer questions to assess your reading comprehension skills.
      </p>

      {!testStarted && !feedback ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This test consists of two randomly selected passages. You will have 60 minutes to read the passages and answer all questions.
            </p>
            <p className="mb-4">
              Read each passage carefully and answer the questions that follow. The test will automatically submit when the time is up.
            </p>
            <Button onClick={startTest} className="mt-2">Start Test</Button>
          </CardContent>
        </Card>
      ) : null}

      {testStarted && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg font-medium">
            Time Remaining: <span className={`${timeRemaining < 10 ? 'text-red-500' : ''}`}>{formatTime(timeRemaining)}</span>
          </div>
          <Progress value={(timeRemaining / 60) * 100} className="w-1/2 h-2" />
        </div>
      )}

      {testStarted && (
        <Tabs defaultValue="0" className="w-full mb-6">
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto mb-4">
            {selectedPassages.map((p, idx) => (
              <TabsTrigger 
                key={idx} 
                value={idx.toString()} 
                onClick={() => changePassage(idx)}
              >
                Passage {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {selectedPassages.map((p, idx) => (
            <TabsContent key={idx} value={idx.toString()}>
              <Card>
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none mb-6">
                    <p>{p.content}</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Questions</h3>
                  {isLoading && <p>Loading questions...</p>}
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {!isLoading && !error && questions.length > 0 && currentPassage === idx && (
                    <ol className="space-y-4">
                      {questions.map((question, index) => (
                        <li key={index} className="border-b pb-4 last:border-0">
                          <p className="font-medium mb-2">{`${index + 1}. ${question}`}</p>
                          <input
                            type="text"
                            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Your answer"
                            value={answers[index]}
                            onChange={(e) => handleAnswerChange(index, e)}
                          />
                        </li>
                      ))}
                    </ol>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {testStarted && (
        <div className="flex justify-center">
          <Button 
            className="mt-4" 
            onClick={handleSubmit} 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Evaluating...' : 'Submit Answers'}
          </Button>
        </div>
      )}

      {feedback && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Band Score</h3>
                <div className="text-4xl font-bold text-primary">
                  {feedback.split('\n')[0].split(': ')[1]}
                </div>
                <Progress 
                  value={Number(feedback.split('\n')[0].split(': ')[1]) / 9 * 100} 
                  className="mt-3 h-2" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Strengths</h3>
                <p className="whitespace-pre-line">
                  {feedback.split('Strengths: ')[1]?.split('\n')[0]}
                </p>
                
                <h3 className="text-xl font-semibold mt-4 mb-2">Areas for Improvement</h3>
                <p className="whitespace-pre-line">
                  {feedback.split('Weaknesses: ')[1]?.split('\n')[0]}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Detailed Feedback</h3>
              <p className="whitespace-pre-line">
                {feedback.split('Task 1 Feedback: ')[1]?.split('\n')[0]}
              </p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Suggestions</h3>
              <p className="whitespace-pre-line">
                {feedback.split('Suggestions: ')[1]}
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => {
                setFeedback(null);
                setTimeRemaining(60);
                setCurrentPassage(0);
                selectRandomPassages();
              }}>
                Take Another Test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
