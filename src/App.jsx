import { useState } from 'react';
import { BG, BD, TX, mono } from './theme.js';
import { Sidebar }  from './components/Sidebar.jsx';
import { Overview } from './sections/Overview.jsx';
import { QuickStart } from './sections/QuickStart.jsx';
import { Syntax }   from './sections/Syntax.jsx';
import { Types }    from './sections/Types.jsx';
import { Paths }    from './sections/Paths.jsx';
import { Cubical }  from './sections/Cubical.jsx';
import { Equiv }    from './sections/Equiv.jsx';
import { Examples } from './sections/Examples.jsx';

const SECTIONS = {
  overview:   <Overview />,
  quickstart: <QuickStart />,
  syntax:     <Syntax />,
  types:      <Types />,
  paths:      <Paths />,
  cubical:    <Cubical />,
  equiv:      <Equiv />,
  examples:   <Examples />,
};

export default function App() {
  const [active, setActive] = useState('overview');

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: BG, color: TX, fontFamily: mono, fontSize: 14,
    }}>
      <Sidebar active={active} onSelect={setActive} />

      <main style={{
        flex: 1, padding: '40px 52px', maxWidth: 820,
        overflowY: 'auto', minHeight: '100vh',
      }}>
        {SECTIONS[active]}
      </main>
    </div>
  );
}