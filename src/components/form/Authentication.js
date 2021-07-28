import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import SignUp from "../form/signup/SignUp";
import SignIn from "../form/signin/SignIn";
import './signup/SignUp.scss';

function Authentication() {
    const changeForm = (form) => {
        switch (form) {
            case "signin":
        setForm(<SignIn changeForm={changeForm} />);
        break;
      case "signup":
          setForm(<SignUp changeForm={changeForm} />);
        break;
      default:
        //   setForm(<SignUp changeForm={changeForm} />);
          setForm(<SignIn changeForm={changeForm} />);
          break;
    }
  };
  const [form, setForm] = useState(<SignIn changeForm={changeForm} />);

  return (
    <Grid
    container
      justifyContent="center"
      alignItems="center"
      className="auth"
    >
      <Grid item xs={6} sm={12} md={12} lg={12} style={{ textAlign: "center" }}>
        {form}
      </Grid>
    </Grid>
  );
}

export default Authentication;
