import React from "react";

import Question from "./Question";
import { responsesCollection } from "../firebase";
import { useHistory } from "react-router-dom";
import { Container, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const questionArray = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  `Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?`,
  "Thoughts that you would be better off dead, or of hurting yourself in some way?",
];
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Questionnaire = ({ user, isToday }) => {
  const [answers, setAnswers] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  let history = useHistory();

  const handleClose = () => {
    setShow(false);
    history.push("/progress");
  };
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    let sum = 0;
    answers.forEach((item) => {
      sum = sum + parseInt(item.value);
    });
    setTotal(sum);
  }, [answers]);

  const handleResponse = (question, response) => {
    const items = answers.filter((item) => item.question !== question);

    setAnswers([...items, { question: question, value: response.value }]);
  };
  const hightlightAnswer = (question) => {
    const current = answers.find((item) => item.question === question);
    if (current) return current.value;
    return false;
  };

  const getImageSource = (total) => {
    if(total <5) {
      return 'https://media.giphy.com/media/LLMi8NdR0pfSGFMi4e/giphy.gif'
    } else if (total < 10) {
      return 'https://media.giphy.com/media/1xVc4s9oZrDhO9BOYt/giphy.gif'
    } else if (total < 15) {
      return 'https://media.giphy.com/media/Fs7LUZC7a6d5vnizzA/giphy.gif'
    } else if (total < 20) {
      return 'https://media.giphy.com/media/iey2hQU50YjbmO3e30/giphy.gif'
    } else if (total < 27) {
      return 'https://media.giphy.com/media/WTRXe6ZUr1n4YyOIix/giphy.gif'
    }
  };

  const displayResult = () => {
    console.log("The total is", total);
    handleShow();
  };

  return (
    <Container
      style={{
        marginTop: 30,
        display: "flex",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      <div className="content">
        {isToday ? (
          <Alert variant="outlined" severity="success">
            The questionnaire was already submited today. Please try again
            tomorrow.
          </Alert>
        ) : (
          <>
            <header className="App-header">
              <h1>Patient Health Questionnaire (PHQ-9)</h1>
              <h2>
                Over the last two weeks, how often have you been bothered by any
                of the following problems?
              </h2>
            </header>
            {questionArray.map((questionText) => (
              <Question
                key={questionText}
                highlightAnswer={hightlightAnswer(questionText)}
                questionText={questionText}
                handleResponse={handleResponse}
              />
            ))}
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={async () => {
                  displayResult();
                  await responsesCollection.add({
                    user_id: user.uid,
                    total: total,
                    createdOn: new Date(),
                  });
                }}
                disabled={answers.length !== 9 ? true : false}
              >
                Submit
              </Button>
            </div>
          </>
        )}

        <Modal open={show} onClose={handleClose}>
          <div
            className={`${classes.paper} modal`}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 500,
              maxHeight: 500,
              overflow: 'auto'
            }}
          >
            <h2>Results</h2>
            <p>The total is {total} / 27</p>
            <img style={{maxWidth: '100%'}} src={getImageSource(total)} alt="ex1" />
          </div>
        </Modal>
      </div>
    </Container>
  );
};

export default Questionnaire;
