<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img
              class="logo"
              src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
            />
            <div class="title">Sign in</div>
            <div class="subtitle">
              Don't have an account?
              <span class="subtitle-action" @click="signIn = !signIn">Create Account</span>
            </div>
          </div>
          <form @submit.prevent="login">
            <div class="form">
              <input
                required
                aria-required="true"
                aria-invalid="false"
                aria-label="E-mail"
                type="email"
                class="w100"
                :class="{ invalid: email.value && !emailRegex.test(email.value) }"
                ref="email"
                placeholder="Email"
                autofocus
                @blur="validateEmail"
                @keydown="validateEmail"
                v-model="email.value"
              />
              <input
                required
                aria-required="true"
                type="password"
                class="w100"
                :class="{ invalid: password.value && !passwordRegex.test(password.value) }"
                placeholder="Password"
                v-model="password.value"
                @blur="validatePassword"
                @keydown="validatePassword"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              class="action"
              :class="{ 'action-disabled': !loginValid }"
            />
          </form>
        </div>
        <div class="register" v-else>
          <div class="top">
            <img
              class="logo"
              src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
            />
            <div class="title">Create an Account</div>
            <div class="subtitle">
              Already have an account?
              <span class="subtitle-action" @click="signIn = !signIn">Sign In</span>
            </div>
          </div>
          <form @submit.prevent="register">
            <div class="form">
              <input
                type="text"
                placeholder="First name"
                autofocus
                v-model="firstName"
                class="w100"
              />
              <input
                type="text"
                placeholder="Last name"
                v-model="lastName"
                class="w100"
              />
              <input
                type="email"
                class="w100"
                placeholder="Email"
                v-model="email.value"
                :class="{ invalid: email.value && !emailRegex.test(email.value) }"
              />
              <input
                type="password"
                class="w100"
                placeholder="Password"
                v-model="password.value"
                :class="{ invalid: password.value && !passwordRegex.test(password.value) }"
              />
            </div>
            <button class="action" :class="{ 'action-disabled': !registerValid }">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      emailRegex: /^[\w.-]+@[\w.-]+\.\w+$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,

      firstName: "",
      lastName: "",

      password: {
        value: "",
        error: false
      },

      email: {
        value: "",
        error: false
      },

      signIn: true
    };
  },

  methods: {
    validateEmail() {
      this.email.error = !this.emailRegex.test(this.email.value);
    },

    validatePassword() {
      this.password.error = !this.passwordRegex.test(this.password.value);
    },

    async login() {
      if (!this.email.value || !this.password.value || this.email.error || this.password.error) {
        console.error('Please fill in all required fields correctly.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email.value,
          password: this.password.value,
        });

        console.log('Login successful:', response.data);
      } catch (error) {
        console.error('Login failed:', error.response.data);
      }
    },

    async register() {
      if (!this.firstName || !this.lastName || !this.email.value || !this.password.value ||
          this.email.error || this.password.error) {
        console.error('Please fill in all required fields correctly.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          name: this.firstName,
          last_name: this.lastName,
          email: this.email.value,
          password: this.password.value,
        });

        console.log('Registration successful:', response.data);
      } catch (error) {
        console.error('Registration failed:', error.response.data);
      }
    }
  },

  computed: {
    validFirstName() {
      return this.firstName.length > 0;
    },

    validLastName() {
      return this.lastName.length > 0;
    },

    loginValid() {
      return this.email.value && this.password.value && !this.email.error && !this.password.error;
    },

    registerValid() {
      return (
        this.firstName &&
        this.lastName &&
        this.email.value &&
        this.password.value &&
        !this.email.error &&
        !this.password.error &&
        this.validFirstName &&
        this.validLastName
      );
    }
  }
};
</script>

<style scoped lang="scss">
@mixin box {
  box-shadow: 1px 1px 2px 1px #ccc;
}

@mixin field {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"], input[type="email"], input[type="password"] {
  @include field;
}

.invalid {
  border: 2px solid red !important;
  &::placeholder {
    color: red;
  }
}

.errorMessage {
  color: red;
  margin: 10px;
  top: 5px;
}

.w100 {
  width: 100%;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.logo {
  width: 300px;
  margin-bottom: 10px;
}

.action {
  height: 40px;
  text-transform: uppercase;
  border-radius: 25px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: green;
  margin-top: 20px;
  color: #fff;
  font-size: 1.2rem;
  @include box;
}

.action-disabled {
  color: #eee;
  background: #aaa;
  cursor: auto;
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.title {
  width: 100%;
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  .subtitle-action {
    color: green;
    font-weight: bold;
    cursor: pointer;
  }
}

.loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  padding: 25px 55px;
  animation: slideInTop 1s;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }

  to {
    opacity: 100;
    transform: translateY(0%);
  }
}

@media screen and (min-width: 440px) {
  .loginBox {
    @include box;
  }
}

@media screen and (max-width: 440px) {
  html {
    background: #fff;
    align-items: start;
    justify-content: start;
  }

  .loginBox {
    padding: 25px 25px;
    max-width: 100vw;
  }
}
</style>





