import { useState, useCallback, useContext, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./LinksDetailsPage.module.scss";
import { Link } from "../../types/genaral";

export const LinksDetailsPage = () => {
  const [link, setLink] = useState<Link | null>(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const { request } = useHttp();
  const getLink = useCallback(async () => {
    return request(`/api/link/${id}`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
  }, [token, id]);

  useEffect(() => {
    getLink().then((res: any) => setLink(res));
  }, [id, token]);
  return (
    <div className={styles.container}>
      <h1>Details page</h1>
      <div className={styles.linkDescription}>
        <div>
          <span>Your link:</span>
          <a href={link?.to}>{link?.to}</a>
        </div>
        <div>
          <span>From:</span>
          <a href={link?.from}>{link?.from}</a>
        </div>
        <div>
          <span>Clicks count:</span>
          {link?.clicks}
        </div>
        <div>
          <span>Created at:</span>
          {link?.date && new Date(link.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
