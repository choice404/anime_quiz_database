import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getQuestions = () => {
    const questions = ref([])
    const qError = ref(null)

    const qLoad = async () => {
        try{
            const res = await projectFirestore.collection('questions').orderBy('createdAt', 'desc').get()

            questions.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        }
        catch(err) {
            qError.value = err.message
            console.log(qError.value)
        }
    }

    return{ questions, qError, qLoad }
}

export default getQuestions