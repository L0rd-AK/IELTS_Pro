'use client';

import {Button} from '@/components/ui/button';
import {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {useToast} from "@/hooks/use-toast";

export default function SpeakingTest() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {toast} = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Speaking Test</h1>
      <p className="text-lg mb-8">Voice recording capability for each part.</p>

      {/* Add voice recording capability for each part */}
      <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />

      { !(hasCameraPermission) && (
          <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera access to use this feature.
            </AlertDescription>
          </Alert>
      )
      }

      {/* Add interface for each part of the speaking test */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Part 1: Introduction</h2>
        <p>The examiner will ask you some general questions about yourself and a range of familiar topics, such as home, family, work, studies and interests.</p>
        <Button className="mt-4">Start Recording</Button>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Part 2: Cue Card</h2>
        <p>You will be given a cue card which asks you to talk about a particular topic. You will have one minute to prepare before speaking for up to two minutes.</p>
        
        <h2 className="text-2xl font-semibold mt-4 mb-2">Part 3: Discussion</h2>
        <p>The examiner will ask you further questions which are connected to the topic in Part 2.</p>
        <Button className="mt-4">Evaluate Speaking</Button>
      </div>
    </div>
  );
}
