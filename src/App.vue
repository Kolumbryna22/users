<template>
  <div id="app">
    <UsersTable
        :endpoint="$store.state.api + '/users'"
        :search="false"
        :sorting="false"
        :pagination="false"
    />
  </div>
</template>

<script>
import UsersTable from './components/UsersTable';

export default {
  name: 'App',
  components: {
    UsersTable
  }
};
</script>

<style lang="scss">
@import "./src/styles/main.scss";
</style>
