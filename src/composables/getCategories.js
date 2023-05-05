import { ref } from 'vue'
const getCategories = () => {
    const categories = ref([])
    const cError = ref(null)

    const cLoad = async () => {
        try{
            let data = await fetch('http://localhost:3000/categories')
            if(!data.ok) {
                throw Error('no data available')
            }
            categories.value = await data.json()
        }
        catch(err) {
            cError.value = err.message
            console.log(cError.value)
        }
    }

    return{ categories, cError, cLoad }
}

export default getCategories