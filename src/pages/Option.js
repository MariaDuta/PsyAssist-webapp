import React from 'react';


import { Button } from 'react-bootstrap';

const Option = props => {
        return (
            <div>
                <Button onClick={props.setScore(props.score + optionScore)}>{optionText}</Button>
            </div>
        )
    }

export default Option;
