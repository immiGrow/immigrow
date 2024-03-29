import Head from "next/head";
import Image from "next/image";
import { useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import baseUrl from "../mongodb/baseUrl";
import styles from "../styles/Home.module.css";
import camera from "../images/camera.png";
import { useRouter } from "next/router";
import Link from "next/link";
import Context from "../context/UserApi/Context";
import Footer from "../Components/Footer";

export default function Home({ data }) {

  const holder = useContext(Context);
  const router = useRouter();
  const [term, setTerm] = useState("");
  const searchUserQuery = async (e) => {
    e.preventDefault();
    const fetchReq = await fetch(`${baseUrl}/api/searchimage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchterm: term.toLowerCase(),
      }),
    });
    const response = await fetchReq.json();
    
  };
 

  return (
    <>
      <Head>
        <title>ImmiGrow - The Bunch of Photos </title>
        <meta name="description" content="ImmiGrow is the free site for uders and visitors to come and download and publish unlimited photos and use them in their website or application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={styles.searchbox}>
        <form
          onSubmit={(e) => {
            searchUserQuery(e);
          }}
        >
          <input
        
            className={styles.input}
            type="text"
            placeholder="Sorry Not For Real Searching Because of less images in this web"
            value={term}
            name="search"
            id="search"
            onChange={(e) => setTerm(e.target.value)}
            onSubmit={searchUserQuery}
          />
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.constant}>
        <div className={styles.const}>
          <div className={styles.div1}>
            <h1 className={styles.head}>
              ImmiGrow - The Lake of 
               <span className={styles.tag}> Memories</span>
            </h1>
            <p className={styles.para}>
              <span className={styles.tag}>ImmiGrow </span>- Where many shares a
              part of their memorial <span className={styles.tag}>Day</span>
            </p>
            <Link href="/about">
              <a >
                
                <span style={{ color: "rgb(18, 216, 18)", fontWeight: "bold" }}>
                  ImmiGrow
                </span>
              </a>
            </Link>
          </div>

          <div className={styles.div2}>
            <Image
              className={styles.image}
              objectFit="cover"
              height={500}
              width={600}
              src={camera}
              alt="Oberon"
            />
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {data.map((elm) => {
          return (
            <>
              <img
                key={elm._id}
                className={styles.renderimg}
                src={elm.imageUrl}
                alt="Data"
              />

            
              <button>
                <Link key={elm.imageUrl} href={"/photo/[id]"} as={`/photo/${elm._id}`}>
                  <a className={styles.download}>Download</a>
                </Link>
              </button>
            </>
          );
        })}
      </div>
      <Footer/>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/uploadphoto`);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}
