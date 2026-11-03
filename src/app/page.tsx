import { Entrance } from '@/components/sections/Entrance';
import { Advantage } from '@/components/sections/Advantage';
import { Founders } from '@/components/sections/Founders';
import { Buyers } from '@/components/sections/Buyers';
import { Opportunities } from '@/components/sections/Opportunities';
import { Trust } from '@/components/sections/Trust';
import { Introduction } from '@/components/sections/Introduction';
import { IntroGate } from '@/components/intro/IntroGate';

export default function HomePage() {
  return (
    <>
      <Entrance />
      <Advantage />
      <Founders />
      <Buyers />
      <Opportunities />
      <Trust />
      <Introduction />
      <IntroGate />
    </>
  );
}
