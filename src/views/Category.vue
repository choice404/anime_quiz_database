<template>
    <Modal v-if="showConfirmModal" :modalType="modalType" modalHeader="WARNING" :modalMessage="warningMessage" @close="hideConfirmModal" @warningSubmit="deleteCategory" />
    <div v-for="cat in categoryName" :key="cat.name">
        <h1>{{ cat.name }}</h1>
    </div>
    <div v-if="qError">{{ qError }}</div>
    <div class="category" v-if="questions.length">
        <QuestionList :questions="filteredQuestions" />
    </div>
    <div v-else>
        <Spinner />
    </div>
    <button @click="revealConfirmModal">Delete Category</button>
    <br>
    <br>
</template>

<script>
import QuestionList from '../components/QuestionList.vue'
import Spinner from '../components/Spinner.vue'
import Modal from '../components/Modal.vue'
import getQuestions from '../composables/getQuestions'
import getCategories from '../composables/getCategories'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
export default {
    props: ['id'],
    components: { QuestionList, Spinner, Modal },
    setup(props) {

        const warningMessage = ref('')
        const showConfirmModal = ref(false)
        const modalType = ref('')

        const route = useRoute()
        const router = useRouter()
        const { questions, qError, qLoad } = getQuestions()
        const { categories, cError, cLoad } = getCategories()

        qLoad()
        cLoad()

        const categoryName = computed(() => {
            return categories.value.filter((c) => c.id.includes(route.params.id))
        })

        projectFirestore.collection('questions').orderBy('createdAt','desc').onSnapshot((snap) => {
            let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            console.log('documents: ', docs)
            questions.value = docs
        })

        const filteredQuestions = computed(() => {
            return questions.value.filter((q) => q.categoryId.includes(route.params.id))
        })

        const revealConfirmModal = () => {
            if(filteredQuestions.value.length > 9)
            {
                warningMessage.value = 'This category has at least 10 questions and can not be deleted'
                modalType.value = 'alert'
                showConfirmModal.value = true
            }
            else if(filteredQuestions.value.length)
            {
                warningMessage.value = 'This category has questions in it. If you delete this category all of the questions will also be deleted. This is can not be undone... Would you like to confirm deletion?'
                modalType.value = 'warning'
                showConfirmModal.value = true
            }
            else
            {
                warningMessage.value = 'This will permanently delete the category. This aciton can not be undone. Would you like to confirm deletion?'
                modalType.value = 'warning'
                showConfirmModal.value = true
            }
        }

        const deleteCategory = async () => {
            if(filteredQuestions.value.length)
            {
                for(let i in filteredQuestions.value)
                {
                    console.log(filteredQuestions.value[i].id)
                    await projectFirestore.collection('questions').doc(filteredQuestions.value[i].id).delete()
                }
            }
            await projectFirestore.collection('categories').doc(props.id).delete()
            router.push({name: 'Categories'})
        }

        const hideConfirmModal = () => {
            showConfirmModal.value = false
        }


        return {
            questions,
            qError,
            filteredQuestions,
            categoryName,
            categories,
            cError,
            showConfirmModal,
            hideConfirmModal,
            warningMessage,
            revealConfirmModal,
            deleteCategory,
            modalType
        }

    }

}
</script>

<style>

</style>