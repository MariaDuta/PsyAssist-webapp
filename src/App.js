import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {  Progress, Questionnaire } from './pages';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import GuardedRoute from './pages/GuardedRoute';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Nav} from './layout';
import { auth, responsesCollection } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { savesCollection } from "./firebase";
import DashboardProgress from './pages/DashboardProgress';

const isToday = (timestamp) => {
  const today = new Date();
  const someDate = new Date(timestamp);
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [isTodaysDate, setIsTodaysDate] = React.useState(false);
  const [value, collectionLoading, collectionError] = useCollection(
    responsesCollection,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (user&&value) {
      let today_flag = false;
      const resultItems = value.docs
        .filter((doc) => doc.data().user_id === user.uid)
        .map((doc) => {
          const { total, createdOn, user_id } = doc.data();
          if (isToday(createdOn.seconds * 1000)) today_flag = true;
          return { total, createdOn, user_id };
        });
      setData(resultItems);
      setIsTodaysDate(today_flag);
    }
  }, [value, user]);

  const [saved, setSaved] = React.useState([]);
  React.useEffect(() => {
    savesCollection
      .doc(user?.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setSaved(doc.data().data);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, [user]);

  if (loading) {
    return (
      <div>
        <p>Loading User...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  // return <button onClick={login}>Log in</button>;
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Nav userEmail={user?.email}/>
        <Switch>
          <GuardedRoute path="/Questionnaire" auth={user ? true : false}>
              <Questionnaire user={user} isToday={isTodaysDate} />
          </GuardedRoute>
          <GuardedRoute path="/Progress" auth={user ? true : false}>
            <Progress
              user={user}
              collectionValue={data}
              collectionError={collectionError}
              collectionLoading={collectionLoading}
              saved={saved}
            />
          </GuardedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
          <SignUp />
          </Route>
          <GuardedRoute path="/" auth={user ? true : false}>
            <DashboardProgress userId={user?.uid} saved={saved} setSaved={setSaved} />
          </GuardedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

//https://www.npmjs.com/package/react-firebase-hooks
