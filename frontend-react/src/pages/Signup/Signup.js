import React from "react";
import TextButton from "../../components/TextButton/TextButton";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import './style.css'

const Signup = () => {
  return (
    <div>
      <TextButton fontSize="50px">Adnat</TextButton>
      <h1>Sign up</h1>
      <Input title="Name" />
      <Input title="Email" />
      <Input title="Password" secondaryText="6 characters minimum" />
      <Input title="Password confirmation" />
      <Button>Sign up</Button>
      <TextButton>Login</TextButton>
    </div>
  );
};

export default Signup;
