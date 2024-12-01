'use client';

import { Status } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface DataElements {
  status: Status;
  total: number;
}

interface DashChartProps {
  data: DataElements[];
}

export default function DashChart({ data }: DashChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={377}>
          <BarChart data={data}>
            <XAxis
              dataKey="status"
              stroke="#888"
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke="#888" fontSize={12} />
            <Bar dataKey="total" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
