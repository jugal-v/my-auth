import { useEffect } from 'react';
import Floater from './components/Floater';
import AppRoutes from './routes/AppRoutes';
import { useAuthStore } from './store/useAuthStore';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
    const { checkAuth, isAuthenticated, user, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log('Is Authenticated: ', isAuthenticated);
    console.log('User: ', user);

    if (isCheckingAuth) {
        return <LoadingSpinner />;
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
            <Floater color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
            <Floater color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
            <Floater color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

            <AppRoutes />
        </div>
    );
}

export default App;
