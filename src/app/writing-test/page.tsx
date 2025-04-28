'use client';

import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';

export default function WritingTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Writing Test</h1>
      <p className="text-lg mb-8">Task 1 (data/graph description) and Task 2 (essay).</p>
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Task 1</h2>
        <p className="mb-2">You should spend about 20 minutes on this task.</p>
        <p className="mb-2">You are given a graph/chart/table/diagram and asked to describe, summarise or explain the information in your own words.</p>
        <Textarea placeholder="Write your response for Task 1 here" className="mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Task 2</h2>
        <p className="mb-2">You should spend about 40 minutes on this task.</p>
        <p className="mb-2">You are asked to write an essay in response to a point of view, argument or problem.</p>
        <Textarea placeholder="Write your response for Task 2 here" className="mb-4" />
        <Button>Evaluate Writing</Button>
      </div>
    </div>
  );
}
