import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ISegments } from 'spin-wheel-game';

import { suraList as localSuraList } from './data';
import { SpinWheel } from './components';
import { generateRandomColor, generateSura } from './utils';

const API_URL =
  'https://script.google.com/macros/s/AKfycbye-vQ7rkXjBPc5I8yhQo9HQcwBnBDtIC9Wch6mortUj78RwINFQbdY2dJkQAiH9aoIkA/exec';

type Sura = {
  id: number;
  suraList: string;
};

export function App() {
  const [selectedSura, setSelectedSura] = useState<string | null>(null);
  const [suraList, setSuraList] = useState<ISegments[] | null>(null);
  const spinWheelRef = useRef(null);
  const handleGenerateSuraClick = () => {
    // const sura = generateSura(suraList);
    // setSelectedSura(sura);
  };

  const callback = useCallback(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(([res]) => {
        const { data }: { data: Sura[] } = res;
        const suraList = data.map((sura) => ({
          segmentText: sura.suraList,
          segColor: generateRandomColor(),
        }));
        setSuraList(suraList);
      });
  }, []);

  useEffect(() => {
    callback();
  }, [callback]);

  useEffect(() => {
    if (!spinWheelRef.current) return;
    const spinWheel: HTMLDivElement = spinWheelRef.current;
    const wheel = spinWheel.querySelector('#wheel');
    const canvas = spinWheel.querySelector('#canvas');
  }, [suraList]);

  function handleSpinClick() {
    if (!spinWheelRef.current) return;
    const spinWheel: HTMLDivElement = spinWheelRef.current;
    const canvas = spinWheel.querySelector('#canvas') as HTMLCanvasElement;
    if (!canvas) return;
    canvas.click();
  }

  return (
    <Container>
      <Card
        style={{
          marginTop: '15vh',
        }}
      >
        {suraList && suraList.length > 0 ? (
          <Stack gap={2} padding={2} alignItems={'center'}>
            <Stack gap={2} padding={2} alignItems={'center'}>
              <Box ref={spinWheelRef}>
                <SpinWheel options={suraList} />
              </Box>
            </Stack>
            <Button
              disabled={!suraList || suraList.length < 1}
              fullWidth
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
    </Container>
  );
}

export default App;
