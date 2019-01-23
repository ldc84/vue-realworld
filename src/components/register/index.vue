<template>
  <div>
    <h2>Register</h2>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        v-bind="formItemLayout"
        label="Name"
      >
        <a-input
          size="large"
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }]
            }
          ]"
        />
      </a-form-item>
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
              }, {
                validator: validateToNextPassword,
              }],
            }
          ]"
          type='password'
        />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label='Confirm Password'
      >
        <a-input
          size="large"
          v-decorator="[
            'confirm',
            {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: compareToFirstPassword,
              }],
            }
          ]"
          type='password'
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type='primary' size="large" htmlType='submit'>Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { REGISTER } from '@/store/actions.type';

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data(){
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
      }
    }
  },  
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if(!err) {
          console.log(values);
          this.$store.dispatch(REGISTER, {
              username: values.name,
              password: values.password,
              email: values.email
          })
          .then(() => this.$router.push({ name: "home" }))
          .catch((err)=> _.forEach(err.data.errors, (v, k)=> {
            if(v.length > 0) {
              this.$message.error(`${k} Error`);
              document.getElementById(k).focus();
              return false;
            }
          }));
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  }
}
</script>
