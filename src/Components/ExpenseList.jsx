import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import { FaPizzaSlice, FaFilm, FaPlane, FaTimes, FaPencilAlt } from 'react-icons/fa';

const categoryIcons = {
  Food: <FaPizzaSlice />,
  Entertainment: <FaFilm />,
  Travel: <FaPlane />,
};

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <Box>
      {/* <Typography variant="h6" fontStyle="italic" mb={2}>
        Recent Transactions
      </Typography> */}
      <Box sx={{ bgcolor: 'white', color: 'black', borderRadius: 2, p: 2 }}>
        {expenses.length === 0 && (
          <Typography textAlign="" color="gray">
            No Transaction!
          </Typography>
        )}
        {expenses.map((expense) => (
          <Box key={expense.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                bgcolor: 'grey.300',
                borderRadius: '50%',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                color: 'grey.700',
              }}
              title={`${expense.category} icon`}
            >
              {categoryIcons[expense.category]}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2">{expense.title}</Typography>
              <Typography variant="caption" color="gray">
                {expense.date}
              </Typography>
            </Box>
            <Typography variant="body2" color="orange" sx={{ fontWeight: 'bold', mr: 1 }}>
              ₹{expense.price}
            </Typography>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => onDelete(expense.id)}
              size="small"
            >
              <FaTimes />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="warning"
              onClick={() => onEdit(expense)}
              size="small"
            >
              <FaPencilAlt />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
}