<template>
    <div class="categoriesList">
        <div v-for="cat in categories" :key="cat.id">
            <CategorySingle :category="cat" />
        </div>
    </div>
</template>

<script>
import CategorySingle from "./CategorySingle.vue"
import getCategories from "../composables/getCategories"
export default {
    components: { CategorySingle },
    setup() {
        const { categories, cError, cLoad } = getCategories()

        cLoad()

        return {
            categories,
            cError,
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
    }

</style>