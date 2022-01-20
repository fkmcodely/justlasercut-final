import axios from 'axios';
import React , { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { deleteItem , setMaterial, setGrosor } from '../../redux/reducers/cartSlice';
import { Button, Checkbox, Grid, Header, Icon, Input, Select, Image, Search } from "semantic-ui-react";

const ProjectCart = () => {
    //Obtener lista de proyectos subidos desde redux;
    const cart = useSelector(state => state.cart.items)

    return (
        <Grid columns={16} className='project-cart-view'>
            <Grid.Row>
                <Grid.Column width={16}>
                    {
                        !cart?.length && (
                            <div>
                                <p className='empty-message'>
                                    No tienes ningun proyecto pendiente. Crea uno aquí.
                                </p>
                            </div>
                        )   
                    }
                    {
                        cart.map(item => <ProjectItem item={item} />)
                    }
                    
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const ProjectItem = ({ item }) => {
    const [show,setShow] = useState(true);
    const [categories,setCategories] = useState([]);
    const [materiales,setMateriales] = useState([]);
    const [anchos,setAnchos] = useState([]);

    const dispatch = useDispatch();
    
    const [products,setProducts] = useState([]);
    const [searchMaterial,setSearchMaterial] = useState([]);
    const { file } = item;
    const [categorySelected,setCategorySelected] = useState(false);
    const [productSelected,setProductSelected] = useState(false);
    const [weightSelected,setWeightSelected] = useState(false);

    const getDetectedCapas = () => {
        let auxCapas = [] 
        file?.planchas?.forEach((plancha,aux) => {
            plancha.capas.forEach((capa) => {
                auxCapas.push(capa.type)
            });
        })
        let result = auxCapas.filter((item,index) => {
            return auxCapas.indexOf(item) === index
        })
        return result
    }   
    
    const getMateriales = async () => {
        try {
            const { data : { result }} = await axios(`/api/materials`);
            const categoryList = result.map(material => ({
                key: material.id,
                value: material.id,
                text: material.title.es,
                ...material
            }))
            setMateriales(categoryList);
            setProducts(categoryList);
        } catch (err) {
            console.error('Error al obtener materiales')
        }
    };
    
    const getCategories = async () => {
        try {
            const { data: { steps } } = await axios(`/api/material-category`);
            const materialList = steps.map((category) => ({
                key: category.id,
                value: category.id,
                text: category.category.name.es
            }))
            setCategories(materialList);
        } catch (err) {
            console.error('Error al obtener categirr')
        }
    };

    useEffect(() => {
        if (categorySelected !== false) {
            const filtered = materiales.filter(material => {
                return material.materialCategory === categorySelected
            });
            if (filtered.length) {
                setMateriales(filtered);
            } else {
                getMateriales();
            }
        } else {
            getCategories();
        }
    },[categorySelected]);

    useEffect(async () => {
        try {
            const { data : { result }} = await axios(`/api/materials`);
            const productSelect = result?.filter(material => material.id === productSelected)
            if (productSelect) {
                const product = productSelect[0];
                const { weightList } = product;
                const weights = weightList.map((ancho) => ({
                    key: ancho.id,
                    value: ancho.weight,
                    text: ancho.weight + ' mm'
                }));
                dispatch(setMaterial({
                    itemId: item.idProjectItem,
                    material: product.id
                }))
                setAnchos(weights);
            };
        } catch (err) {
            console.error('Error al obtener materiales')
        }
    },[productSelected]);
    
    useEffect(() => {
        dispatch(setGrosor({
            itemId: item.idProjectItem,
            weight: weightSelected
        }))
    },[weightSelected])
    
    const resRender = ({ text }) => (text);

    const deleteItemFromCart = () => {
        dispatch(deleteItem(item.idProjectItem))
    };
    
    useEffect(() => {
        getCategories();
        getMateriales();
    },[]);
    
    return(
        <Grid columns={16} className='project-view'>
            <Grid.Row>
                <Grid.Column width={4}>
                    <div className='project-view__svg'>
                        {
                            file && (
                                <Image fluid src={file.previsualization} />
                            )
                        }
                    </div>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Grid columns={16}>
                        <Grid.Row>
                            <Grid.Column computer={8}>
                                <Header as='h3'>{item.file.originalName}</Header>
                            </Grid.Column>
                            <Grid.Column computer={8} verticalAlign='middle' textAlign='right' className='flex-end'>
                                <span><b>Copias:</b> {item?.copias}</span>
                                <div>
                                    <Icon className='trash alternate outline delete-icon' onClick={deleteItemFromCart} />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                        {
                            !show && (
                                <Grid.Row>
                                    <Grid.Column computer={8}>
                                        <p><b>Material:</b> "Seleccionar material"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p><b>Extras seleccionados:</b></p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p><b>Cantidad de planchas: </b><span>{file.planchas.length}</span></p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p><b>Errores en archivo:</b> "Lista"</p>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <p><b>Calidad de grabado relleno:</b> 0.1/1.5/0.2</p>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                        {
                            show && (
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        <h5 className='title-dashed'>Errores detectados: </h5>
                                        <section style={{ display: 'flex'}}>
                                            <div style={{ width: '48%'}}>
                                                <p>Sombreados</p>
                                                <p>Bloques</p>
                                                <p>Puntos</p>
                                            </div>
                                            <div style={{ width: '48%'}}>
                                                <p>Texto</p>
                                                <p>Grabado relleno cerrado</p>
                                                <p>Objetos fuera de capas</p>
                                            </div>
                                        </section>
                                    </Grid.Column>
                                    <Grid.Column width={2} className='mini-drop'>
                                        <p>Sube tu archivo</p>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                        }
                    </Grid>          
                </Grid.Column>
                <Grid.Column verticalAlign='center' computer={1} className='boton-plus-local'>
                    <div>
                        <Icon onClick={() => setShow(!show)} size="large" className="boton-plus" name='plus' />
                        <p className='price-span tx-gray'>Precio:</p>
                    </div>
                </Grid.Column>
            </Grid.Row>
            {
                show && (
                    <>
                    <Grid.Row className='even-pad'>
                        <Grid.Column width={16}>
                            <Header >Datos de archivo</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4}>
                            <h5 className='title-dashed'>Número y Tamaño de planchas</h5>
                            <div>
                                <ul>
                                    {
                                        file?.planchas?.map((plancha,index) => (
                                            <li>{`- Plancha (${index}) - ${plancha.board.width}X${plancha.board.height}mm`}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <h5 className='title-dashed'>Capas detectadas</h5>
                            <div>
                                <ul>
                                    {
                                        getDetectedCapas().map((capa) => (<li>{`- ${capa}`}</li>))
                                    }
                                    {/* <li> Corte exterior </li>
                                    <li> Corte interior </li>
                                    <li> Grabado de superficie </li>
                                    <li> Comentarios </li> */}
                                </ul>
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={12}>
                            <h5 className='title-dashed'>Selección de material</h5>
                            <div className='select-material-options'>
                                <Select 
                                    className='select-material-options__type' 
                                    options={categories} 
                                    onChange={(e,{ value }) => {
                                        setCategorySelected(value);
                                    }} />
                                <Select 
                                    className='select-material-options__material' 
                                    options={materiales} 
                                    onChange={(e,{ value }) => {
                                        setProductSelected(value);
                                    }}
                                />
                                <Select 
                                    className='select-material-options__weight' 
                                    options={anchos} 
                                    onChange={(e,{ value }) => {
                                        setWeightSelected(value);
                                    }}
                                />
                            </div>
                            <div className='search-material-section'>
                            <Search
                                fluid
                                icon="search"
                                placeholder="Buscar material..."
                                results={products}
                                resultRenderer={resRender}
                            />
                                <div>
                                    <p>Llevo mi propio material(contacta con justlasercut antes) <Checkbox /></p>
                                </div>
                            </div>
                            <h5 className='title-dashed'>Extras:</h5>
                            <div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                    
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                                <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p>
                                        - Lamina antiguemaduras por una cara 
                                    </p>
                                    <div className='flex'>
                                        <p>3$/plancha</p>
                                        <Checkbox />
                                    </div>
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    </>
                )
            }
        </Grid>
    )
};

export default ProjectCart;