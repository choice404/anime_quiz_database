<template>
    <div v-if="createList" class="singleCategory" @click="selectCategory">
        <h1>{{ name }}</h1>
    </div>
    <div v-if="!createList" class="singleCategory">
        <h1>
            <router-link :to="{ name: 'Category', params: { id: category.id }}">
                {{ name }}
            </router-link>
        </h1>
    </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue'
import { ref } from 'vue'
export default {
    props: ['category', 'createListBool'],
    setup(props, { emit }) {

        const createList = ref(props.createListBool);
        const name = ref(props.category.name)
        const catId = ref(props.category.id)

        const selectCategory = () => {
            emit('select', name.value, catId.value)
        }

        return{
            selectCategory,
            name,
            createList,
            catId
        }
    }
}
</script>

<style>
h1 {
    text-transform: capitalize;
    font-size: 2rem;
    cursor: pointer;
}
.singleCategory {
    background: white;
    width: 80%;
    margin: 10px auto;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
a {
    text-decoration: none;
    color: black;
}


</style>