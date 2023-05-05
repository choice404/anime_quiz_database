<template> 
    <div class="backdrop" @click.self="closeCategory">
        <div class="modal">
            <slot>
                <div v-for="cat in categories" :key="cat.id">
                    <CategorySingle :category="cat" @select="selectCategory" />
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue'
import CategorySingle from './CategorySingle.vue'
export default {
    props: ['categories'],
    components: { CategorySingle },
    setup(props, { emit }) {
        const closeCategory = () => {
            emit('close')
        }

        const selectCategory = (newCat) => {
            emit('select', newCat)
        }

        onMounted(() => console.log('component mounted'))
        onUnmounted(() => console.log('component unmounted'))
        onUpdated(() => console.log('component updated'))

        return {
            closeCategory,
            selectCategory
        }
    }
}
</script>

<style>
    .modal {
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdrop {
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
</style>