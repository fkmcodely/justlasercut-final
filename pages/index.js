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

function Home(props) {
  const { steps = [], reviews = [] } = props;

  const router = useRouter();
  const [user, setUser] = useState();
  const { locale } = router;
  const { session, loading } = useSession();
  const localCopy = languages[locale];

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
      {/* Como mejor el background y el texto del banner pueden ser personalizables desde el backoffice */}
      <Banner />
      <Steps steps={steps} />
      <Services />
      <Reviews list={reviews} />
      <ContactForm />
    </>
  );
}

export async function getServerSideProps() {
  let reviews = [];
  let steps = [];
  const data = await axios(`${BASE_URL}/api/steps`);
  const listReviews = await axios(`${BASE_URL}/api/reviews`);
  const { data: { list } } = listReviews;
  reviews = list;
  steps = data.data.steps
  return {
    props: {
      reviews: list,
      steps: data.data.steps
    }
  }
}


export default Home

