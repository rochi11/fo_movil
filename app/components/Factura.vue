<template>
    <Page>
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent class="colorsandwich">
                <StackLayout>
                    <Label text="Dashboard" color="lightgray" padding="10" class="colorsandwichtab" />
                    <Label text="Factura" color="lightgray" padding="10" />
                    <Label text="Boleta" color="lightgray" padding="10" />
                    <Label text="Guia Remision" color="lightgray" padding="10" />
                    <Label text="Com Baja" color="lightgray" padding="10" />
                    <Label text="Reportes" color="lightgray" padding="10" />
                </StackLayout>
                <Label text="Close" color="lightgray" padding="10" style="horizontal-align: center"
                    @tap="onCloseDrawerTap" />
            </StackLayout>
            <StackLayout ~mainContent>
                <Label :text="mainContentText" textWrap="true" fontSize="13"
                    padding="10" />
                <Button text="Open Drawer" @tap="onOpenDrawerTap" margin="10"
                    style="horizontal-align: left" />
                <StackLayout>
                    <Label class="body m-20" :text="message" textWrap="true"></Label>
                    <Button class="btn btn-primary" text="Log out" @tap="logout"></Button>
                </StackLayout>
                <!-- <Image v-show="selectedTabview == 1" row="0" class="navIcon"
									:src="selectedTabview==1?'~/assets/images/category.png':''"/> -->
            </StackLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
import Login from "./Login";
    export default {
        name: 'Factura',
        data: () => {
            return {
                message: "You have successfully authenticated. This is where you build your core application functionality.",
                mainContentText: "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component" +
                    " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.",

                htmlString: '<span><h1>HtmlView demo in <font color="blue">NativeScript</font> App</h1></span>'
            }
        },
        methods: {
            logout() {
                this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            onOpenDrawerTap() {
                this.$refs.drawer.nativeView.showDrawer();
            },
            onCloseDrawerTap() {
                this.$refs.drawer.nativeView.closeDrawer();
            }
        }
    }
</script>
<style>
    .colorsandwich{
        background-color: #006eae;
    }
    .colorsandwichtab {
        background-color: #f5ad00;
    }
</style>