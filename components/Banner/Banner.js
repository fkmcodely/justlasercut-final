import React, { useState, useRef, useEffect } from 'react';
import { Container, Grid, Image } from "semantic-ui-react";
import { BASE_URL } from '../../constants/config';
import axios from "axios";
import { useDispatch } from 'react-redux';
import router, { useRouter } from 'next/router';
import parse from "html-react-parser";
import { addItem } from '../../redux/reducers/cartSlice';
const { v4: uuidv4 } = require('uuid');

const languages = {
    'es': require('../../locale/es/commons.json'),
    'en': require('../../locale/en/commons.json'),
};

const Banner = ({ info }) => {
    const [files, setFiles] = useState({});
    const fileInputField = useRef(null)
    const dispatch = useDispatch();
    const { locale } = useRouter();
    const [bannerInfo, setBannerInfo] = useState();
    const t = languages[locale];
    useEffect(() => {
        info.forEach((banner) => {
            if (banner.language === locale) {
                setBannerInfo(banner);
            }
        })
    }, [info, locale]);

    const createBodyItemProject = () => {
        return (
            {
                idProjectItem: uuidv4(),
                name: '',
                file: null,
                material: null,
                extras: [],
                previsualizacion: '',
                weight: '',
                materialClient: false,
                copias: 1,
            }
        )
    }
    
    const updateItemProject = (ev) => {
        setFiles([0]);
        const startProject = async () => {
            try {
                if (files) {
                    const data = new FormData();
                    data.append('file', ev.target.files[0]);
                    const uploadMedia = await axios.post(`/api/dfx`, data, {
                        params: {
                            id: uuidv4(),
                        }
                    });
                    const fileName = uploadMedia.data.message;
                    const res = await axios.post('/api/project', {
                        fileName: fileName
                    });
                    let defaultProjectStructure = createBodyItemProject();
                    defaultProjectStructure.file = res.data;
                    dispatch(addItem(defaultProjectStructure));
                    router.push('/proyectos');
                }
            } catch (error) {
                console.error(`Error al subir fichero al servidor`, error);
            }


        };
        startProject();

    }

    return (
        <Container fluid={true} className="banner">
            <Container className="banner__container">
                <Grid columns="16" className="banner__grid">
                    <Grid.Column computer="8" tablet={8} mobile={16} className="banner__manual">
                        {bannerInfo?.title && (parse(bannerInfo?.title))}
                    </Grid.Column>
                    <Grid.Column computer="8" tablet={8} mobile={16} className="banner__start-shop">
                        <div className="upload-box">
                            <div className="inputfile-box">
                                <input onChange={(ev) => { updateItemProject(ev) }} type="file" id="file" ref={fileInputField} />
                                <label htmlFor="file">
                                    <span id="file-name" className="file-box"></span>
                                    <span className="file-button">
                                        <i className="fa fa-upload" aria-hidden="true"></i>
                                        <p>{t.subirdxf}</p>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        </Container>
    );
};

export default Banner;