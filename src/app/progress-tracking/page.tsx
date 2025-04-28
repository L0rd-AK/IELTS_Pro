'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

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

const historyData = [
  { id: 1, test: "Reading Test 1", date: "2024-01-15", score: 7.0 },
  { id: 2, test: "Writing Test 1", date: "2024-01-15", score: 6.0 },
  { id: 3, test: "Listening Test 1", date: "2024-01-15", score: 7.5 },
  { id: 4, test: "Speaking Test 1", date: "2024-01-15", score: 6.5 },
  { id: 5, test: "Reading Test 2", date: "2024-02-10", score: 7.5 },
  { id: 6, test: "Writing Test 2", date: "2024-02-10", score: 6.5 },
  { id: 7, test: "Listening Test 2", date: "2024-02-10", score: 8.0 },
  { id: 8, test: "Speaking Test 2", date: "2024-02-10", score: 7.0 },
  { id: 9, test: "Reading Test 3", date: "2024-03-05", score: 8.0 },
  { id: 10, test: "Writing Test 3", date: "2024-03-05", score: 7.0 },
  { id: 11, test: "Listening Test 3", date: "2024-03-05", score: 8.5 },
  { id: 12, test: "Speaking Test 3", date: "2024-03-05", score: 7.5 },
];

export default function ProgressTracking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter history data by selected date if needed
  const filteredData = historyData;
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <PageContainer title="Progress Tracking" description="Track your IELTS performance over time and identify areas for improvement.">
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={readingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Writing Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={writingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Listening Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={listeningData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Speaking Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={speakingData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 9]} ticks={[0, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" allowDuplicatedCategory={false} />
                    <YAxis domain={[0, 9]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                    <Tooltip />
                    <Line data={readingData} name="Reading" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                    <Line data={writingData} name="Writing" dataKey="score" stroke="#10b981" strokeWidth={2} />
                    <Line data={listeningData} name="Listening" dataKey="score" stroke="#f59e0b" strokeWidth={2} />
                    <Line data={speakingData} name="Speaking" dataKey="score" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Test History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Test</th>
                        <th className="p-3 text-left font-medium">Date</th>
                        <th className="p-3 text-left font-medium">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-3">{item.test}</td>
                          <td className="p-3">{new Date(item.date).toLocaleDateString()}</td>
                          <td className="p-3">
                            <span className="font-medium">{item.score}</span>
                            <span className="text-muted-foreground text-sm ml-1">/9.0</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}