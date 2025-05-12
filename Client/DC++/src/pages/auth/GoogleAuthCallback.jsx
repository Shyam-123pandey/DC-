import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken, setUser } = useAuth();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get('token');
                const error = params.get('error');

                if (error) {
                    toast.error('Google authentication failed');
                    navigate('/login');
                    return;
                }

                if (token) {
                    // Store the token
                    localStorage.setItem('token', token);
                    setToken(token);

                    // Set the authorization header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Fetch user data
                    try {
                        const response = await axios.get('http://localhost:5000/api/auth/me');
                        setUser(response.data);
                        toast.success('Successfully logged in with Google');
                        // Add a small delay to ensure state is updated
                        setTimeout(() => {
                            navigate('/');
                        }, 100);
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        toast.error('Failed to load user data');
                        navigate('/login');
                    }
                } else {
                    toast.error('No authentication token received');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Google auth error:', error);
                toast.error('Failed to authenticate with Google');
                navigate('/login');
            }
        };

        handleGoogleCallback();
    }, [location, navigate, setToken, setUser]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Processing Google Sign In...</h2>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
        </div>
    );
};

export default GoogleAuthCallback; 