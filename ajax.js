export const obtenerUsuarios = async () => {
    try {
        const response = await fetch('datos.json');
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
