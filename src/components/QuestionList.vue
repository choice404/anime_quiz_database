<template>
    <QuestionModal :question="question" v-if="showModal" @close="hideQuestion" />
    <div class="questionList" v-if="questions.length">
        <div v-for="que in questions" :key="que.id">
            <QuestionSingle :question="que" @click="showQuestion(que)" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import QuestionModal from './QuestionModal.vue'
import QuestionSingle from './QuestionSingle.vue'
export default {
    components: { QuestionSingle, QuestionModal },
    props: ['questions'],
    setup(props) {
        const showModal = ref(false);
        const question = ref(null);

        const showQuestion = (que) => {
            showModal.value = true;
            question.value = que
        }

        const hideQuestion = () => {
            showModal.value = false;
        }

        return {
            showModal,
            showQuestion,
            hideQuestion,
            question
        }

    }

}
</script>
<style>
.questionList {
    padding: 20px;
    margin: auto;
    width: 80%;
    max-width: 600px;
    background: white;
    border-radius: 20px;
}
</style>