'use client';

import { Card, Flex, Grid, Heading, Section, Text } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDataGetter } from './hooks/useDataGetter';

export default function AnalyticsPage() {
  const { monthlyData, typeData, statusData, responseTimeData, isLoading } =
    useDataGetter();

  if (isLoading) {
    return (
      <Section p="0" className="flex items-center justify-center h-full">
        <Text size="5" weight="bold">
          Loading analytics...
        </Text>
      </Section>
    );
  }

  return (
    <Section p="0" className="space-y-6">
      <Heading size="6" weight="bold" mb="6" className="text-gray-900">
        Analytics & Statistics
      </Heading>

      <div className="flex flex-col gap-6">
        <Card size="3" variant="surface">
          <Flex direction="column" gap="4">
            <Heading size="4" weight="bold">
              Requests by Month
            </Heading>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Bar
                    dataKey="Petition"
                    stackId="a"
                    fill="#3b82f6"
                    barSize={60}
                  />
                  <Bar dataKey="Complaint" stackId="a" fill="#ef4444" />
                  <Bar dataKey="Claim" stackId="a" fill="#f59e0b" />
                  <Bar
                    dataKey="Suggestion"
                    stackId="a"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Flex>
        </Card>

        {/* Middle Section - Two Columns */}
        <Grid columns={{ initial: '1', lg: '2' }} gap="6">
          <Card size="3" variant="surface">
            <Flex direction="column" gap="4" align="center">
              <div className="w-full">
                <Heading size="4" weight="bold">
                  Distribution by Type
                </Heading>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Flex>
          </Card>

          <Card size="3" variant="surface">
            <Flex direction="column" gap="4">
              <Heading size="4" weight="bold">
                Request Status
              </Heading>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={statusData}
                    margin={{ left: 40, right: 30, top: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#E5E7EB"
                    />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{
                        borderRadius: '12px',
                        border: 'none',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[0, 6, 6, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Flex>
          </Card>
        </Grid>

        {/* Bottom Section - Full Width */}
        <Card size="3" variant="surface">
          <Flex direction="column" gap="4">
            <Heading size="4" weight="bold">
              Average Response Time by Type
            </Heading>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={responseTimeData}
                  margin={{ top: 20, right: 30, left: -20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="type"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="days"
                    stroke="#3b82f6"
                    strokeWidth={4}
                    dot={{
                      r: 6,
                      fill: '#3b82f6',
                      strokeWidth: 2,
                      stroke: '#fff',
                    }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Flex>
        </Card>
      </div>
    </Section>
  );
}
