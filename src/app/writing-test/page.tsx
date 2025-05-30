'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { evaluateWritingTest } from '@/ai/flows/evaluate-writing-test';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Clock, BarChart, CheckCircle } from 'lucide-react';

export default function WritingTest() {
  const [task1Response, setTask1Response] = useState('');
  const [task2Response, setTask2Response] = useState('');
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 minutes total
  const [currentTask, setCurrentTask] = useState<'task1' | 'task2'>('task1');
  const [task1Prompt, setTask1Prompt] = useState<string>('');
  const [task2Prompt, setTask2Prompt] = useState<string>('');
  const [task1Image, setTask1Image] = useState<string>('');

  // Sample task prompts
  const task1Prompts = [
    {
      title: "Line Graph",
      description: "The graph below shows the changes in the amount of time spent by people in the UK on different leisure activities between 2000 and 2020.Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "https://i.ibb.co/xKmRvKWH/image-2025-05-25-012052881.png"
    },
    {
      title: "Bar Chart",
      description: "The chart below shows the percentage of people who used different types of transportation to travel to work in a European city in 2000 and 2020.Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "https://i.ibb.co/wVn77xS/image-2025-05-25-012225027.png"
    },
    {
      title: "Process Diagram",
      description: "The diagram below shows the process of making chocolate from cocoa beans.Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "https://i.ibb.co/SD78bP0t/image-2025-05-30-192916139.png"
    },
    {
      title: "Pie Chart",
      description: "The pie chart below shows the distribution of household expenses in a country in 2020.Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "https://i.ibb.co/VWd1dFrf/image-2025-05-30-192533811.png"
    },
    {
      title: "Table",
      description: "The table below shows the average monthly temperatures in three cities in 2020.Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
      image: "https://i.ibb.co/qYWDVvTG/image-2025-05-30-192239448.png"
    }
  ];

  const task2Prompts = [
    {
      title: "Technology and Society",
      description: "Some people believe that technology has made our lives too complex and that the solution is to lead a simpler lifestyle without technology. To what extent do you agree or disagree with this view?"
    },
    {
      title: "Education",
      description: "Some people think that all university students should study whatever they like. Others believe that they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both these views and give your own opinion."
    },
    {
      title: "Environment",
      description: "Many people believe that global environmental problems are too large to be dealt with by individual countries. To what extent do you agree or disagree with this opinion?"
    }
  ];

  // Set random prompts on component mount
  useEffect(() => {
    const randomTask1 = task1Prompts[Math.floor(Math.random() * task1Prompts.length)];
    const randomTask2 = task2Prompts[Math.floor(Math.random() * task2Prompts.length)];
    setTask1Prompt(randomTask1.description);
    setTask2Prompt(randomTask2.description);
    setTask1Image(randomTask1.image);
  }, []);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (testStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1/60); // Update every second (1/60 of a minute)
      }, 1000);
    } else if (timeRemaining <= 0) {
      handleEvaluateWriting();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testStarted, timeRemaining]);

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const handleEvaluateWriting = async () => {
    setIsLoading(true);
    setError(null);
    setTestStarted(false);

    try {
      const result = await evaluateWritingTest({task1Response, task2Response});
      setEvaluation(result);
    } catch (e: any) {
      setError(e.message || 'Failed to evaluate writing.');
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeRecommendation = () => {
    if (currentTask === 'task1') {
      return 'You should spend about 20 minutes on this task.';
    } else {
      return 'You should spend about 40 minutes on this task.';
    }
  };

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const getWordCountRecommendation = () => {
    if (currentTask === 'task1') {
      return 'Write at least 150 words.';
    } else {
      return 'Write at least 250 words.';
    }
  };

  const getWordCountColor = () => {
    const count = currentTask === 'task1' ? getWordCount(task1Response) : getWordCount(task2Response);
    const minCount = currentTask === 'task1' ? 150 : 250;
    
    if (count < minCount) {
      return 'text-red-500';
    } else if (count < minCount * 1.2) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">IELTS Writing Test</h1>
      <p className="text-lg mb-8 text-center text-muted-foreground">
        Complete both Task 1 and Task 2 to receive a band score and detailed feedback.
      </p>

      {!testStarted && !evaluation ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This test consists of two tasks. You will have 60 minutes to complete both tasks.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Task 1:</strong> You will be asked to describe, summarize or explain a graph, table, chart or diagram. You should write at least 150 words.
              </li>
              <li>
                <strong>Task 2:</strong> You will be asked to write an essay in response to a point of view, argument or problem. You should write at least 250 words.
              </li>
            </ul>
            <p className="mb-4">
              Task 2 contributes twice as much as Task 1 to your final score.
            </p>
            <Button onClick={startTest} className="mt-2">Start Test</Button>
          </CardContent>
        </Card>
      ) : null}

      {testStarted && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg font-medium flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Time Remaining: <span className={`ml-2 ${timeRemaining < 10 ? 'text-red-500' : ''}`}>{formatTime(timeRemaining)}</span>
          </div>
          <Progress value={(timeRemaining / 60) * 100} className="w-1/2 h-2" />
        </div>
      )}

      {testStarted && (
        <Tabs defaultValue="task1" className="w-full mb-6" onValueChange={(value) => setCurrentTask(value as 'task1' | 'task2')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="task1">Task 1</TabsTrigger>
            <TabsTrigger value="task2">Task 2</TabsTrigger>
          </TabsList>
          
          <TabsContent value="task1">
            <Card>
              <CardHeader>
                <CardTitle>Task 1: Data Description</CardTitle>
                <CardDescription>{getTimeRecommendation()} {getWordCountRecommendation()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-line">{task1Prompt}</p>
                  {task1Image ? (
                    <div className="mt-4 w-full flex justify-center rounded-md">
                      <img 
                        src={task1Image} 
                        alt="Task 1 Chart or Diagram" 
                        className="max-w-full h-auto rounded-md" 
                      />
                    </div>
                  ) : (
                    <div className="mt-4 w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                      <p className="text-muted-foreground">Graph/Chart Image Would Appear Here</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Write your response for Task 1 here" 
                    className="min-h-[200px]"
                    value={task1Response}
                    onChange={e => setTask1Response(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span>
                      Word Count: <span className={getWordCountColor()}>{getWordCount(task1Response)}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Recommended: at least 150 words
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="task2">
            <Card>
              <CardHeader>
                <CardTitle>Task 2: Essay</CardTitle>
                <CardDescription>{getTimeRecommendation()} {getWordCountRecommendation()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-line">{task2Prompt}</p>
                </div>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Write your response for Task 2 here" 
                    className="min-h-[300px]"
                    value={task2Response}
                    onChange={e => setTask2Response(e.target.value)}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span>
                      Word Count: <span className={currentTask === 'task2' ? getWordCountColor() : ''}>{getWordCount(task2Response)}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Recommended: at least 250 words
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {testStarted && (
        <div className="flex justify-center">
          <Button 
            className="mt-4" 
            onClick={handleEvaluateWriting} 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Evaluating...' : 'Submit Test'}
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {evaluation && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Writing Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Band Score</h3>
                <div className="text-4xl font-bold text-primary">
                  {evaluation.bandScore}
                </div>
                <Progress 
                  value={(evaluation.bandScore / 9) * 100} 
                  className="mt-3 h-2" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Strengths</h3>
                <p className="whitespace-pre-line">
                  {evaluation.strengths}
                </p>
                
                <h3 className="text-xl font-semibold mt-4 mb-2">Areas for Improvement</h3>
                <p className="whitespace-pre-line">
                  {evaluation.weaknesses}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Task 1 Feedback</h3>
                <div className="p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-line">
                    {evaluation.task1Feedback}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Task 2 Feedback</h3>
                <div className="p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-line">
                    {evaluation.task2Feedback}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Suggestions for Improvement</h3>
              <p className="whitespace-pre-line">
                {evaluation.suggestions}
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => {
                setEvaluation(null);
                setTask1Response('');
                setTask2Response('');
                setTimeRemaining(60);
                setCurrentTask('task1');
                
                // Generate new random prompts
                const randomTask1 = task1Prompts[Math.floor(Math.random() * task1Prompts.length)];
                const randomTask2 = task2Prompts[Math.floor(Math.random() * task2Prompts.length)];
                setTask1Prompt(randomTask1.description);
                setTask2Prompt(randomTask2.description);
                setTask1Image(randomTask1.image);
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