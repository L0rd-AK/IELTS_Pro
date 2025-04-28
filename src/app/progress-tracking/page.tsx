'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer} from '@/components/ui/chart';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const readingData = [
  {name: 'Test 1', score: 7.0},
  {name: 'Test 2', score: 7.5},
  {name: 'Test 3', score: 8.0},
];

const writingData = [
  {name: 'Test 1', score: 6.0},
  {name: 'Test 2', score: 6.5},
  {name: 'Test 3', score: 7.0},
];

const listeningData = [
  {name: 'Test 1', score: 7.5},
  {name: 'Test 2', score: 8.0},
  {name: 'Test 3', score: 8.5},
];

const speakingData = [
  {name: 'Test 1', score: 6.5},
  {name: 'Test 2', score: 7.0},
  {name: 'Test 3', score: 7.5},
];

export default function ProgressTracking() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Progress Tracking</h1>
      <p className="text-lg mb-8">Track your performance over time.</p>

      {/* Add score band charts/graphs */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">IELTS Scores Over Time</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={readingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Writing</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={writingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listening</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={listeningData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Speaking</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={speakingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#a45de3" fill="#a45de3" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add historical performance tracking */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Historical Performance</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Test</th>
              <th className="text-left">Date</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reading Test 1</td>
              <td>2024-01-15</td>
              <td>7.0</td>
            </tr>
            <tr>
              <td>Writing Test 1</td>
              <td>2024-01-15</td>
              <td>6.0</td>
            </tr>
            <tr>
              <td>Listening Test 1</td>
              <td>2024-01-15</td>
              <td>7.5</td>
            </tr>
            <tr>
              <td>Speaking Test 1</td>
              <td>2024-01-15</td>
              <td>6.5</td>
            </tr>
            {/* Add more historical data */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
