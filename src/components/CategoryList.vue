<template>
    <div v-if="cError">{{ cError }}</div>
    <div class="categoriesList" v-if="categories.length">
        <div v-for="cat in categories" :key="cat.id">
            <CategorySingle :category="cat" :createListBool="createList" />
        </div>
    </div>
    <div v-else>
        <Spinner />
    </div>
</template>

<script>
import CategorySingle from "./CategorySingle.vue"
import Spinner from "./Spinner.vue"
import getCategories from "../composables/getCategories"
import { ref } from "vue"
import { projectFirestore } from "@/firebase/config"
export default {
    props: ['createListBool'],
    components: { CategorySingle, Spinner },
    setup(props) {
        const { categories, cError, cLoad } = getCategories()

        const createList = ref(props.createListBool);

        cLoad()

        projectFirestore.collection('categories').orderBy('createdAt','desc').onSnapshot((snap) => {
            let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
            console.log('documents: ', docs)
            categories.value = docs
        })

        return {
            categories,
            cError,
            createList
        }

    }
}
</script>

<style>
    .categoriesList {
        margin: auto;
        width: 80%;
        max-width: 600px;
        background: white;
        border-radius: 20px;
    }

</style>