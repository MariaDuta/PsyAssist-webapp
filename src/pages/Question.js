import { List, ListItem } from '@material-ui/core';
import React from 'react';

const responses = [
  {
    text: 'Not at all',
    value: '0',
  },
  {
    text: 'Several days',
    value: '1',
  },
  {
    text: 'More than half the days',
    value: '2',
  },
  {
    text: 'Nearly every day',
    value: '3',
  },
];

const Question = ({ handleResponse, questionText, highlightAnswer }) => {
  return (
    <>
      <p>{questionText}</p>
      <List>
        {responses.map((item) => {
          return (
            <ListItem
              key={item.value}
              onClick={() => handleResponse(questionText, item)}
              selected={highlightAnswer === item.value}
            >
              {item.text}
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Question;
