'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer} from '@/components/ui/chart';
import {Progress} from '@/components/ui/progress';

const data = [
  {name: 'Reading', score: 7.5},
  {name: 'Writing', score: 6.5},
  {name: 'Listening', score: 8.0},
  {name: 'Speaking', score: 7.0},
];

export default function Dashboard() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen py-8 px-8">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Overview of your IELTS progress.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Overall Band Score</CardTitle>
            <CardDescription>Based on your recent tests</CardDescription>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            7.2 <span className="text-sm text-muted-foreground ml-2">/ 9.0</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reading Score</CardTitle>
            <CardDescription>Your performance in reading tests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            7.5 <span className="text-sm text-muted-foreground ml-2">/ 9.0</span>
            <Progress value={7.5 / 9 * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Writing Score</CardTitle>
            <CardDescription>Your performance in writing tests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            6.5 <span className="text-sm text-muted-foreground ml-2">/ 9.0</span>
            <Progress value={6.5 / 9 * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listening Score</CardTitle>
            <CardDescription>Your performance in listening tests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            8.0 <span className="text-sm text-muted-foreground ml-2">/ 9.0</span>
            <Progress value={8.0 / 9 * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Speaking Score</CardTitle>
            <CardDescription>Your performance in speaking tests</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            7.0 <span className="text-sm text-muted-foreground ml-2">/ 9.0</span>
             <Progress value={7.0 / 9 * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Add chart/graphical representation */}
      <div className="w-full mt-8">
        <h2 className="text-2xl font-semibold mb-4">Score Chart</h2>
        <ChartContainer config={{}}>
          
        </ChartContainer>
      </div>
    </div>
  );
}
