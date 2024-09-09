import { useEffect, useState } from 'react';
import { Button, Card, Container, Stack, Typography } from '@mui/material';

import { suraList as localSuraList } from './data';

const API_URL =
  'https://script.google.com/macros/s/AKfycbye-vQ7rkXjBPc5I8yhQo9HQcwBnBDtIC9Wch6mortUj78RwINFQbdY2dJkQAiH9aoIkA/exec';

function generateSura(suraList: string[]) {
  if (suraList.length < 1) return 'No sura found';
  const randomIndex = Math.floor(Math.random() * suraList.length - 1);
  return suraList[randomIndex];
}

type Sura = {
  id: number;
  suraList: string;
};

export function App() {
  const [selectedSura, setSelectedSura] = useState<string | null>(null);
  const [suraList, setSuraList] = useState(localSuraList);

  const handleGenerateSuraClick = () => {
    const sura = generateSura(suraList);
    setSelectedSura(sura);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(([res]) => {
        const { data }: { data: Sura[] } = res;
        const suraList = data.map((sura) => sura.suraList);
        setSuraList(suraList);
      });
  }, []);

  return (
    <Container>
      <Card
        style={{
          backgroundColor: 'cornflowerblue',
          marginTop: '20vh',
        }}
      >
        <Stack gap={4} padding={4} alignItems={'center'}>
          <Stack gap={2} alignItems={'center'}>
            <Typography variant="h3">Sura Generator</Typography>
            {selectedSura ? (
              <Typography variant="body1">{selectedSura}</Typography>
            ) : (
              <Typography variant="body1">Click to generate sura</Typography>
            )}
          </Stack>
          <Button fullWidth onClick={handleGenerateSuraClick}>
            Generate
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

export default App;
