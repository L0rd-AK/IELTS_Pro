'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, StopCircle, Camera, CameraOff } from 'lucide-react';
import { evaluateSpeakingTest } from '@/ai/flows/evaluate-speaking-test';

// Add type for feedback
interface FeedbackType {
  bandScore: number;
  feedback: {
    pronunciation: string;
    fluency: string;
    vocabulary: string;
    grammar: string;
    overall: string;
  };
}

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
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [transcription, setTranscription] = useState('');
  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);
  
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
      setIsCameraLoading(true);
      setPermissionDenied(false);

      try {
        // First check if permissions are already granted
        const permissions = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = permissions;
          streamRef.current = permissions;
          
          // Wait for metadata to be loaded before playing
          videoRef.current.onloadedmetadata = async () => {
            try {
              await videoRef.current?.play();
              setHasCameraPermission(true);
              setHasMicrophonePermission(true);
            } catch (playError) {
              console.error("Error playing video:", playError);
              // Don't set camera permission to false here, just handle the play error
              toast({
                title: "Video Preview Error",
                description: "Unable to preview camera, but recording will still work.",
              });
            }
          };
        }
      } catch (error: any) {
        console.error('Error accessing media devices:', error);
        setPermissionDenied(true);

        // Check if it's a permission error
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          toast({
            variant: 'destructive',
            title: 'Permission Denied',
            description: 'Please allow camera and microphone access in your browser settings.',
          });
          
          // Try audio only
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = audioStream;
            setHasMicrophonePermission(true);
            setHasCameraPermission(false);
            toast({
              title: 'Audio Only Mode',
              description: 'Proceeding with microphone only.',
            });
          } catch (audioError) {
            setHasMicrophonePermission(false);
            toast({
              variant: 'destructive',
              title: 'Microphone Access Required',
              description: 'This test requires microphone access to work.',
            });
          }
        } else {
          // Handle other types of errors
          toast({
            variant: 'destructive',
            title: 'Device Error',
            description: 'Unable to access media devices. Please check your hardware.',
          });
        }
      } finally {
        setIsCameraLoading(false);
      }
    };

    getMediaPermissions();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
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
    setIsLoading(true);
    setError(null);
    
    if (!audioBlob) {
      toast({
        variant: "destructive",
        title: "No recording found",
        description: "Please record your response before submitting."
      });
      setIsLoading(false);
      return;
    }

    try {
      const audioDataUri = URL.createObjectURL(audioBlob);
      const response = await evaluateSpeakingTest({
        audioDataUri,
        transcription,
        currentPart
      });
      
      if (response && typeof response === 'object') {
        setFeedback(response as FeedbackType);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong during evaluation");
      toast({
        variant: "destructive",
        title: "Evaluation failed",
        description: error.message || "Something went wrong"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const getMediaPermissions = async () => {
    setIsCameraLoading(true);
    setPermissionDenied(false);

    try {
      const permissions = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = permissions;
        streamRef.current = permissions;
        await videoRef.current.play();
        setHasCameraPermission(true);
        setHasMicrophonePermission(true);
      }
    } catch (error: any) {
      console.error('Error accessing media devices:', error);
      setPermissionDenied(true);
      setHasCameraPermission(false);
      setHasMicrophonePermission(false);
    } finally {
      setIsCameraLoading(false);
    }
  };

  const initializeCamera = async () => {
  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        try {
          await videoRef.current.play();
        } catch (e) {
          console.error("Error playing video:", e);
        }
        setHasCameraPermission(true);
        setHasMicrophonePermission(true);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setHasCameraPermission(false);
      setHasMicrophonePermission(false);
    }
  };

  useEffect(() => {
    initializeCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${hasMicrophonePermission ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>Microphone: {hasMicrophonePermission ? 'Ready' : 'Not Available'}</span>
                </div>
                {permissionDenied && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={getMediaPermissions}
                  >
                    Retry Permissions
                  </Button>
                )}
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
                          {isCameraLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                            </div>
                          )}
                          <video 
                            ref={videoRef}
                            className={`w-full h-full object-cover ${!cameraActive || isCameraLoading ? 'hidden' : ''}`}
                            autoPlay
                            playsInline
                            muted
                          />
                          {!cameraActive && !isCameraLoading && (
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
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4zm16 0a8 8 0 01-8 8v-8h8z"></path>
                      </svg>
                      Evaluating...
                    </>
                  ) : (
                    'Submit Response'
                  )}
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

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-bounce mb-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium animate-pulse">
              Evaluating your speaking...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}