import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';

import ExpenseSummaryChart from './ExpenseSummaryChart';
import ExpenseList from './ExpenseList';
import AddIncomeModal from './AddIncomeModal';
import AddExpenseModal from './AddExpenseModal';
import ExpenseTrendsChart from './ExpenseTrendsChart';

function AppContent() {
  const [walletBalance, setWalletBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? Number(saved) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalExpenses = expenses.reduce((acc, e) => acc + Number(e.price), 0);

  const handleAddIncome = (amount) => {
    setWalletBalance((prev) => prev + amount);
    enqueueSnackbar('Income added successfully', { variant: 'success' });
  };

  const handleAddExpense = (expense) => {
    if (expense.price > walletBalance) {
      enqueueSnackbar('You cannot spend more than your wallet balance.', { variant: 'error' });
      return false;
    }
    setExpenses((prev) => [...prev, expense]);
    setWalletBalance((prev) => prev - expense.price);
    enqueueSnackbar('Expense added successfully', { variant: 'success' });
    return true;
  };

  const handleEditExpense = (updatedExpense) => {
    const oldExpense = expenses.find((e) => e.id === updatedExpense.id);
    if (!oldExpense) return false;

    const priceDiff = updatedExpense.price - oldExpense.price;
    if (priceDiff > walletBalance) {
      enqueueSnackbar('You cannot spend more than your wallet balance.', { variant: 'error' });
      return false;
    }

    setExpenses((prev) => 
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setWalletBalance((prev) => prev - priceDiff);
    enqueueSnackbar('Expense updated successfully', { variant: 'success' });
    return true;
  };

  const handleDeleteExpense = (id) => {
    const expenseToDelete = expenses.find((e) => e.id === id);
    if (!expenseToDelete) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    setWalletBalance((prev) => prev + expenseToDelete.price);
    enqueueSnackbar('Expense deleted successfully', { variant: 'info' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" color="white" gutterBottom fontWeight={600}>
        Expense Tracker
      </Typography>

      {/* Wallet + Expense + Pie Chart */}
      <Card
        sx={{
          backgroundColor: '#9c8f8fff',
          borderRadius: 3,
          p: 2,
          mb: 4,
          boxShadow: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid  item xs={12} sm={6} md={4}>
            <Card sx={{ color: 'white', borderRadius: 3 }}>
              <CardContent sx={{ backgroundColor: '#3b3b3b' }}>
                <Typography variant="h6" color="success.light">
                  Wallet Balance: ₹{walletBalance}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, width: '100%', py: 1.2 }}
                  onClick={() => setIsAddIncomeOpen(true)}
                >
                  + Add Income
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid  item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#444', color: 'white', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" color="warning.main">
                  Expenses: ₹{totalExpenses}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2, width: '100%', py: 1.2 }}
                  onClick={() => setIsAddExpenseOpen(true)}
                >
                  + Add Expense
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid  item xs={12} sm={6} md={4}>
             <CardContent>
                <ExpenseSummaryChart expenses={expenses} />
              </CardContent>
           
          </Grid>
        </Grid>
      </Card>

      {/* Recent Transactions + Trends Chart */}
      <Card
        sx={{
          backgroundColor: '#9c8f8fff',
          borderRadius: 3,
          p: 2,
          mb: 4,
          boxShadow: 4,
          gap:6
        }}
      >
        <Grid container spacing={3}>
          <Grid  item xs={12} sm={6} md={6}>
            <Typography variant="h6" color="white" gutterBottom fontWeight={600}>
              Recent Transactions
            </Typography>
            <Card sx={{ color: 'white', borderRadius: 3 }}>
              <CardContent>
                <ExpenseList
                  expenses={expenses}
                  onDelete={handleDeleteExpense}
                  onEdit={(expense) => {
                    setEditExpense(expense);
                    setIsAddExpenseOpen(true);
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid  item xs={12} sm={6} md={6}>
            <Card sx={{ color: 'white', borderRadius: 3 }}>
              <CardContent>
                <ExpenseTrendsChart expenses={expenses} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>

      {/* Modals */}
      <AddIncomeModal
        open={isAddIncomeOpen}
        onClose={() => setIsAddIncomeOpen(false)}
        onAddIncome={handleAddIncome}
      />
      <AddExpenseModal
        open={isAddExpenseOpen}
        onClose={() => {
          setIsAddExpenseOpen(false);
          setEditExpense(null);
        }}
        onAddExpense={handleAddExpense}
        onEditExpense={handleEditExpense}
        editExpense={editExpense}
      />
    </Container>
  );
}

export default AppContent;
