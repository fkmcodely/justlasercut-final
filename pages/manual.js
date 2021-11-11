import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getManualSteps } from "../services/manual";
import DropDownJust from "../components/DropDownJust";
import axios from "axios";

const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export default function Manual() {
  const router = useRouter();
  const title = 'Manual de usuario';
  const [manual,setManual] = useState([]);

  useEffect(() => {
    getManualSteps().then((result) => {
      setManual(result);
    });
  },[]);

  return (
    <>
      <DropDownJust list={manual} title={title} folder={'manual'}/>
    </>
  );
}
