import {
  SpinWheel as SWGSpinWheel,
  ISpinWheelProps,
  ISegments,
} from 'spin-wheel-game';

export interface SpinWheelProps {
  options: ISegments[];
}

export function SpinWheel(props: SpinWheelProps) {
  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
    // Handle the result as needed
  };

  const spinWheelProps: ISpinWheelProps = {
    segments: props.options,
    onFinished: handleSpinFinish,
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 150,
    upDuration: 100,
    downDuration: 600,
    fontFamily: 'Arial',
    arrowLocation: 'top',
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return <SWGSpinWheel {...spinWheelProps} />;
}
