import { ThemeProvider } from '@/components/theme-provider';
import SignaturePad from '@/components/SignaturePad';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <SignaturePad />
      </div>
    </ThemeProvider>
  );
}

export default App;