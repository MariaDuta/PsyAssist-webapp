/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { savesCollection } from "../firebase";
import { Button, Container } from "@material-ui/core";
const months = [
  {
    name: "Jan",
    days: "31",
  },
  {
    name: "Feb",
    days: "28",
  },
  {
    name: "Mar",
    days: "31",
  },
  {
    name: "Apr",
    days: "30",
  },
  {
    name: "May",
    days: "31",
  },
  {
    name: "Jun",
    days: "30",
  },
  {
    name: "Jul",
    days: "31",
  },
  {
    name: "Aug",
    days: "31",
  },
  {
    name: "Sep",
    days: "30",
  },
  {
    name: "Oct",
    days: "31",
  },
  {
    name: "Nov",
    days: "30",
  },
  {
    name: "Dec",
    days: "31",
  },
];

const DashboardProgress = ({ userId, saved, setSaved }) => {
  const [currentMood, setCurrentMood] = useState(null);

  const elementClick = (e, item, index) => {
    e.preventDefault();
    if (!currentMood) return null;
    const items = saved.filter((localItem) => {
      return localItem.key !== `${item.name}-${index}`;
    });
    setSaved([...items, { key: `${item.name}-${index}`, value: currentMood }]);
  };

  const selectMood = (val) => {
    console.log(val);
    setCurrentMood(val);
  };

  const getBackgroundColor = (key) => {
    const current = saved.find((item) => item.key === key);
    if (!current) return "white";
    if (current.value === 0) return "#fff";
    if (current.value === 1) return "#3498db";
    if (current.value === 2) return "#1abc9c";
    if (current.value === 3) return "#f1c40f";
    if (current.value === 4) return "#e67e22";
    if (current.value === 5) return "#e74c3c";
  };

  const saveProgress = () => {
    console.log("save");
    savesCollection.doc(userId).set({ data: saved });
  };

  return (
    <Container>
    <div className="content">
      <div className="container">
        <h2>
          Please follow the following instructions: 
          First select one of the mood emojis.
          Then select the present date. 
          Lastly, click on "Save Progress" button.
        </h2>
        <div className="column">
          <div id="moodGrid" className="grid">
            <div className="item">
              <span></span>
              <div className="days">
                {[...new Array(31)].map((item, index) => (
                  <span key={index} className="day">
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
            {months.map((item, index) => {
              return (
                <div className="item month" key={index}>
                  <span>{item.name}</span>
                  {[...new Array(+item.days)].map((x, y) => (
                    <a
                      style={{
                        backgroundColor: getBackgroundColor(
                          `${item.name}-${y}`
                        ),
                      }}
                      key={y}
                      href="#"
                      onClick={(e) => elementClick(e, item, y)}
                    ></a>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="column">
          <div className="interface">
            <div className="mood-form" style={{textAlign: 'center'}}>
              <h2>
                Hello there,
                <br />
                how are you feeling today?
              </h2>
              <form id="submitMood" action="">
                <div>
                  <input
                    onClick={() => selectMood(1)}
                    type="radio"
                    id="tough"
                    name="dayMood"
                    value="1"
                    className="mood-1"
                  />
                  <label htmlFor="tough"></label>
                </div>
                <div>
                  <input
                    onClick={() => selectMood(2)}
                    type="radio"
                    id="difficult"
                    name="dayMood"
                    value="2"
                    className="mood-2"
                  />
                  <label htmlFor="difficult"></label>
                </div>
                <div>
                  <input
                    onClick={() => selectMood(3)}
                    type="radio"
                    id="average"
                    name="dayMood"
                    value="3"
                    className="mood-3"
                  />
                  <label htmlFor="average"></label>
                </div>
                <div>
                  <input
                    onClick={() => selectMood(4)}
                    type="radio"
                    id="great"
                    name="dayMood"
                    value="4"
                    className="mood-4"
                  />
                  <label htmlFor="great"></label>
                </div>
                <div>
                  <input
                    onClick={() => selectMood(5)}
                    type="radio"
                    id="amazing"
                    name="dayMood"
                    value="5"
                    className="mood-5"
                  />
                  <label htmlFor="amazing"></label>
                </div>
              </form>
              <Button
                variant="contained"
                color="secondary"
                onClick={saveProgress}
                style={{marginTop: 20}}
              >
                Save Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default DashboardProgress;
