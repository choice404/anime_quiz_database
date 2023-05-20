import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCategories = () => {
    const categories = ref([])
    const cError = ref(null)

    const cLoad = async () => {
        try{
            const res = await projectFirestore.collection('categories').orderBy('createdAt', 'desc').get()

            categories.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        }
        catch(err) {
            cError.value = err.message
            console.log(cError.value)
        }
    }

    return{ categories, cError, cLoad }
}

export default getCategories