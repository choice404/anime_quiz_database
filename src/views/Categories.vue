<template>
    <div class="questions">
        <CategoryList :createListBool="false" />
    </div>
    <br>
    <br>
</template>

<script>
import CategoryList from '../components/CategoryList.vue'
export default {
    components: { CategoryList },
    setup() {
    }

}
</script>

<style>

</style>
