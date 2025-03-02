import './styles/app.scss';
import { themes } from '@chrisofnormandy/confetti/themes';
import { useEffect, useState } from 'react';
import { Editors } from './components/Editors';

export default function App() {

    const [ready, isReady] = useState(false);

    useEffect(() => {
        themes.init();

        isReady(true);
    }, []);

    return <div
        className='app f-main'
    >
        {ready && <Editors />}
    </div>;
}