import React, { Profiler } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider } from './context/FilterContext';
import theme from './theme';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import OnboardingFlow from './pages/OnboardingFlow';
import Chat from './pages/Chat';
import CreateChat from './pages/CreateChat';
import Discussions from './pages/Discussions';
import Calendar from './pages/Calendar';
import Opportunities from './pages/Opportunities';
import Profile from './pages/Profile'
import Content from './pages/Content'
import FilterOnboarding from './pages/FilterOnboarding';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <FilterProvider>
                    <Router>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Layout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={
                                    <FilterOnboarding>
                                        <Home />
                                    </FilterOnboarding>
                                } />
                                <Route path="onboarding" element={
                                    <FilterOnboarding>
                                        <OnboardingFlow />
                                    </FilterOnboarding>
                                } />
                                <Route path="chat" element={
                                    <FilterOnboarding>
                                        <Chat />
                                    </FilterOnboarding>
                                } />
                                <Route path="create-chat" element={
                                    <FilterOnboarding>
                                        <CreateChat />
                                    </FilterOnboarding>
                                } />
                                <Route path="discussions" element={
                                    <FilterOnboarding>
                                        <Discussions />
                                    </FilterOnboarding>
                                } />
                                <Route path='profile' element={
                                    <FilterOnboarding>
                                        <Profile />
                                    </FilterOnboarding>
                                }/>
                                <Route path='content' element={
                                    <FilterOnboarding>
                                        <Content />
                                    </FilterOnboarding>
                                }/>
                                <Route path="calendar" element={
                                    <FilterOnboarding>
                                        <Calendar />
                                    </FilterOnboarding>
                                } />
                                <Route path="opportunities" element={
                                    <FilterOnboarding>
                                        <Opportunities />
                                    </FilterOnboarding>
                                } />
                            </Route>

                            {/* Catch all route */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Router>
                </FilterProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
