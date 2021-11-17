import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, singOut, getSession, signOut } from "next-auth/react";
import Banner from "../components/Banner";
import Steps from "../components/Steps/Steps";
import Services from "../components/Services";
import Reviews from "../components/Reviews/Reviews";
import ContactForm from "../components/ContactForm/ContactForm";
import axios from "axios";
import { BASE_URL } from "../constants/config";
const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  const { locale } = router;
  const { session, loading } = useSession();
  const localCopy = languages[locale];

  const [reviews, setReviews] = useState();

  useEffect(async () => {
    try {
      const listReviews = await axios('/api/reviews');
      const { data: { list } } = listReviews;

      setReviews(list);
    } catch (error) {
      console.error('No se pudieron obtener los datos:', error);
    }
  }, []);

  useEffect(() => {
    const session = async (req, res) => {
      const user = await getSession({ req });
      if (user?.user) {
        setUser(user.user);
      } else {
        setUser(false);
      }
    }
    session();
  }, [])

  return (
    <>
      <Banner />
      <Steps />
      <Services />
      <Reviews list={reviews} />
      <ContactForm />
    </>
  );
}

