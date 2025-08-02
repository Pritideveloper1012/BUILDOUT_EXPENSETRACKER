import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

Modal.setAppElement('#root');

const categories = ['Food', 'Entertainment', 'Travel'];

export default function AddExpenseModal({
  open,
  onClose,
  onAddExpense,
  onEditExpense,
  editExpense,
}) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setPrice(editExpense.price);
      setCategory(editExpense.category);
      setDate(editExpense.date);
    } else {
      resetForm();
    }
  }, [editExpense, open]);

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setCategory('');
    setDate('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !category || !date) {
      setError('Please fill all required fields');
      return;
    }
    const expenseData = {
      id: editExpense ? editExpense.id : Date.now(),
      title: title.trim(),
      price: Number(price),
      category,
      date,
    };
    let success = false;
    if (editExpense) {
      success = onEditExpense(expenseData);
    } else {
      success = onAddExpense(expenseData);
    }
    if (success) {
      onClose();
      resetForm(); // Reset form after successful submission
    }
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000 },
        content: {
          maxWidth: '300px',
          maxHeight: '400px',
          margin: 'auto',
          borderRadius: '20px',
          padding: '20px',
          backgroundColor: '#1f2937',
          color: 'white',
        },
      }}
      contentLabel={editExpense ? 'Edit Expense Modal' : 'Add Expense Modal'}
    >
      <Typography variant="h6" mb={2}>
        {editExpense ? 'Edit Expense' : 'Add Expense'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="title"
          label="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          name="price"
          label="Expense Amount"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          inputProps={{ min: 1 }}
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        <TextField
          select
          name="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
          InputProps={{ style: { backgroundColor: 'white' } }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          InputProps={{ style: { backgroundColor: 'white' } }}
        />
        {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} color="inherit" type="button">
            Cancel
          </Button>
          <Button variant="contained" color="error" type="submit">
            {editExpense ? 'Update Expense' : 'Add Expense'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
