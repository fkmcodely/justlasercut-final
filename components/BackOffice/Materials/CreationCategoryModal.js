import React, { useEffect, useState } from 'react'
import { Button, Form, Header, Image, Modal, Divider } from 'semantic-ui-react'
import { createCategoryMaterial, getCategoryMaterials, deleteCategoryMaterials } from "../../../services/material";
import { useForm } from "react-hook-form";

function CreationCategoryModal() {
    const [open, setOpen] = React.useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handlerDeleteCategory = async (id) => {
        try {
            const del = await deleteCategoryMaterials(id);
            console.log(del)
        } catch (e) {
            console.error(`No se puede eliminar la categoria`)
        }
        setOpen(false);
    }

    useEffect(async () => {
        try {
            const info = await getCategoryMaterials();
            const { data: { steps } } = info;
            setCategoryList(steps);
        } catch (err) {
            console.error(`Error al obtener categorias:`, err);
        }
    }, [open]);

    const onSubmitData = async (data) => {
        try {
            const post = await createCategoryMaterial(data);
            setOpen(false);
        } catch (err) {
            console.log('Error al crear categoria del material')
        }
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>+ Añadir Categoria</Button>}
        >
            <Modal.Header>Formulario de creación de categorias</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={handleSubmit(onSubmitData)}>
                        <div>
                            <div>
                                <input {...register('category.name.es')} />
                                <input {...register('category.name.en')} />
                            </div>
                            <input type="submit" />
                        </div>
                    </Form>
                    <Divider />
                    <div>
                        {
                            categoryList.map(category => (
                                <div>
                                    <p>{category.category.name.es}</p>
                                    <Button content='Elimiar' color='red' onClick={() => handlerDeleteCategory(category.id)} />
                                </div>
                            ))
                        }
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Nope
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CreationCategoryModal