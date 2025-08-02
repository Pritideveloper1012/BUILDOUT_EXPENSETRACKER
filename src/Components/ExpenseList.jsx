import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { FaPizzaSlice, FaFilm, FaPlane, FaTimes, FaPencilAlt } from 'react-icons/fa';

const categoryIcons = {
  Food: <FaPizzaSlice />,
  Entertainment: <FaFilm />,
  Travel: <FaPlane />,
};

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'white',
          color: 'black',
          borderRadius: 2,
          p: { xs: 1.5, sm: 2 },
        }}
      >
        {expenses.length === 0 && (
          <Typography textAlign="left" color="gray">
            No Transaction!
          </Typography>
        )}

        {expenses.map((expense) => (
          <Grid
            key={expense.id}
            container
            alignItems="center"
            spacing={1}
            sx={{
              mb: 1.5,
              p: 1,
              bgcolor: 'grey.100',
              borderRadius: 2,
              flexWrap: 'wrap',
            }}
          >
            <Grid item>
              <Box
                sx={{
                  bgcolor: 'grey.300',
                  borderRadius: '50%',
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'grey.700',
                  minWidth: '40px',
                  minHeight: '40px',
                }}
                title={`${expense.category} icon`}
              >
                {categoryIcons[expense.category]}
              </Box>
            </Grid>

            <Grid item xs zeroMinWidth sx={{ flexGrow: 1 }}>
              <Typography variant="body2" noWrap>
                {expense.title}
              </Typography>
              <Typography variant="caption" color="gray" noWrap>
                {expense.date}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant="body2"
                color="orange"
                sx={{
                  fontWeight: 'bold',
                  minWidth: '60px',
                  textAlign: 'right',
                }}
              >
                ₹{expense.price}
              </Typography>
            </Grid>

            <Grid item>
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
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
