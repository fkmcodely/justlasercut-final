import React, { useEffect , useState } from "react";
import { useRouter } from "next/router";
import DropDownJust from "../components/DropDownJust";
import { getServices } from "../services/services";

const languages = {
  en: require('../locale/en/commons.json'),
  es: require('../locale/es/commons.json'),
}

export default function Servicios() {
  const title = 'Servicios';
  const router = useRouter();
  const { locale } = router;
  const [services,setServices] = useState();

  useEffect(() => {
    getServices().then(result => {
      setServices(result)
    });
  },[]);
  
  return (
    <>
      <DropDownJust title={title} list={services}/>
    </>
  );
}
