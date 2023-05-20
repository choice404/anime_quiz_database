<template> 
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{ warning: modalType === 'warning' || modalType === 'alert' }">
            <slot>
                <h3>{{ modalHeader }}</h3>
                <p>{{ modalMessage }}</p>
                <div v-if="modalType === 'warning'" class="buttons">
                    <button @click="closeModal">no</button>
                    <button @click="handleClick">yes</button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
export default {
    props: [ 'modalHeader', 'modalMessage', 'modalType' ],
    components: {},
    setup(props, { emit }) {
        const closeModal = () => {
            emit('close')
        }

        const handleClick = () => {
            if(props.modalType === 'warning')
            {
                emit('warningSubmit')
            }
            else
            {
                emit('close')
            }
        }

        onMounted(() => {} )
        onUnmounted(() => console.log('component unmounted'))
        onUpdated(() => console.log('component updated'))

        return {
            closeModal,
            handleClick
            
        }
    }
}
</script>

<style>
    .warning {
        color: #ff0062;
        margin-top: 10px;
        font-size: 0.8em;
        font-weight: bold;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 0px 125px;
    }
    .buttons button {
        cursor: pointer;
    }


</style>