import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const categories = [
  { key: 'Food', color: '#8b00ff' },
  { key: 'Entertainment', color: '#f59e0b' },
  { key: 'Travel', color: '#facc15' },
  {key:'Shopping',color:'#1c0de9ce'},
  {key:'Other',color:'#0de940ce'}
];

function getCategorySummary(expenses) {
  const summary = {};
  categories.forEach(({ key }) => (summary[key] = 0));
  expenses.forEach((e) => {
    if (summary[e.category] !== undefined) {
      summary[e.category] += Number(e.price);
    }
  });
  return Object.entries(summary)
    .map(([name, value]) => ({ name, value }))
    .filter((d) => d.value > 0);
}

export default function ExpenseSummaryChart({ expenses }) {
  const data = getCategorySummary(expenses);

  if (data.length === 0) {
    return (
      <Box sx={{  borderRadius: 2, p: 6, textAlign: 'center' }}>
        <Typography color="gray">No expenses to show</Typography>
      </Box>
    );
  }

  return (
    <Box >
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={categories.find((c) => c.key === entry.name)?.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value}`} />
        </PieChart>
      </ResponsiveContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
        {categories.map(({ key, color }) => (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12,  color, borderRadius: 1 }} />
            <Typography variant="caption">{key}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}