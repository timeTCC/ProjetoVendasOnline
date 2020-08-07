import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';

import './styles.css';

const Loading = (props) => {

    return(
        <div id='loading'>
            <ReactLoading type='spin' color={props.color} height={props.size} width={props.size} />
        </div>
    )
}

export default Loading;