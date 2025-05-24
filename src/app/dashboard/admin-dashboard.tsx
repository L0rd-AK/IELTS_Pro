'use client';

import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

const studentStats = [
	{ name: 'Total Students', value: 150, change: '+12%' },
	{ name: 'Active Students', value: 120, change: '+5%' },
	{ name: 'Average Score', value: '7.2', change: '+0.3' },
	{ name: 'Tests Taken', value: 450, change: '+45' },
];

const scoreDistribution = [
	{ band: '5.0-5.5', count: 15 },
	{ band: '6.0-6.5', count: 45 },
	{ band: '7.0-7.5', count: 55 },
	{ band: '8.0-8.5', count: 30 },
	{ band: '9.0', count: 5 },
];

export function AdminDashboard() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('http://localhost:5000/users')
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
				setLoading(false);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<PageContainer title="Admin Dashboard" description="Overview of student performance and system statistics">
			<div className="grid gap-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{studentStats.map((stat, index) => (
						<Card key={index}>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
								<CardDescription className="text-green-600">{stat.change}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold">{stat.value}</div>
							</CardContent>
						</Card>
					))}
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Score Distribution</CardTitle>
						<CardDescription>Band score distribution across all students</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-80 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={scoreDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="band" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="count" fill="hsl(var(--primary))" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>All Users</CardTitle>
						<CardDescription>List of all registered users in the system</CardDescription>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="flex justify-center p-4">
								<Loader2 className="w-6 h-6 animate-spin" />
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Join Date</TableHead>
										<TableHead>Last Active</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user: any) => (
										<TableRow key={user.email}>
											<TableCell className="font-medium">{user.name}</TableCell>
											<TableCell>{user.email}</TableCell>
											<TableCell className="capitalize">{user.role}</TableCell>
											<TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
											<TableCell>
												{new Date(user.lastActive || user.createdAt).toLocaleDateString()}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</PageContainer>
	);
}
