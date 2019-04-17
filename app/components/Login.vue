<template>
<Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form loginpersonalizado">
                <Image class="logo" src="~/images/logofo2b.png"></Image>
                

                <GridLayout rows="auto, auto, auto">
                    <StackLayout row="0" class="input-field">
                        <TextField class="input" hint="RUC" :isEnabled="!processing"
                            autocorrect="false"
                            autocapitalizationType="none" v-model="user.ruc"
                            ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="1" class="input-field">
                        <TextField class="input" :isEnabled="!processing"
                            autocorrect="false" autocapitalizationType="none"
                            hint="Usuario" v-model="user.usuario"
                           ></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout row="2" class="input-field">
                        <TextField class="input" ref="confirmPassword" :isEnabled="!processing"
                            hint="Clave" secure="true" v-model="user.clave"
                            returnKeyType="done"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="3" :busy="processing"></ActivityIndicator>
                </GridLayout>

                <Button :text="isLoggingIn ? 'Ingresar' : 'Sign Up'" :isEnabled="!processing"
                    @tap="submit" class="btn btn-primary m-t-20"></Button>
                <Label *v-show="isLoggingIn" text="Olvidaste tu clave?"
                    class="login-label" @tap="forgotPassword()"></Label>
            </StackLayout>

            <!-- <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
                    <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
                </FormattedString>
            </Label> -->
        </FlexboxLayout>
    </Page>
</template>

<script>
import * as http from "http";
    export default {
        data(){
            return{
                isLoggingIn: true,
                processing: false,
                user: {
                    ruc: "20434178780",
                    usuario: "Administrador",
                    clave: "123456"
                },
                respuesta: '',
                bandera: ''
            }
        },
        methods:{
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },
            submit() {
                // if (!this.user.ruc || !this.user.usuario || !this.user.clave) {
                http.request({
                    url: "http://fo2_back.local/api/login",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        ruc: "20434178780",
                        usuario: "Administrador",
                        clave: "123456"
                    })
                }).then((response) => {
                    let result = response.content.toJSON();
                    this.alert(result)
                }, (e) => {
                });
            },
            login() {
                this.$backendService
                    .login(this.user)
                    .then(() => {
                        this.processing = false;
                        this.$navigateTo(Home, { clearHistory: true });
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Unfortunately we could not find your account."
                        );
                    });
            },

            register() {
                if (this.user.password != this.user.confirmPassword) {
                    this.alert("Your passwords do not match.");
                    this.processing = false;
                    return;
                }

                this.$backendService
                    .register(this.user)
                    .then(() => {
                        this.processing = false;
                        this.alert(
                            "Your account was successfully created.");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "Unfortunately we were unable to create your account."
                        );
                    });
            },

            forgotPassword() {
                prompt({
                    title: "Olvedaste la Clave",
                    message: "Ingresa el correo electronico con el que registraste tu app, para resetear la clave",
                    inputType: "email",
                    defaultText: "",
                    okButtonText: "Ok",
                    cancelButtonText: "Cancelar"
                }).then(data => {
                    if (data.result) {
                        this.$backendService
                            .resetPassword(data.text.trim())
                            .then(() => {
                                this.alert(
                                    "Your password was successfully reset. Please check your email for instructions on choosing a new password."
                                );
                            })
                            .catch(() => {
                                this.alert(
                                    "Unfortunately, an error occurred resetting your password."
                                );
                            });
                    }
                });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "APP NAME",
                    okButtonText: "OK",
                    message: message
                });
            }
        }
    }
</script>

<style>
    .logo{
        margin-top: 25%;
        margin-bottom: 8%;
        width: 80%;
    }
    .loginpersonalizado{
        margin-left: 10%;
        margin-right: 10%;
    }
    .login-label{
        color: #fff;
    }
</style>


