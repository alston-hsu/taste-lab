import TestButton from './components/TestButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
          <TestButton>
          </TestButton>
      </div>
    </ThemeProvider>
  );
}

export default App;
