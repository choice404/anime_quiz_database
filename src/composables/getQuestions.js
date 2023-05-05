import { ref } from 'vue'
const getQuestions = () => {
    const questions = ref([])
    const qError = ref(null)

    const qLoad = async () => {
        try{
            let data = await fetch('http://localhost:3000/questions')
            if(!data.ok) {
                throw Error('no data available')
            }
            questions.value = await data.json()
        }
        catch(err) {
            qError.value = err.message
            console.log(qError.value)
        }
    }

    return{ questions, qError, qLoad }
}

export default getQuestions