import React, {useEffect} from 'react';

import CircularProgress from '@mui/material/CircularProgress';

export default function CircularStatic() {
    const [completed, setCompleted] = React.useState(0);

    useEffect(() => {
        function progress() {
            setCompleted(prevCompleted => (prevCompleted >= 100 ? 0 : prevCompleted + 10));
        }

        const timer = setInterval(progress, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <CircularProgress variant="determinate" value={completed}/>
        </div>
    );
}
