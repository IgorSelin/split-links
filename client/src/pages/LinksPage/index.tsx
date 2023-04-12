import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { AuthContext } from "../../context/AuthContext";
import { Link as LinkType } from "../../types/genaral";
import styles from "./LinksPage.module.scss";
import { Link } from "react-router-dom";

export const LinksPage = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <div className={styles.container}>
      <h1>Links Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {links.length ? (
            <div className={styles.table}>
              <div className={styles.header}>
                <div className={styles.order}>#</div>
                <div className={styles.from}>From</div>
                <div className={styles.to}>To</div>
                <div className={styles.open}>Open</div>
              </div>
              <div className={styles.body}>
                {links.map((e, i) => (
                  <div className={styles.row} key={i}>
                    <div className={styles.order}>{i + 1}</div>
                    <div className={styles.from}>{e.from}</div>
                    <div className={styles.to}>{e.to}</div>
                    <div className={styles.open}>
                      <Link to={`/details/${e._id}`}>Open</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>There are no links</p>
          )}
        </div>
      )}
    </div>
  );
};
