import { Grid, Button } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "./Dashboard.scss";
import Panel from "./Panel/Panel";
const Dashboard = (props) => {
  let history = useHistory();
  function handleClick() {
    props.logoutAction();
    history.push("/");
    window.location.href = "/";
  }
  return (
    <div className="dashboard_main">
      <Grid
        container
        direction="column"
        justifyContent="center"
        wrap="nowrap"
        style={{ height: "90%", padding: "1.3rem" }}
      >
        <Grid item xs={12} lg={12} sm={12} style={{ marginTop: "1rem" }}>
          <Panel />
        </Grid>
        <Grid item xs={12} lg={12} sm={12}>
          <form>
            <input
              type="text"
              name="name"
              className="question"
              id="nme"
              required
              autoComplete="off"
            />
            <label htmlFor="nme">
              <span>Save your Websites!</span>
            </label>
            <Button
              className="save_button"
              style={{ color: "white", padding: "0.6rem" }}
            >
              Add!
            </Button>
          </form>
        </Grid>
      </Grid>
      <>
        <button type="button" className="logout_btn " onClick={handleClick}>
          logout
        </button>
      </>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  };
};
const mapDispetchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      dispatch({
        type: "LOGOUT",
      });
    },
  };
};
export default connect(mapStateToProps, mapDispetchToProps)(Dashboard);
