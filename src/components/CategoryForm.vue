<template>
    <div class="create">
        <form @submit.prevent="handleSubmit">
            <label>Category:</label>
            <input type="text" v-model="name" required>
            <div v-if="showError" class="error">{{ duplicateError }}</div>
            <label>Description:</label>
            <textarea name="" id="" cols="30" rows="10" v-model="description" style="resize: none;" required></textarea>
            <label>Tags:</label>
            <input v-model="tag" type="text" @keydown.enter.prevent="handleKeydown">
            <div class="pill" v-for="tag in tags" :key="tag">
                <span @click="deleteTag(tag)">{{ tag }}</span>
            </div>
            <div class="submit">
                <button>Submit</button>
            </div>
        </form>
    </div>

</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import getCategories from '../composables/getCategories'
import { projectFirestore, timestamp } from '@/firebase/config';

export default {
    components: {},
    setup() {
        const { categories, cError, cLoad } = getCategories()

        cLoad()

        const name = ref('')
        const description = ref('')
        const tag = ref('')
        const tags = ref([])

        let showError = ref(false);
        let duplicateError = "Category already exists"

        const router = useRouter()
        console.log(router)

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

            const duplicate = categories.value.some(el => el.name === name.value)
            if(duplicate) showError.value = true;
            
            else if(!duplicate) {
                showError.value = false;
                const post = {
                    name: name.value.toLowerCase(),
                    description: description.value,
                    tags: tags.value,
                    createdAt: timestamp()
                }

                const res = await projectFirestore.collection('categories').add(post)
                name.value = ''
                description.value = ''
                tag.value = ''
                tags.value = []
            }

            // cLoad()
        }
        
        return {
            categories,
            cError,
            name,
            description,
            tag,
            tags,
            handleKeydown,
            handleSubmit,
            deleteTag,
            showError,
            duplicateError
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
    input, select, textarea{
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