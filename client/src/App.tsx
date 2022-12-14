import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loading } from 'components';
import GlobalStyle from './globalStyles';

const Landing = lazy(() => import('routes/landing'));
const Register = lazy(() => import('routes/register'));
const Login = lazy(() => import('routes/login'));
const Explore = lazy(() => import('routes/explore'));

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <GlobalStyle />
            <Routes>
                <Route path="/">
                    <Route index element={<Landing />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="explore" element={<Explore />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
