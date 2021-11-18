import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropDownJust from "../components/DropDownJust";
import { getServices } from "../services/services";
import axios from "axios";
import { BASE_URL } from "../constants/config";
const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export async function getServerSideProps(context) {
  const res = await axios(`${BASE_URL}api/services`, {
    params: {
      language: 'all'
    }
  })
  if (!res) {
    return {
      notFound: true,
    }
  }
  return {
    props: { servicesData: res.data }, // will be passed to the page component as props
  }
}

export default function Servicios({ servicesData = [] }) {
  const title = 'Servicios';
  const router = useRouter();
  const { locale } = router;
  console.log(servicesData)
  return (
    <>
      <DropDownJust
        title={title}
        list={
          servicesData.services.filter(({ language }) => language === locale)
        } />
    </>
  );
}
