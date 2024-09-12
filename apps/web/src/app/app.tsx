import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Skeleton,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import type { WheelDataType } from 'react-custom-roulette';

import { SpinWheel } from './components';
import { generateRandomColor } from './utils';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const API_URL =
  'https://script.google.com/macros/s/AKfycbye-vQ7rkXjBPc5I8yhQo9HQcwBnBDtIC9Wch6mortUj78RwINFQbdY2dJkQAiH9aoIkA/exec';

type Sura = {
  id: number;
  name: string;
};

function RandomText(props: { options: string[]; interval: number }) {
  const [newName, setNewName] = useState('');

  const selectRandomText = useCallback(() => {
    const index = Math.floor(Math.random() * props.options.length);
    setNewName(props.options[index]);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(selectRandomText, props.interval / 100);
    return () => clearInterval(intervalId);
  }, [selectRandomText, props.interval]);

  return <Typography variant="h4">{newName}</Typography>;
}

export function App() {
  const { width, height } = useWindowSize();
  const [suraList, setSuraList] = useState<WheelDataType[]>();
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [selectedSura, setSelectedSura] = useState<number | null>(null);
  const theme = useTheme();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => {
        const { data }: { data: Sura[] } = res;
        console.log({ data });
        const suraList: WheelDataType[] = data.map((sura) => {
          const backgroundColor = generateRandomColor();
          const textColor = theme.palette.getContrastText(backgroundColor);
          return {
            option: sura.name,
            style: {
              textColor,
              backgroundColor,
            },
          };
        });
        setSuraList(suraList);
      });
  }, []);

  function handleSpinClick() {
    setMustStartSpinning(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <ReactConfetti
        recycle={true}
        run={Boolean(!mustStartSpinning && selectedSura)}
        width={width}
        height={height}
        numberOfPieces={1000}
        hidden={mustStartSpinning}
      />
      <Container>
        <Card
          style={{
            marginTop: '15vh',
          }}
        >
          {suraList && suraList.length > 0 ? (
            <Stack gap={2} padding={2} alignItems={'center'}>
              <Stack gap={2} padding={2} alignItems={'center'}>
                <SpinWheel
                  options={suraList}
                  mustStartSpinning={mustStartSpinning}
                  spinDuration={0.5}
                  prizeNumber={Math.floor(
                    Math.random() * Number(suraList.length)
                  )}
                  onStopSpinning={(number) => {
                    setSelectedSura(number);
                    setMustStartSpinning(false);
                  }}
                />
                {mustStartSpinning ? (
                  // <Skeleton
                  //   sx={{
                  //     fontSize: 64,
                  //   }}
                  //   width={300}
                  //   variant="text"
                  // />
                  <RandomText
                    interval={10_000}
                    options={suraList.map((e) => String(e.option))}
                  />
                ) : (
                  // <Typography variant="h4">
                  //   {suraList[randomOptionIndex].option}
                  // </Typography>
                  selectedSura && (
                    <Typography variant="h4">
                      {suraList[selectedSura].option}
                    </Typography>
                  )
                )}
              </Stack>
              <Button
                disabled={!suraList || suraList.length < 1}
                fullWidth
                variant="contained"
                onClick={handleSpinClick}
              >
                Spin the wheel
              </Button>
            </Stack>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                // height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                gap: 4,
                flexDirection: 'column',
              }}
            >
              <Skeleton variant="circular" width={300} height={300} />
              <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
          )}
        </Card>
      </Container>{' '}
    </ThemeProvider>
  );
}

export default App;
