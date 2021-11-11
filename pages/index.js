import React, { useEffect , useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, singOut, getSession, signOut } from "next-auth/react";
import Banner from "../components/Banner";
import Steps from "../components/Steps/Steps";
import Services from "../components/Services";
import Reviews from "../components/Reviews/Reviews";
import ContactForm from "../components/ContactForm/ContactForm";

const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export default function Home({ message }) {
  const router = useRouter();
  const [user,setUser] = useState();
  const { locale } = router;
  const { session , loading } = useSession();
  const localCopy = languages[locale];

  useEffect(() => {
    const session = async (req,res) => {
      const user = await getSession({ req });
      if(user?.user) {
        setUser(user.user);
      } else {
        setUser(false);
      }
    }
    session();
  },[])

  return (
    <>
      <Banner />
      <Steps />
      <Services />
      <Reviews />
      <ContactForm />
    </>
  );
}


