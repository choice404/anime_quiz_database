<template> 
    <div class="qBackdrop" @click.self="closeQuestion">
        <div class="qModal">
            <div class="qModalBody">
                <slot>
                    <div class="sections">
                        <h1>Question</h1>
                        <h1 v-if="question.questionType === 'text'">{{ question.question }}</h1>
                        <img v-if="question.questionType === 'image'" :src="question.question" :alt="question.question">
                    </div>
                    <div class="sections">
                        <h1>Answer</h1>
                        <h1 class="value">{{ question.answer }}</h1>
                    </div>
                    <div class="sections">
                        <h1>Fandom</h1>
                        <h1 class="value">{{ question.fandom }}</h1>
                    </div>
                    <div class="sections">
                        <h1>Difficulty</h1>
                        <h1 class="value">{{ question.difficulty}}</h1>
                    </div>
                    <div class="sections">
                        <h1>Tags</h1>
                        <div class="pill" v-for="tag in question.tags" :key="tag">
                            <span>{{ tag }}</span>
                        </div>
                    </div>

                    <button @click="revealConfirmModal">Delete Question</button>

                </slot>
            </div>
        </div>
    </div>
    <Modal v-if="showConfirmModal" :modalType="modalType" modalHeader="WARNING" :modalMessage="modalMessage" @close="hideConfirmModal" @warningSubmit="deleteQuestion" />
</template>

<script>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import Modal from './Modal.vue'
import { projectFirestore } from '@/firebase/config'
import { useRouter } from 'vue-router'
export default {
    props: ['question'],
    components: { Modal },
    setup(props, { emit }) {
        const router = useRouter()
        const closeQuestion = () => {
            emit('close')
        }

        const question = ref(props.question)
        const showConfirmModal = ref(false)
        const modalMessage = ref('')
        const modalType = ref('')

        const revealConfirmModal = () => {
            modalMessage.value = 'This action can not be undone. Would you like to confirm deletion?'
            modalType.value = 'warning'
            showConfirmModal.value = true
            console.log(modalMessage.value)
        }

        const hideConfirmModal = () => {
            showConfirmModal.value = false
            console.log('hi')
        }

        const deleteQuestion = async () => {
            showConfirmModal.value = false
            await projectFirestore.collection('questions').doc(props.question.id).delete()
            router.go()
        }

        onMounted(() => {} )
        onUnmounted(() => console.log('component unmounted'))
        onUpdated(() => console.log('component updated'))

        return {
            closeQuestion,
            question,
            showConfirmModal,
            revealConfirmModal,
            hideConfirmModal,
            deleteQuestion,
            modalMessage,
            modalType,
        }
    }
}
</script>

<style>
    .qModal {
        width: 420px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
        overflow: hidden;
    }
    .qModalBody {
        max-height: calc(100vh - 210px);
        overflow-y: auto;
    }
    .qBackdrop {
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
    .value {
        color: red;
    }
    .sections{
        background: white;
        width: 80%;
        margin: 10px auto;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 20px;
        margin: 10px;
    }
    button {
        cursor: pointer;
    }

</style>