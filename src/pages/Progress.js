import React from "react";
import { Calendar } from "react-multi-date-picker";
import { Card, List, ListItemText } from "@material-ui/core";
import { Container, CardContent, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReactApexChart from "react-apexcharts";
const Progress = ({
  user,
  collectionValue,
  collectionError,
  collectionLoading,
  saved,
}) => {
  const [values, setValues] = React.useState([]);
  const [options, setOptions] = React.useState({
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: [],
    },
  });
  const [series, setSeries] = React.useState([]);

  React.useEffect(() => {
    const dates = collectionValue.map(
      (item) => new Date(item.createdOn.seconds * 1000)
    );
    setValues(dates);
  }, [collectionValue]);

  React.useEffect(() => {
    if (saved.length > 0) {
      let dates = [];
      let chartValues = [];
      let savedCopy = [...saved];
      savedCopy.sort(function (a, b) {
        let [month_a, day_a] = a.key.split("-");
        day_a = parseInt(day_a) + 1;
        const date_a = new Date(`2021-${month_a}-${day_a}`);
        let [month_b, day_b] = b.key.split("-");
        day_b = parseInt(day_b) + 1;
        const date_b = new Date(`2021-${month_b}-${day_b}`);
        return new Date(date_a) - new Date(date_b);
      });
      savedCopy.forEach((item) => {
        let [month, day] = item.key.split("-");
        day = parseInt(day) + 1;
        const date = `${month}-${day}`;
        dates.push(date);
        chartValues.push(item.value);
      });

      setOptions({
        ...options,
        xaxis: {
          categories: dates,
        },
      });
      console.log(chartValues);
      setSeries([{ name: "Mood rating", data: chartValues }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  return (
    <Container
      style={{
        marginTop: 30,
        display: "flex",
        minHeight: "80vh",
        flexDirection: "column",
        paddingBottom: 30
      }}
    >
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Mood graph:</Typography>
          </Grid>
          <Grid item xs={10}>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </Grid>
          <Grid item xs={2}>
            <List>
              <ListItemText>1 - tough</ListItemText>
            </List>
            <List>
              <ListItemText>2 - difficult</ListItemText>
            </List>
            <List>
              <ListItemText>3 - average</ListItemText>
            </List>
            <List>
              <ListItemText>4 - great</ListItemText>
            </List>
            <List>
              <ListItemText>5 - amazing</ListItemText>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Questionnaire results:</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Calendar multiple value={values} readOnly />
          </Grid>
          <Grid item xs={12} md={8}>
            {collectionValue && (
              <Grid container spacing={3}>
                {collectionValue.map((item, index) => {
                  return (
                    <Grid item xs={12} md={3} key={index}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            Total: {item.total}/27
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {new Date(
                              item.createdOn.seconds * 1000
                            ).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Grid>

        {collectionError && (
          <strong>Error: {JSON.stringify(collectionError)}</strong>
        )}
        {collectionLoading && <span>Collection: Loading...</span>}
      </div>
    </Container>
  );
};

export default Progress;
