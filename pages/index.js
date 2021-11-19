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
import ButtonTop from "../components/ButtonTop/ButtonTop";

const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

function Home(props) {
  const { banner, steps = [], reviews = [], services = [] } = props;
  console.log(banner)
  const [user, setUser] = useState();
  const { locale } = useRouter();
  const t = languages[locale];

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
      <Banner info={banner} />
      <Steps t={t} steps={steps.filter(step => step.language === locale)} />
      <Services t={t} list={services.filter(step => step.language === locale)} />
      <Reviews t={t} list={reviews.filter(review => review.language === locale)} />
      <ContactForm t={t} />
      <ButtonTop />
    </>
  );
}

export async function getServerSideProps() {
  let reviews = [];
  let steps = [];
  let bannerSend = {};
  const data = await axios(`${BASE_URL}/api/steps`);
  const listReviews = await axios(`${BASE_URL}/api/reviews`);
  const listServices = await axios(`${BASE_URL}/api/resources`);
  const banner = await axios(`${BASE_URL}/api/banner`);

  const { data: { list } } = listReviews;
  reviews = list;
  steps = data.data.steps
  bannerSend = banner.data.response;
  return {
    props: {
      reviews: list,
      steps: data.data.steps,
      services: listServices.data.resources,
      banner: bannerSend
    }
  }
}


export default Home

