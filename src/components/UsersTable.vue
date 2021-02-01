<template>
  <div class="users">
    <h1>
      Tabela z użytkownikami
    </h1>
    <table>
      <thead>
        <tr>
          <th>
            Nazwa
          </th>
          <th>
            Email
          </th>
          <th>
            Nazwa firmy
          </th>
          <th>
            Miasto
          </th>
          <th>
            Strona
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="user in users"
            :key="user.id"
        >
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>
            {{ user.company.name }}
          </td>
          <td>
            {{ user.address.city }}
          </td>
          <td>
            {{ user.website }}
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
    }
  },
  data () {
    return {
      users: []
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
