'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, StopCircle, Camera, CameraOff, Loader2 } from 'lucide-react';
import { evaluateSpeakingTest } from '@/ai/flows/evaluate-speaking-test';

export default function SpeakingTest() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [transcription, setTranscription] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const speakingParts = [
    {
      title: "Part 1: Introduction and Interview",
      description: "The examiner will introduce themselves and ask you to introduce yourself and confirm your identity. They will then ask you general questions on familiar topics such as home, family, work, studies, and interests.",
      duration: 4, // 4-5 minutes
      questions: [
        "Could you tell me about your hometown?",
        "What do you do in your free time?",
        "Do you prefer living in a house or an apartment? Why?",
        "What kind of music do you enjoy listening to?"
      ]
    },
    {
      title: "Part 2: Individual Long Turn",
      description: "The examiner will give you a task card which asks you to talk about a particular topic, including points to include in your talk. You will have 1 minute to prepare and then will talk for 1-2 minutes. The examiner will then ask one or two questions on the same topic.",
      duration: 3, // 3-4 minutes
      taskCard: "Describe a book you have recently read. You should say:\n- what the book was\n- what it was about\n- why you decided to read it\n- and explain why you liked or disliked it."
    },
    {
      title: "Part 3: Two-Way Discussion",
      description: "The examiner will ask further questions which are connected to the topic of Part 2. These questions are designed to give you an opportunity to discuss more abstract issues and ideas.",
      duration: 4, // 4-5 minutes
      questions: [
        "Do you think reading habits have changed in recent years?",
        "How do you think technology has influenced the way people read?",
        "What kinds of books are most popular in your country?",
        "Do you think books will eventually be replaced by digital media?"
      ]
    }
  ];

  useEffect(() => {
    const getMediaPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);
        setHasMicrophonePermission(true);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        
        // Try to get only audio if video fails
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setHasMicrophonePermission(true);
          setHasCameraPermission(false);
          streamRef.current = audioStream;
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'We\'ll proceed with audio only. For best results, please enable camera access.',
          });
        } catch (audioError) {
          console.error('Error accessing microphone:', audioError);
          setHasMicrophonePermission(false);
          toast({
            variant: 'destructive',
            title: 'Microphone Access Denied',
            description: 'Please enable microphone permissions in your browser settings to use this app.',
          });
        }
      }
    };

    getMediaPermissions();

    return () => {
      // Clean up media streams when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const toggleCamera = () => {
    if (!streamRef.current) return;
    
    const videoTracks = streamRef.current.getVideoTracks();
    if (videoTracks.length === 0) {
      toast({
        title: 'No Camera Available',
        description: 'No camera was detected on your device.',
      });
      return;
    }
    
    videoTracks.forEach(track => {
      track.enabled = !track.enabled;
    });
    
    setCameraActive(!cameraActive);
  };

  const startRecording = () => {
    if (!streamRef.current) {
      toast({
        variant: 'destructive',
        title: 'Recording Failed',
        description: 'No microphone access. Please check your permissions.',
      });
      return;
    }

    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    // Start recording
    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startTest = () => {
    setTestStarted(true);
  };

  const changePart = (index: number) => {
    setCurrentPart(index);
    // Reset recording state when changing parts
    if (isRecording) {
      stopRecording();
    }
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const handleSubmit = async () => {
    if (!audioBlob) {
      toast({
        variant: 'destructive',
        title: 'No Recording',
        description: 'Please record your response before submitting.',
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert blob to base64 data URI
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        // For a real implementation, you would use speech-to-text here
        // For now, we'll use a mock transcription based on the current part
        const mockTranscription = speakingParts[currentPart].questions ? 
          `Response to questions about ${speakingParts[currentPart].title}` : 
          `Response to task: ${speakingParts[currentPart].taskCard}`;
        
        setTranscription(mockTranscription);

        // Evaluate speaking test
        const result = await evaluateSpeakingTest({
          audioDataUri: base64data,
          transcription: mockTranscription
        });

        setFeedback(result);
      };
    } catch (e: any) {
      setError(e.message || 'Failed to evaluate speaking test.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-2 text-center">IELTS Speaking Test</h1>
      <p className="text-lg mb-8 text-center text-muted-foreground">
        Practice your speaking skills with a simulated IELTS interview.
      </p>

      {!testStarted && !feedback ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This test consists of three parts, simulating the actual IELTS Speaking test format. You will need to record your responses to various questions and prompts.
            </p>
            <p className="mb-4">
              Please ensure your microphone is working properly. Having your camera on is recommended but not required.
            </p>
            <div className="flex flex-col space-y-4 mt-6">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${hasMicrophonePermission ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Microphone: {hasMicrophonePermission ? 'Ready' : 'Not Available'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${hasCameraPermission ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Camera: {hasCameraPermission ? 'Ready' : 'Not Available'}</span>
              </div>
            </div>
            <Button 
              onClick={startTest} 
              className="mt-6" 
              disabled={!hasMicrophonePermission}
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {testStarted && !feedback && (
        <Tabs defaultValue="0" className="w-full mb-6">
          <TabsList className="grid grid-cols-3 mb-4">
            {speakingParts.map((part, idx) => (
              <TabsTrigger 
                key={idx} 
                value={idx.toString()} 
                onClick={() => changePart(idx)}
              >
                {`Part ${idx + 1}`}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {speakingParts.map((part, idx) => (
            <TabsContent key={idx} value={idx.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{part.title}</CardTitle>
                    <CardDescription>{part.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {part.questions ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Sample Questions:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {part.questions.map((question, qIdx) => (
                            <li key={qIdx}>{question}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Task Card:</h3>
                        <div className="bg-muted p-4 rounded-md whitespace-pre-line">
                          {part.taskCard}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <p className="text-sm text-muted-foreground">
                        Expected duration: {part.duration} minutes
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Your Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center space-y-6">
                      {hasCameraPermission && (
                        <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                          <video 
                            ref={videoRef} 
                            className={`w-full h-full object-cover ${!cameraActive ? 'hidden' : ''}`} 
                            autoPlay 
                            muted 
                          />
                          {!cameraActive && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                              <CameraOff className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute bottom-2 right-2 rounded-full"
                            onClick={toggleCamera}
                          >
                            {cameraActive ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                      
                      <div className="w-full space-y-4">
                        {isRecording && (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                            <span>Recording: {formatTime(recordingTime)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-center space-x-4">
                          {!isRecording ? (
                            <Button 
                              onClick={startRecording} 
                              className="flex items-center space-x-2"
                              disabled={!hasMicrophonePermission}
                            >
                              <Mic className="h-4 w-4" />
                              <span>Start Recording</span>
                            </Button>
                          ) : (
                            <Button 
                              onClick={stopRecording} 
                              variant="destructive"
                              className="flex items-center space-x-2"
                            >
                              <StopCircle className="h-4 w-4" />
                              <span>Stop Recording</span>
                            </Button>
                          )}
                        </div>
                        
                        {audioUrl && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Review Your Recording:</h4>
                            <audio controls className="w-full">
                              <source src={audioUrl} type="audio/wav" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !audioBlob}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : 'Submit Response'}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {error && (
        <Alert variant="destructive" className="mt-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {feedback && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Speaking Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Band Score</h3>
                <div className="text-4xl font-bold text-primary">
                  {feedback.bandScore}
                </div>
                <Progress 
                  value={(feedback.bandScore / 9) * 100} 
                  className="mt-3 h-2" 
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Pronunciation</h3>
                  <p className="text-sm">{feedback.feedback.pronunciation}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Fluency</h3>
                  <p className="text-sm">{feedback.feedback.fluency}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold">Vocabulary</h3>
                <p className="text-sm">{feedback.feedback.vocabulary}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Grammar</h3>
                <p className="text-sm">{feedback.feedback.grammar}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Overall Feedback</h3>
              <p className="whitespace-pre-line">
                {feedback.feedback.overall}
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button onClick={() => {
                setFeedback(null);
                setTestStarted(false);
                setCurrentPart(0);
                setAudioUrl(null);
                setAudioBlob(null);
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