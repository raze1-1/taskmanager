import { useState } from "react";
import { signupFields } from "./constants";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcrypt";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Sign() {
  const [signUpState, setsignUpState] = useState(fieldsState);

  const handleChange = (e) => {
    setsignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUpState);
    createUser();
  };

  const createUser = () => {
    const userData = {
      username: signUpState.username,
      emailaddress: signUpState.emailaddress,
      password: bcrypt.hash(signUpState.password, 10).toString(),
    };
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Registration successful");
          navigate("/login");
        } else {
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="flex justify-center">
      <form className="space-y-3 py-4" onSubmit={handleSubmit}>
        <div className="-space-y-5px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signUpState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormAction handleSubmit={handleSubmit} text="Sign up" />
      </form>
    </div>
  );
}
