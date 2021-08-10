import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import toast from "react-hot-toast";
import "./SignUp.scss";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  // create state variables for each input
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Name, email, password);

    if (!Name || !email || !password) {
      toast.error("all fields are necessary");
      // return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      toast.error("You have entered an invalid email address!");
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER}/user/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: Name, email: email, password: password }),
    })
      .then(async (resp) => {
        const data = await resp.json();
        if (!data.status) {
          return;
        }
        props.loginAction(data.data);
        console.log(data);
        data.status
          ? toast.success(data.message + "✌")
          : toast.error(data.message);
        // history.push('/signin');
      })
      .catch((err) => {
        toast.error("error connecting to the server!!!");
      });

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Grid
      container
      item
      sm={12}
      lg={12}
      xs={6}
      className={classes.root}
      id="top_grid"
    >
      <form className="top_div" onSubmit={handleSubmit}>
        <span id="header_text">Sign up</span>
        <TextField
          label="Name"
          variant="standard"
          placeholder="abc"
          // required
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="E-mail"
          placeholder="abc@gmail.com"
          variant="standard"
          // required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="123456789"
          variant="standard"
          type="password"
          // required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!Name || !email || !password}
          >
            Signup
          </Button>
        </div>

        <p className="signin_footer-text">
          Already a member?
          <span
            onClick={(e) => {
              props.changeForm("signin");
            }}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </form>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};
const mapDispetchToProps = (dispatch) => {
  return {
    loginAction: (data) => {
      dispatch({
        type: "LOGIN",
        uid: data._id,
        name: data.name,
        email: data.email,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispetchToProps)(SignUp);
