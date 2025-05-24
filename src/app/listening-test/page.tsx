'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import { generateQuestions } from '@/ai/flows/generate-questions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { evaluateWritingTest } from '@/ai/flows/evaluate-writing-test';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Headphones, Play, Pause, RotateCcw } from 'lucide-react';

export default function ListeningTest() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 minutes for listening test
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sections = [
    {
      title: "Section 1: Daily Life Conversation",
      description: "A conversation between two people set in an everyday social context.",
      audioUrl: "/audio/sample1.mp3",
    },
    {
      title: "Section 2: Public Announcement",
      description: "A monologue set in an everyday social context, e.g., a speech about local facilities.",
      audioUrl: "/audio/sample2.mp3",
    },
    {
      title: "Section 3: Academic Discussion",
      description: "A conversation between up to four people set in an educational context.",
      audioUrl: "/audio/sample3.mp3",
    },
    {
      title: "Section 4: Academic Lecture",
      description: "A monologue on an academic subject.",
      audioUrl: "/audio/sample2.mp3",
    }
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);
      setFeedback(null);
      try {
        const result = await generateQuestions({
          topic: 'IELTS Listening Test',
          context: `${sections[currentSection].title}: ${sections[currentSection].description}`,
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
  }, [currentSection]);

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

  // Audio player controls
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const changeSection = (index: number) => {
    setCurrentSection(index);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    setTestStarted(false);

    try {
      // Combine questions and answers for evaluation
      const combinedText = `Section: ${sections[currentSection].title}\nQuestions and Answers:\n${questions
        .map((q, i) => `Q: ${q}\nA: ${answers[i]}`)
        .join('\n')}`;

      // Use AI to evaluate listening comprehension
      const evaluationResult = await evaluateWritingTest({
        task1Response: combinedText,
        task2Response: 'Listening Comprehension Evaluation',
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">IELTS Listening Test</h1>
      <p className="text-lg mb-8 text-center text-muted-foreground">
        Listen to audio recordings and answer questions to assess your listening comprehension skills.
      </p>

      {!testStarted && !feedback ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This test consists of four sections, each with a different type of listening task. You will have 30 minutes to complete all sections.
            </p>
            <p className="mb-4">
              You will hear each recording ONCE only. Listen carefully and answer the questions that follow. The test will automatically submit when the time is up.
            </p>
            <Button onClick={startTest} className="mt-2">Start Test</Button>
          </CardContent>
        </Card>
      ) : null}

      {testStarted && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg font-medium">
            Time Remaining: <span className={`${timeRemaining < 10 ? 'text-red-500' : ''}`}>{formatTime(timeRemaining * 60)}</span>
          </div>
          <Progress value={(timeRemaining / 30) * 100} className="w-1/2 h-2" />
        </div>
      )}

      {testStarted && (
        <Tabs defaultValue="0" className="w-full mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            {sections.map((section, idx) => (
              <TabsTrigger 
                key={idx} 
                value={idx.toString()} 
                onClick={() => changeSection(idx)}
              >
                Section {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {sections.map((section, idx) => (
            <TabsContent key={idx} value={idx.toString()}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Headphones className="mr-2 h-5 w-5" />
                    {section.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <audio ref={audioRef} src={section.audioUrl} className="hidden" />
                    
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handlePlayPause}
                          className="h-10 w-10 rounded-full"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleRestart}
                          className="h-10 w-10 rounded-full"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="w-full flex items-center space-x-2">
                        <span className="text-sm">{formatTime(currentTime)}</span>
                        <Progress 
                          value={(currentTime / (duration || 1)) * 100} 
                          className="h-2 flex-1" 
                        />
                        <span className="text-sm">{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Questions</h3>
                  {isLoading && <p>Loading questions...</p>}
                  {error && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {!isLoading && !error && questions.length > 0 && currentSection === idx && (
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
                setTimeRemaining(30);
                setCurrentSection(0);
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