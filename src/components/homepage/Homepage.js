import React from "react";
import { Grid } from "@material-ui/core";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
       <nav>
          <li><NavLink to='/' exact
            activeStyle={{
                color:"blue"
            }}
          
          >HomePage</NavLink>  </li>
          <li><NavLink to='/signup'> SignUP</NavLink>  </li>
          <li><NavLink to='/about'> About</NavLink>  </li>
        </nav>
    </div>
  );
};

const Homepage = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={12} sm={12}>
        <label>
          check STATUS of your website and set a reminder for future regular
          updates.
        </label>
      </Grid>
      <Grid item xs={8} lg={8} sm={8}></Grid>
    </Grid>
  );
};


const Aboutpage = () => {
	return (
		<div>
				{/* <Header/> */}
				<h1>Aboutpage</h1>
		</div>
	)
}
export  {Homepage,Aboutpage,Header};
