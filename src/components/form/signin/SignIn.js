import React, { useState } from "react";
import "../signup/SignUp.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import toast from "react-hot-toast";
import { Grid, makeStyles } from "@material-ui/core";
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

const SignIn = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("all fields are necessary");
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      toast.error("You have entered an invalid email address!");
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER}/user/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(async (resp) => {
        const data = await resp.json();
        if (!data.status) {
          return;
        }
        localStorage.setItem("downTime", JSON.stringify(data.data));
        props.loginAction(data.data);

        console.log(data);
        data.status
          ? toast.success(data.message + "✌")
          : toast.error(data.message);
      })
      .catch((err) => {
        toast.error("error connecting to the server!!!");
      });
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
        <span id="header_text">Login</span>
        <TextField
          label="E-mail"
          placeholder="abc@gmail.com"
          variant="standard"
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
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
        <p className="signin_footer-text">
          New here? &nbsp;
          <span
            onClick={() => {
              props.changeForm("signup");
            }}
            style={{ cursor: "pointer" }}
          >
            Signup
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

export default connect(mapStateToProps, mapDispetchToProps)(SignIn);
