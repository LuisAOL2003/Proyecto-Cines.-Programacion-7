<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img
              class="logo"
              src="../assets/logocompleto.png"
            />
            <div class="title">Sign in</div>
            <div class="subtitle">
              Don't have an account?
              <span class="subtitle-action" @click="toggleSignIn">Create Account</span>
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
                :class="{ invalid: email.error }"
                ref="email"
                placeholder="Email"
                autofocus
                @blur="validateEmail"
                @input="validateLoginFields"
                v-model="email.value"
              />
              <div v-if="email.error" class="errorMessage">Please enter a valid email address.</div>
              <input
                required
                aria-required="true"
                type="password"
                class="w100"
                :class="{ invalid: password.error }"
                placeholder="Password"
                v-model="password.value"
                @blur="validatePassword"
                @input="validateLoginFields"
              />
              <div v-if="password.error" class="errorMessage">Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.</div>
            </div>
            <input
              type="submit"
              value="Sign in"
              class="action"
              :class="{ 'action-disabled': !loginValid }"
              :disabled="!loginValid"
            />
          </form>
        </div>
        <div class="register" v-else>
          <div class="top">
            <img
              class="logo"
              src="../assets/logocompleto.png"
            />
            <div class="title">Create an Account</div>
            <div class="subtitle">
              Already have an account?
              <span class="subtitle-action" @click="toggleSignIn">Sign In</span>
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
                :class="{ invalid: email.error }"
                @blur="validateEmail"
                @input="validateRegisterFields"
              />
              <div v-if="email.error" class="errorMessage">Please enter a valid email address.</div>
              <input
                type="password"
                class="w100"
                placeholder="Password"
                v-model="password.value"
                :class="{ invalid: password.error }"
                @blur="validatePassword"
                @input="validateRegisterFields"
              />
              <div v-if="password.error" class="errorMessage">Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.</div>
            </div>
            <button
              type="submit"
              class="action"
              :class="{ 'action-disabled': !registerValid }"
              :disabled="!registerValid"
            >
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
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      emailRegex: /^[\w.-]+@[\w.-]+\.\w+$/,
      passwordRegex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,

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

    validateLoginFields() {
      this.email.error = !this.emailRegex.test(this.email.value);
      this.password.error = !this.passwordRegex.test(this.password.value);
    },

    validateRegisterFields() {
      this.email.error = !this.emailRegex.test(this.email.value);
      this.password.error = !this.passwordRegex.test(this.password.value);
    },

    toggleSignIn() {
      this.signIn = !this.signIn;
      this.resetForm();
    },

    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email.value = "";
      this.password.value = "";
      this.email.error = false;
      this.password.error = false;
    },

    async login() {
      if (!this.loginValid) {
        console.error('Please fill in all required fields correctly.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email.value,
          password: this.password.value,
        });

        const { accessToken, refreshToken } = response.data;

        // Guarda los tokens en cookies
        Cookies.set('accessToken', accessToken, { expires: 1 / 46 }); // Expira en 30 minutos
        Cookies.set('refreshToken', refreshToken, { expires: 30 }); // Expira en 30 días

        console.log('Login successful:', response.data);

        // Decodifica el token para obtener el rol del usuario
        const decodedToken = jwtDecode(accessToken);
        const userRole = decodedToken.role;

        // Redirige según el rol del usuario
        if (userRole === 'Administrador') {
          this.$router.push('/admin');
        } else if (userRole === 'Cliente') {
          this.$router.push('/user');
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
      }
    },

    async register() {
      if (!this.registerValid) {
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
        this.toggleSignIn(); // Redirigir al formulario de inicio de sesión
      } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
      }
    },

    async fetchProtectedData() {
      try {
        const response = await axios.get('http://localhost:3000/api/protected-route', {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`
          }
        });
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Failed to fetch protected data:', error.response ? error.response.data : error.message);
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
  },

  mounted() {
    this.resetForm();
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











