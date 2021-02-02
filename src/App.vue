<template>
  <div id="app">
    <UsersTable
        :endpoint="$store.state.api + '/users'"
        :search="false"
        :sorting="false"
        :pagination="true"
        :selected-columns="'email,name,website,address.city,company.name'"
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
