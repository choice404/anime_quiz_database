<template>
    <div class="singleQuestion">
        <h1 v-if="question.questionType === 'text'">{{ question.question }}</h1>
        <img v-if="question.questionType === 'image'" :src="question.question" :alt="question.question">
    </div>
</template>

<script>

export default {
    props: ['question'],
    setup(props) {

    }
}
</script>

<style>
h1 {
    text-transform: capitalize;
    font-size: 2rem;
    cursor: pointer;
}
.singleQuestion {
    background: white;
    width: 80%;
    margin: 10px auto;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}
.singleQuestion img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 20px;
    margin: 10px;
}

</style>