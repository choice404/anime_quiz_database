<template>
    <label class="toggle">
        <input type="checkbox" v-model="formToggle">
        <span class="slider"></span>
        <span class="labels" data-on="question" data-off="category"></span>
    </label>

    <QuestionForm v-if="formToggle" />
    <CategoryForm v-else />
  
</template>

<script>
import { ref, watch } from 'vue';
import CategoryForm from '../components/CategoryForm.vue'
import QuestionForm from '../components/QuestionForm.vue'
import getUser from '@/composables/getuser';
import { useRouter } from 'vue-router';
export default {
    components: { CategoryForm, QuestionForm },
    setup() {
        const formToggle = ref(true);

        const { user } = getUser()
        const router = useRouter()

        watch(user, () => {
            if(!user.value)
            {
                router.push({ name: 'SignIn' })
            }
        })

        const changeForm = () => {
            formToggle!= formToggle
        }

        return {
            formToggle,
            changeForm
        }
    }

}
</script>

<style>
    /* styling lable */
    .toggle {
        --width: 110px;
        /* --height: calc(var(--width) / 3); */
        --height: 27px;

        position: relative;
        display: inline-block;
        width: var(--width);
        height: var(--height);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        border-radius: var(--height);
        cursor: pointer;
    }

    /* hiding checkbox */
    .toggle input {
        display: none;
    }
    /* Creating slider */
    .toggle .slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--height);
        background-color: #ccc;
        transition: all 0.4s ease-in-out;
    }
    .toggle .slider::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: calc(var(--height));
        height: calc(var(--height));
        border-radius: calc(var(--height) / 2);
        background-color: #fff;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease-in-out;
    }
    /* Adding slider effect */
    .toggle input:checked + .slider {
        background-color: #2196F3;
    }
    .toggle input:checked + .slider::before {
        transform: translateX(calc(var(--width) - var(--height)));
    }
    .toggle .labels {
      position: absolute;
      top: 8px;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 12px;
      font-family: sans-serif;
      transition: all 0.4s ease-in-out;
    }

    .toggle .labels::after {
      content: attr(data-off);
      position: absolute;
      right: 5px;
      color: #4d4d4d;
      opacity: 1;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
      transition: all 0.4s ease-in-out;
    }

    .toggle .labels::before {
      content: attr(data-on);
      position: absolute;
      left: 5px;
      color: #ffffff;
      opacity: 0;
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
      transition: all 0.4s ease-in-out;
    }

    .toggle input:checked~.labels::after {
      opacity: 0;
    }

    .toggle input:checked~.labels::before {
      opacity: 1;
    }
</style>