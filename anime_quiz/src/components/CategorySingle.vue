<template>
    <div class="singleCategory" @click="selectCategory">
        <h1>{{ name }}</h1>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: ['category'],
    setup(props, { emit }) {

        const selectCategory = () => {
            emit('select', name.value)
        }

        const name = ref(props.category.name)

        return{
            selectCategory,
            name
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


</style>