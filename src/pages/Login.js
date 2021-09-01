import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { Container, TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let history = useHistory();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container style={{
      marginTop: 30,
      display: "flex",
      minHeight: "80vh",
      flexDirection: "column",
      justifyContent: 'center'
    }}>
      <div className="content">
        <form onSubmit={submitForm} className="login-form">
          {error && (
            <div>
              <Alert severity="error">
                <p>Error: {error.message}</p>
              </Alert>
            </div>
          )}
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        <Button style={{marginTop: 18}} variant="outlined" color="primary" onClick={() => history.push('/sign-up')}>Sign up</Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
