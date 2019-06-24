import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";

import "./style.css";

const JoinCreateOrg = () => {
  return (
    <div>
      <div>
        <TextButton fontSize="40px">Adnat</TextButton>
        <p>Logged in as John Smith</p>
        <TextButton>Log Out</TextButton>
        <p>You aren't a member of any existing organisations.</p>
        <p>Join an existing one or create a new one.</p>
      </div>
      <div>
        <h1>Organisations</h1>
        <ul>
          <li>
            Bob's Burgers <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
          <li>
            Moe's Tavern <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
          <li>
            Sally's Sandwhiches <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
        </ul>
      </div>
      <div>
          <h1>Create Organisation</h1>
          <Input title="Name" />
          <Input title="Hourly Rate ($ per hour)" />
          <Button width="55px" height="25px">Update</Button>
          <TextButton>Delete</TextButton>
      </div>
    </div>
  );
};

export default JoinCreateOrg;
