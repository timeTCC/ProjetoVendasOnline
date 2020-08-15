import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';

import './styles.css';

export const Loading = (props) => {
    if(props.isLoading){
        return(
            <div id='loading' className={props.id}>
                <ReactLoading type='spin' color={props.color} height={props.size} width={props.size} />
            </div>
        )
    } else {
        return '';
    }

    
}

export default Loading;