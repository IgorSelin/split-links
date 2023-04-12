import { useState, KeyboardEvent, useContext } from "react";
import { toast } from "react-toastify";

import styles from "./CreateLinkPage.module.scss";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreateLinkPage = () => {
  const { request } = useHttp();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState("");
  const pressHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        navigate(`/details/${data.link._id}`);
        toast('Link has created!')
      } catch (e: any) {
        toast(e.message)
      }
    }
  };
  return (
    <div className={styles.container}>
      <h3>Please enter your link</h3>
      <input
        type="text"
        name="link"
        placeholder="Please, put some link"
        value={link}
        onChange={({ target }) => setLink(target.value)}
        onKeyDown={pressHandler}
        className={styles.linkInput}
      />
    </div>
  );
};
