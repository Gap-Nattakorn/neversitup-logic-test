import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
});

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const classes = useStyles();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    validation(newValue);
  };

  const validation = (data: string) => {
    if (data.length < 6) {
      setError('input จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร');
    } else if (checkRepeatNumber(data)) {
      setError('input จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว');
    } else if (checkSequentialNumber(data)) {
      setError('input จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว');
    } else if (checkRepeatNumberMoreThanTwo(data)) {
      setError('.input จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด');
    } else {
      setError('');
    }
  };

  const checkRepeatNumber = (data: string) => {
    for (let i = 0; i < data.length; i++) {
      const check = data.slice(i, i + 3);
      if (check.length === 3) {
        if (check[0] === check[1] && check[1] === check[2]) {
          return true;
        }
      }
    }

    return false;
  };

  const checkRepeatNumberMoreThanTwo = (data: string) => {
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      const check = data.slice(i, i + 2);

      if (check.length === 2) {
        if (check[0] === check[1]) {
          count++;
        }
      }
    }

    return count > 2 ? true : false;
  };

  const checkSequentialNumber = (data: string) => {
    for (let i = 0; i < data.length; i++) {
      const check = data.slice(i, i + 3);

      if (check.length === 3) {
        const sorting = check.split('').sort((a, b) => +a - +b);

        if (
          +check[1] === +check[0] + 1 &&
          +check[2] === +check[1] + 1 &&
          check === sorting.join('')
        ) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <TextField
        sx={{ width: '50%' }}
        autoFocus
        id='input'
        name='input'
        type='number'
        onChange={onChange}
        value={input}
        className={classes.input}
      />
      {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
    </Container>
  );
}

export default App;
