import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { FaPizzaSlice, FaFilm, FaPlane, FaTimes, FaPencilAlt } from 'react-icons/fa';

const categoryIcons = {
  Food: <FaPizzaSlice />,
  Entertainment: <FaFilm />,
  Travel: <FaPlane />,
};

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedExpenseId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedExpenseId(null);
  };

  const confirmDelete = () => {
    if (selectedExpenseId !== null) {
      onDelete(selectedExpenseId);
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h6" fontStyle="italic" mb={2}>
        Recent Transactions!
      </Typography>
      <Box sx={{ bgcolor: 'white', color: 'black', borderRadius: 2, p: 2 }}>
        {expenses.length === 0 && (
          <Typography textAlign="center" color="gray">
            No Transaction
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
              onClick={() => handleOpenDialog(expense.id)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
