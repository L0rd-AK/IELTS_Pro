'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer} from '@/components/ui/chart';

const data = [
  {name: 'Reading', score: 7.5},
  {name: 'Writing', score: 6.5},
  {name: 'Listening', score: 8.0},
  {name: 'Speaking', score: 7.0},
];

export default function ProgressTracking() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Progress Tracking</h1>
      <p className="text-lg mb-8">Track your performance over time.</p>

      {/* Add score band charts/graphs */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">IELTS Scores Over Time</h2>
        <ChartContainer config={{}}>
          
        </ChartContainer>
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
            {/* Add more historical data */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
