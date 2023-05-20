<template>
    <div class="create">
        <CategoryModal :categories="categories" :createListBool="true" v-if="showModal" @close="hideCategories" @select="selectCategory" />
        <form @submit="handleSubmit">
            <label>Question:</label>
            <input type="text" v-model="question" required>

            <label>Question Type:</label>
            <select name="" id="" v-model="questionType" required>
                <option value="text">text</option>
                <option value="image">image</option>
                <option value="video">video</option>
                <option value="audio">audio</option>
            </select>

            <label>Answer:</label>
            <input type="text" v-model="answer" required>
            <label>Fandom:</label>
            <input type="text" v-model="fandom" required>

            <label>Category:</label>
            <input type="text" placeholder="Select Category" v-model="cat" @click.prevent="showCategories" required READONLY>
            <div v-if="showCatError" class="error">{{ catError }}</div>

            <div class="error" v-if="cError">{{ cError }}</div>
            <label>Difficulty:</label>
            <select name="" id="" v-model="difficulty" required>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
            <label>Tags:</label>
            <input v-model="tag" type="text" @keydown.enter.prevent="handleKeydown">
            <div class="pill" v-for="tag in tags" :key="tag">
                <span @click="deleteTag(tag)">{{ tag }}</span>
            </div>
            <div class="submit">
                <button>Submit</button>
            </div>
            <!-- <h1>{{ catId }}</h1> -->
        </form>
        <br>
    </div>
</template>

<script>
import { ref } from 'vue';
import getQuestions from '../composables/getQuestions'
import getCategories from '../composables/getCategories'
import { useRouter } from 'vue-router';
import CategoryModal from './CategoryModal.vue'
import { projectFirestore, timestamp } from '@/firebase/config';

export default {
    components: { CategoryModal },
    setup() {

        const { questions, qError, qLoad } = getQuestions()
        const { categories, cError, cLoad } = getCategories()

        qLoad()
        cLoad()
        
        const question = ref('')
        const answer = ref('')
        const fandom = ref('')
        const cat = ref('select category')
        const difficulty = ref('')
        const tag = ref('')
        const tags = ref([])
        const showModal = ref(false);
        const showCatError = ref(false);
        const catError = ref('')
        const questionType = ref('text')
        const catId = ref('')

        const router = useRouter()
        console.log(router)

        const showCategories = () => {
            showModal.value = true;
            console.log("Showing modal")
        }

        const selectCategory = (newCat, newCatId) => {
            showModal.value = false
            cat.value = newCat
            catId.value = newCatId
        }

        const hideCategories = () => {
            showModal.value = false
        }

        const handleKeydown = () => {
            if(!tags.value.includes(tag.value)) {
                tag.value = tag.value.replace(/\s/g, '')
                tags.value.push(tag.value.toLowerCase())
            }
            tag.value = ''
        }

        const deleteTag = (toDel) => {
            tags.value = tags.value.filter((item) => {
                return toDel !== item
            })
        }

        const handleSubmit = async () => {
            if(cat.value === "select category") {
                catError.value = "Please select a valid category"
                showCatError.value = true
            }

            else{
                const post = {
                    question: question.value.toLowerCase(),
                    answer: answer.value.toLowerCase(),
                    questionType:  questionType.value,
                    category: cat.value,
                    categoryId: catId.value,
                    tags: tags.value,
                    fandom: fandom.value.toLowerCase(),
                    difficulty: difficulty.value,
                    createdAt: timestamp()
                }

                const res = await projectFirestore.collection('questions').add(post)
            }
        }
        
        return {
            questions,
            qError,
            categories,
            cError,
            question,
            answer,
            fandom,
            cat,
            tag,
            tags,
            difficulty,
            handleKeydown,
            deleteTag,
            handleSubmit,
            showCategories,
            showModal,
            hideCategories,
            selectCategory,
            catError,
            showCatError,
            questionType,
            catId,
        }
    }

}
</script>

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 10px 0 0;
        position: relative;
        top: 2px;
    }
    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .submit {
        text-align: center;
    }
    .pill {
        display: inline-block;
        margin: 10px 10px 0 0;
        color: #444;
        background: #ddd;
        padding: 8px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
    }
    .error {
        color: #ff0062;
        margin-top: 10px;
        font-size: 0.8em;
        font-weight: bold;
    }
</style>