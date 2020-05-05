/*
Right now, this home component funcitons as a top level directory for our other
two exterior react components. Eventually, it'll be more like a "landing page",
and be pretty content rich

2020-05-04: added basic comments (Gareth)
*/

import React from "react";
import '../../css/App.css';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component
{
  //Render function
  //Returns two links
  render ()
  {
    return (
      <div>
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/create-account">Create Account</Link>
      </div>
    );
  }
}

export default HomeComponent;
