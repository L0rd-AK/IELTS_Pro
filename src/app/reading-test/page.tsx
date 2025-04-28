'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { generateQuestions } from '@/ai/flows/generate-questions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { evaluateWritingTest } from '@/ai/flows/evaluate-writing-test';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReadingTest() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [passage, setPassage] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(60); // 60 minutes for reading test
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [currentPassage, setCurrentPassage] = useState<number>(0);
  
  const passages = [
    {
      title: "The Industrial Revolution",
      content: "The Industrial Revolution was a period of major industrialization and innovation that took place during the late 1700s and early 1800s. The Industrial Revolution began in Great Britain and quickly spread throughout the world. The American Industrial Revolution, commonly referred to as the Second Industrial Revolution, started sometime between 1820 and 1870. This period saw the mechanization of agriculture and textile manufacturing and a revolution in power, including steam ships and railroads, that affected social, cultural, and economic conditions. Although the Industrial Revolution occurred approximately 200 years ago, it is a period that left a profound impact on how people lived and the way businesses operated. Arguably, the factory systems developed during the Industrial Revolution are responsible for creating capitalism and the modern cities of today."
    },
    {
      title: "Climate Change and Global Warming",
      content: "Climate change refers to significant, long-term changes in the global climate. The global climate is the connected system of sun, earth and oceans, wind, rain and snow, forests, deserts and savannas, and everything people do. The climate of a place, say New York, can be described as its rainfall, changing temperatures during the year and so on. But the global climate is more than the 'average' of all the world's local climates. Global warming is often used interchangeably with the term climate change, though the latter refers to both human- and naturally produced warming and the effects it has on our planet. It is most commonly measured as the average increase in Earth's global surface temperature. Since the pre-industrial period, human activities are estimated to have increased Earth's global average temperature by about 1 degree Celsius (1.8 degrees Fahrenheit), a number that is currently increasing by 0.2 degrees Celsius (0.36 degrees Fahrenheit) per decade."
    }
  ];

  useEffect(() => {
    // Set initial passage
    setPassage(passages[currentPassage].content);
    
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      setFeedback(null);
      try {
        const result = await generateQuestions({
          topic: 'IELTS Reading Test',
          context: `Passage about ${passages[currentPassage].title}`,
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
  }, [currentPassage]);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (testStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1/60); // Update every second (1/60 of a minute)
      }, 1000);
    } else if (timeRemaining <= 0) {
      handleSubmit();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testStarted, timeRemaining]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const changePassage = (index: number) => {
    setCurrentPassage(index);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    setTestStarted(false);

    try {
      // Combine passage and answers for evaluation
      const combinedText = `Passage: ${passage}\nQuestions and Answers:\n${questions
        .map((q, i) => `Q: ${q}\nA: ${answers[i]}`)
        .join('\n')}`;

      // Use AI to evaluate reading comprehension
      const evaluationResult = await evaluateWritingTest({
        task1Response: combinedText,
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
              This test consists of multiple passages with varying difficulty levels. You will have 60 minutes to read the passages and answer all questions.
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
          <TabsList className="grid grid-cols-2 mb-4">
            {passages.map((p, idx) => (
              <TabsTrigger 
                key={idx} 
                value={idx.toString()} 
                onClick={() => changePassage(idx)}
              >
                Passage {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {passages.map((p, idx) => (
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
                            onChange={e => handleAnswerChange(index, e.target.value)}
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