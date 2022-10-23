import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loading } from 'components';
import GlobalStyle from './globalStyles';

const Landing = lazy(() => import('routes/landing'));

const App = () => {
    return (
        <Suspense fallback={<Loading />}>
            <GlobalStyle />
            <Routes>
                <Route path="/">
                    <Route index element={<Landing />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
