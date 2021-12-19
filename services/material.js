import axios from "axios";

export const getServices = async () => {
    try {
        const fetch = await axios(`/api/materials`);
        const { data: { services } } = fetch;
        return services;
    } catch (error) {
        console.error(`Error al obtenes ficheros: ${error}`)
    };
}

export const getMaterials = async () => await axios(`/api/materials`);
export const createMaterial = async (material) => {
    try {
        const post = await axios.post(`/api/materials`, material);
        const { data } = post;
        return data;
    } catch (err) {
        console.error(`Error al crear material.`);
    }
};
export const deleteMaterial = async (id) => await axios.delete(`/api/materials`, {
    params: {
        id: id
    }
})

export const getCategoryMaterials = async () => await axios(`/api/material-category`);
export const deleteCategoryMaterials = async (id) => await axios.delete(`/api/material-category`, {
    data: {
        id: id
    }
});
export const createCategoryMaterial = async (categoryMaterial) => {
    try {
        const post = await axios.post(`/api/material-category`, categoryMaterial);
        const { data } = post;
        return data;
    } catch (err) {
        console.error(`Error al create categoria: ${err}`);
    }
}