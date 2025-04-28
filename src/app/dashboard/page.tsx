'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  {name: 'Reading', score: 7.5},
  {name: 'Writing', score: 6.5},
  {name: 'Listening', score: 8.0},
  {name: 'Speaking', score: 7.0},
];

const historyData = [
  { name: 'Test 1', reading: 7.0, writing: 6.0, listening: 7.5, speaking: 6.5 },
  { name: 'Test 2', reading: 7.5, writing: 6.5, listening: 8.0, speaking: 7.0 },
  { name: 'Test 3', reading: 8.0, writing: 7.0, listening: 8.5, speaking: 7.5 },
];

export default function Dashboard() {
  const overallScore = (data.reduce((acc, item) => acc + item.score, 0) / data.length).toFixed(1);

  return (
    <PageContainer title="Dashboard" description="Overview of your IELTS progress and performance.">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Band Score</CardTitle>
              <CardDescription>Based on your recent tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{overallScore}</div>
              <p className="text-xs text-muted-foreground">out of 9.0</p>
              <Progress value={Number(overallScore) / 9 * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          {data.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{item.name} Score</CardTitle>
                <CardDescription>Your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{item.score}</div>
                <p className="text-xs text-muted-foreground">out of 9.0</p>
                <Progress value={item.score / 9 * 100} className="mt-3 h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="bar">Score Breakdown</TabsTrigger>
            <TabsTrigger value="line">Progress Over Time</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Score Breakdown</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 9]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="line" className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Progress Over Time</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 9]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="reading" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="writing" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="listening" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="speaking" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest test attempts and practice sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{`Test ${index + 1}`}</p>
                    <p className="text-sm text-muted-foreground">{`${new Date(2023, 11 + index, 15).toLocaleDateString()}`}</p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Reading</p>
                      <p className="font-medium">{item.reading}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Writing</p>
                      <p className="font-medium">{item.writing}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Listening</p>
                      <p className="font-medium">{item.listening}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Speaking</p>
                      <p className="font-medium">{item.speaking}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}