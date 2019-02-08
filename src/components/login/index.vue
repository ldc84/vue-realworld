<template>
  <div>
    <h2>Login</h2>
    <a-form @submit="onSubmit" :form="form">
      <a-form-item
        v-bind="formItemLayout"
        label='E-mail'
      >
        <a-input
          size="large"
          v-decorator="[
            'email',
            {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }]
            }
          ]"
          type='email'
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label='Password'
      >
        <a-input
          size="large"
          v-decorator="[
            'password',
            {
              rules: [{
                required: true, message: 'Please input your password!',
              }, { 
                min:8, message: 'Please enter at least 8 characters'
              }],
            }
          ]"
          type='password'
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type='primary' size="large" htmlType='submit'>Login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { LOGIN } from '@/store/actions.type';

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24},
          sm: { span: 8}
        },
        wrapperCol: {
          xs: { span: 24},
          sm: { span: 16}
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          }
        }
      },
      email: null,
      password: null,
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if(!err) {
          console.log(values);
          this.$store.dispatch(LOGIN, {
              email: values.email,
              password: values.password
          })
          .then(() => {
            this.$router.push({ name: "home" });
            this.$message.success('Login Success');
          })
          .catch((err)=> _.forEach(err.data.errors, (v, k)=> {
            console.log(v, k);
            if(v.length > 0) {
              this.$message.error(`${k} Error`);
              return false;
            }
          }));
        }
      });
    }
  }
}
</script>
