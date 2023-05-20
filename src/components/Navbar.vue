<template>
    <header>
        <h1>ANIME QUIZ DATABASE</h1>
        <nav>
            <div v-if="user" class="account">
                <router-link :to="{ name: 'Home' }">HOME</router-link>
                <router-link :to="{ name: 'About' }">ABOUT</router-link>
                <router-link :to="{ name: 'Games' }">GAMES</router-link>
                <router-link :to="{ name: 'Categories' }">CATEGORIES</router-link>
                <router-link :to="{ name: 'Questions' }">QUESTIONS</router-link>
                <router-link :to="{ name: 'Create' }">CREATE</router-link>
                <span class="accName">{{ user.displayName }}</span>
                <span class="logoutButton" @click="handleClick">Logout</span>
            </div>
            <div v-else>
                <router-link :to="{ name: 'Home' }">HOME</router-link>
                <router-link :to="{ name: 'About' }">ABOUT</router-link>
                <router-link :to="{ name: 'Categories' }">CATEGORIES</router-link>
                <router-link :to="{ name: 'Questions' }">QUESTIONS</router-link>
                <router-link :to="{ name: 'Games' }">GAMES</router-link>
                <router-link :to="{ name: 'SignIn' }">SIGNIN</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
import { watch } from 'vue'
import getUser from '../composables/getuser'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const { logout, error } = useLogout()
        const { user } = getUser()
        const router = useRouter()

        const handleClick = async () => {
            await logout()
            if(!error.value)
            {
                console.log('user logged out')
            }
        }

        watch(user, () => {
            if(!user.value)
            {
                router.push({ name: 'SignIn' })
            }
        })

        return { handleClick, user }
    }
}
</script>

<style>
.account {
    font-family: 'bebas neue';
    display: inline-block;
}
/* .accName {
    margin-right: 10px;
} */
.logoutButton {
    cursor: pointer;
}

</style>