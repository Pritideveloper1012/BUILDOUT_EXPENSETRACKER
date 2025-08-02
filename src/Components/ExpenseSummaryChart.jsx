import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const categories = [
  { key: 'Food', color: '#8b00ff' },
  { key: 'Entertainment', color: '#f59e0b' },
  { key: 'Travel', color: '#facc15' },
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
  const showChart = data.length > 0;

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        width: '100%',
        maxWidth: '100%',
        textAlign: 'center',
      }}
    >
      {showChart ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="60%"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categories.find((c) => c.key === entry.name)?.color}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Typography color="gray" sx={{ mb: 2 }}>
          {/* No expenses added yet. Categories will appear below. */}
        </Typography>
      )}

      {/* Category color legend (always visible) */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2,
        }}
      >
        {categories.map(({ key, color }) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                bgcolor: color,
                borderRadius: '2px',
              }}
            />
            <Typography variant="caption">{key}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
