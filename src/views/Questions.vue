<template>
    <div v-if="qError">{{ qError }}</div>
    <div class="question" v-if="questions.length">
        <QuestionList :questions="questions" />
    </div>
    <div v-else>
        <Spinner />
    </div>
    <br>
    <br>
</template>

<script>
import QuestionList from '../components/QuestionList.vue'
import getQuestions from '../composables/getQuestions'
import { useRoute } from 'vue-router'
import Spinner from '../components/Spinner.vue'
import { computed } from 'vue'
import { projectFirestore } from '@/firebase/config'
export default {
    props: ['category'],
    components: { QuestionList, Spinner },
    setup(props) {
        const route = useRoute()
        const { questions, qError, qLoad } = getQuestions()

        qLoad()

        projectFirestore.collection('questions').orderBy('createdAt','desc').onSnapshot((snap) => {
            let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            console.log('documents: ', docs)
            questions.value = docs
        })

        return {
            questions,
            qError
        }

    }

}
</script>

<style>

</style>