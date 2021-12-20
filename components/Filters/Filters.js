import React, { useEffect, useState } from 'react';
import { Grid, Header, Input } from 'semantic-ui-react';
import { getCategoryMaterials, getSubCategoryMaterials } from "../../services/material";

const Filters = ({ list, setList }) => {
    const [auxListMaterials, setAuxMaterialList] = useState(list);

    useEffect(() => {
        setList(auxListMaterials);
    }, []);

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <MaterialCategory />
                </Grid.Column>
                <Grid.Column width="16">
                    <PlateSize />
                </Grid.Column>
                <Grid.Column width="16">
                    <PlateWeight />
                </Grid.Column>
                <Grid.Column width="16">
                    <Finishing />
                </Grid.Column>
                <Grid.Column width="16">

                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

const MaterialCategory = ({ setAuxMaterialList, list }) => {
    const [isActive, setIsActive] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubCategoryList] = useState([]);

    const [categoriesSelected, setCategoriesSelected] = useState([]);
    const [subcategoriesSelected, setSubcategoriesSelected] = useState([]);

    const handlerCategoriesSelected = (isChecked, id) => {
        if (isChecked) {
            setSubcategoriesSelected([...subcategoriesSelected, ...subcategoryList.filter(({ subcategory }) => subcategory.categoryId === id)]);
        } else {
            setSubcategoriesSelected([...subcategoriesSelected.filter(({ subcategory }) => subcategory.categoryId !== id)]);
        }
    };

    useEffect(async () => {
        try {
            const requestCategories = await getCategoryMaterials();
            const requestSubCategories = await getSubCategoryMaterials();
            setCategoryList(requestCategories.data.steps);
            setSubCategoryList(requestSubCategories.data.steps);
        } catch (err) {
            console.error(`No se pueden obtener las categorias: ${err}`)
        }
    }, [])

    const checkIsSelected = (idInput) => {
        const isItemSelected = subcategoriesSelected.every(({ id }) => id === idInput)
        console.log(isItemSelected)
        return isItemSelected;
    };

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>
                        <input type="checkbox" checked={isActive} />
                        Material
                    </Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <ul>
                        {categoryList.map(({ id, category }, index) => (
                            <li style={{ listStyleType: 'none', color: '#0f111b' }} key={index}>
                                <input type="checkbox" onChange={(ev) => handlerCategoriesSelected(ev.target.checked, id)} />
                                {category.name.es}
                                <div style={{ paddingLeft: '1rem' }}>
                                    {
                                        subcategoryList.map((subcategory) => {
                                            if (subcategory.subcategory.categoryId === id) {
                                                return (
                                                    <li style={{ listStyleType: 'none', color: '#0f111b' }}>
                                                        <input type="checkbox" />
                                                        {subcategory.subcategory.name.es}
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const PlateSize = () => {
    const listMaterials = ["Pequeño (Hasta 600x600mm)", "Mediano(Hasta 1200x900mm)", "Gran formato"];
    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Tamaño de la plancha:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <ul>
                        {listMaterials.map((material, index) => (
                            <li>
                                <input type="checkbox" value={true} />
                                {material}
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const PlateWeight = () => {

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Grosor de plancha:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <Input type="range" />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const Finishing = ({ }) => {
    const listMaterials = ["Acabados", "Transparente", "Translúcido"];

    return (
        <Grid columns="16">
            <Grid.Row>
                <Grid.Column width="16">
                    <Header>Acabados:</Header>
                </Grid.Column>
                <Grid.Column width="16">
                    <ul>
                        {listMaterials.map((material, index) => (
                            <li>
                                <input type="checkbox" value={true} />
                                {material}
                            </li>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
};

export default Filters;