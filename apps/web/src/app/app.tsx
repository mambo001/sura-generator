import { useEffect, useMemo, useState } from 'react';
import {
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

  const handleGenerateSuraClick = () => {
    // const sura = generateSura(suraList);
    // setSelectedSura(sura);
  };

  useEffect(() => {
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
  }, [suraList]);

  return (
    <Container>
      <Card
        style={{
          marginTop: '15vh',
        }}
      >
        <Stack gap={2} padding={2} alignItems={'center'}>
          <Stack gap={2} padding={2} alignItems={'center'}>
            {suraList ? (
              <SpinWheel options={suraList} />
            ) : (
              <Skeleton variant="circular" width={'100%'} height={600} />
            )}
          </Stack>
          <Button fullWidth onClick={handleGenerateSuraClick}>
            Spin the wheel
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default App;
