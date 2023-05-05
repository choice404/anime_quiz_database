<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar }
}
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

header h1 {
  font-family: 'bebas neue';
  color: #dfdfdf;
  font-size: 4rem;
}

header a {
  font-family: 'bebas neue';
  color: #444;
  text-decoration: none;
  margin-left: 20px;
}

header a.router-link-active {
  color: #0f5e9c;
  font-weight: bold;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  background: #74ccf4;
}
</style>
