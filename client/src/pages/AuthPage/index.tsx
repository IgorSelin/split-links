import "react-toastify/dist/ReactToastify.css";

import { ChangeEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/useHttp";
import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
  const { request, loading } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);

  const formFieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      toast(data.message);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      toast("Successfully logged!");
      login(data.token, data.userId);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Скороти лінк</h1>
      <div className={styles.form}>
        <span className={styles.title}>Авторизація</span>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={formFieldHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={formFieldHandler}
        />
        <div className={styles.actionButtons}>
          <button disabled={loading} onClick={loginHandler}>
            Login
          </button>
          <button onClick={registerHandler} disabled={loading}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
