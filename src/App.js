import TestButton from './components/TestButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1 class="text-3xl font-bold underline">test</h1>
        <TestButton>
        </TestButton>
      </div>
    </ThemeProvider>
  );
}

export default App;
