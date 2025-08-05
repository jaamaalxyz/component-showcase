import { Routes, Route } from 'react-router';
import { Layout } from './components/layouts/Layout';
import { Home } from './pages/Home';
import { ButtonPage } from './pages/ButtonPage';
import { AccordionPage } from './pages/AccordionPage';
import { ContextFormPage } from './pages/ContextFormPage';
import { AuthFormPage } from './pages/AuthFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="button" element={<ButtonPage />} />
        <Route path="accordion" element={<AccordionPage />} />
        <Route path="context-form" element={<ContextFormPage />} />
        <Route path="auth-form" element={<AuthFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
