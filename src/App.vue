<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/primals">Primals</router-link> |
    <router-link to="/subprimals">Subprimals</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 2rem;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.button {
  text-decoration: none;
  border: 1px solid #000000;
  background-color: #000000;
  color: #FFFFFF;
  padding: .5rem;
  border-radius: 10px;
}
</style>
