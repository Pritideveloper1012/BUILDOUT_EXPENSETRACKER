import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Box, Typography, Stack } from "@mui/material";

// Category colors
const categories = [
  { key: "Food", color: "#8b00ff" },
  { key: "Entertainment", color: "#f59e0b" },
  { key: "Travel", color: "#facc15" },
  {key:'Shopping',color:'#1c0de9ce'},
  {key:'Other',color:'#0de940ce'}
];

// Function to summarize expenses by category
function getTrendsData(expenses) {
  const summary = {};
  categories.forEach(({ key }) => (summary[key] = 0));
  expenses.forEach((expense) => {
    if (summary[expense.category] !== undefined) {
      summary[expense.category] += Number(expense.price);
    }
  });

  return Object.entries(summary).map(([name, value]) => ({ name, value }));
}

export default function ExpenseTrendsChart({ expenses }) {
  const data = getTrendsData(expenses);

  const isEmpty = data.every((d) => d.value === 0);

  return (
    <>
    <Typography variant="h6" sx={{ mb: 1, color: "#333" }}>
         Top Expenses
      </Typography>
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        borderRadius: 2,
        p: 2,
        minHeight: 180,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      

      {isEmpty ? (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {categories.map((cat) => (
            <Box
              key={cat.key}
              sx={{
                color: cat.color,
                fontWeight: 500,
                fontSize: "16px",
                flex: "1 1 30%",
                
              }}
            >
              {cat.key} -
            </Box>
          ))}
        </Stack>
      ) : (
<ResponsiveContainer width="100%" height={200}>
    <BarChart
    data={data}
    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
    barCategoryGap="30%"
    barGap={8}
  >
    <XAxis 
      dataKey="name" 
      stroke="#333" 
      strokeWidth={2} 
      tick={{ fontWeight: 600, fontSize: 14 }} 
    />
    <YAxis stroke="#333" strokeWidth={2} />
    <Tooltip formatter={(value) => `₹${value}`} />
    <Bar dataKey="value" barSize={80} radius={[10, 10, 0, 0]}>
      {data.map((entry, index) => (
        <Cell
          key={`cell-${index}`}
          fill={
            categories.find((c) => c.key === entry.name)?.color ||
            "#6366f1"
          }
        />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

      )}
    </Box>
    </>
  );
}
