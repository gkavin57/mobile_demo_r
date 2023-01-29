import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function Home() {
  return (
    <div>
      <h1> welcome to mobile app😍</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [formState, setFormState] = useState("success");
  const navigate = useNavigate();
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "kavin", password: "123" },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("http://localhost:4000/user/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("Error");
        setFormState("error");
      } else {
        const result = await data.json();
        console.log(result, "success");
        localStorage.setItem("token", result.token);
        navigate("/mobiles");
        // <Navigate replace to="/mobiles" />;
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <TextField
        label="username"
        variant="outlined"
        onChange={handleChange}
        value={values.username}
        name="username"
      />
      <TextField
        label="password"
        variant="outlined"
        onChange={handleChange}
        value={values.password}
        name="password"
      />
      <Button color={formState} type="submit" variant="contained">
        {formState === "error" ? "Retry" : "Submit"}
      </Button>
    </form>
  );
}
