import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import toast from "react-hot-toast";
import "./homepage.scss";
import Details from "./details/Details";

const Homepage = () => {
  const [url, setURL] = useState("");
  const [details, setDetails] = useState("");
  const searchHandle = (e) => {
    e.preventDefault();
    if (!url) return;
    const regex =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
    let value = url.trim().toLowerCase();
    if (!regex.test(value)) {
      toast.error("Invalid Domain name");
      return;
    }
    if (!(value.includes("https://") || value.includes("http://"))) {
      value = "https://" + value;
    }
    setURL(value);

    fetch(`${process.env.REACT_APP_SERVER}/req/check`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: url }),
    })
      .then(async (resp) => {
        const data = await resp.json();
        if (!data.status) {
          return;
        }
        console.log(data);
        setDetails(
          <Details
            name={url}
            down={data.down}
            message={data.message}
            url={data.data.url}
            responseTime={`${data.data.responseTime / 1000} sec`}
            statusCode={data.data.statusCode}
          />
        );
        data.status
          ? toast.success(data.message + "✌")
          : toast.error(data.message);
      })
      .catch((err) => {
        toast.error("error connecting to the server!!!");
      });
  };
  return (
    <div className="outer_div">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          height: "50vh",
          alignContent: "flex-end",
        }}
        className="upper_box"
      >
        {/* top grid */}
        <Grid item xs={12} lg={12} sm={12}>
          <div className="hero_label">
            <div className="wrapper">
              <div className="typing-demo">
                <h3>
                  check <span style={{ color: "#0099ff" }}>STATUS</span> of your
                  website
                </h3>
              </div>
              and set a reminder for future regular updates.
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={12} sm={12} style={{ marginTop: "1rem" }}>
          <div className="container">
            <div className="container__item" style={{ width: "55%" }}>
              <form className="form" onSubmit={searchHandle}>
                <input
                  type="text"
                  className="form__field"
                  placeholder="Enter url"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn--primary btn--inside uppercase"
                  onClick={searchHandle}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* top grid close */}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container item xs={12} lg={12} sm={12}>
          {details}
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
