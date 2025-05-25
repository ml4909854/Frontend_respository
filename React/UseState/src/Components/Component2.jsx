import React, { useContext } from 'react';
import userContext from '../context/context';

const Component2 = () => {
    const user = useContext(userContext);
    console.log(user); // This will log "mahesh"
    return (
        <div>Component2 - User: {user}</div>
    );
};

export default Component2;