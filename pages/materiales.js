import React from "react";
import { useRouter } from "next/router";
import PageBanner from "../components/PageBanner";
import MaterialGit from "../components/MaterialGit/MaterialGit";

const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export default function Materials() {
  const router = useRouter();
  const title = 'Lo que necesitas es amor. Y contrachapado, que quema doradito.';

  return (
    <>
      <PageBanner title={title} />
      <MaterialGit />
    </>
  );
}
