<template>
  <div class="users">
    <h1>
      Tabela z użytkownikami
    </h1>
    <table>
      <thead>
        <tr>
          <th
              v-for="column in columns"
              :key="column"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="user in users"
            :key="user.id"
        >
          <td
              v-for="column in columns"
              :key="column + user.id"
          >
            {{ user.getValue(column) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
class User {
  constructor (data) {
    this.id = data?.id || '';
    this.email = data?.email || '';
    this.name = data?.name || '';
    this.website = data?.website || '';
    this.address = new Address(data?.address || '');
    this.company = new Company(data?.company || '');
  }

  getValue (key) {
    const keyArray = key.split('.');

    if (keyArray.length > 1) {
      return this[keyArray[0]][keyArray[1]];
    }

    return this.email;
  }
}

class Address {
  constructor (data) {
    this.city = data?.city || '';
  }
}

class Company {
  constructor (data) {
    this.name = data?.name || '';
  }
}

export default {
  name: 'Users',
  props: {
    endpoint: {
      type: String,
      default: ''
    },
    search: {
      type: Boolean,
      default: false
    },
    sorting: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    selectedColumns: {
      type: String,
      default: 'email,name,website,address.city,company.name'
    }
  },
  data () {
    return {
      users: [],
      columns: this.selectedColumns.split(',')
    };
  },
  mounted () {
    const self = this;

    this.axios.get(this.endpoint)
      .then((res) => {
        console.log(res);
        self.users = res.data.map(user => new User(user));
      })
      .catch((e) => {
        console.log(e);
      });
  }
};
</script>