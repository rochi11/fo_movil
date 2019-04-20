<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<!-- @loaded="onLoaded" -->

		<GridLayout rows="auto,auto,auto,*,auto" columns="*,auto,auto,auto">

			<GridLayout row="0" ref="navStatusBar" class="navStatusBar" backgroundColor="#006dab" verticalAlignment="top" height="40"
			 width="100%" rows="auto" columns="*,auto,auto,auto">
				<Label col="0" row="0" text="Realizar Factura" class="status-title"></Label>
					<Image col="1" row="0" @tap="search" horizontalAlignment="right" class="status-img"
							src="~/assets/images/search.png" />
					<Image col="2" row="0" @tap="bell" horizontalAlignment="right" class="status-img"
							src="~/assets/images/bell.png" />
					<Image horizontalAlignment="right" stretch="aspectFill" col="3"
							row="0" class="status-profile" src="~/assets/images/me.png" />
			</GridLayout>

			<GridLayout row="1" rows="40,40,40,40,80" columns="20,*,*,20">
				<FloatLabel placeholder="RUC" row="0" col="1" colSpan="2" />
				<FloatLabel placeholder="Razon Social" row="1" col="1" colSpan="2" />
				<FloatLabel placeholder="Dirección Fiscal" row="2" col="1" colSpan="2" />
				<FloatLabel placeholder="Serie" row="3" col="1" />
				<FloatLabel placeholder="Moneda" row="3" col="2" />
				<FloatLabel placeholder="Fecha" row="4" col="2" />
			</GridLayout>
			<GridLayout width="90%" height="100" row="2" rows="40,60" columns="30,85,30,*,40,30" borderWidth="1" borderColor="#ccc" verticalAlignment="top">
				<Label row="0" col="2" :text="'fa-tags' | fonticon" class="fa description-icon"
					textWrap="true" /> 
				<Label row="0" col="3" margin="8" class="description-text" text="Productos y Servicios"
					textWrap="true" />
				<Button row="1" col="1" colSpan="4" height="30" margin="0" class="btn btn-primary" padding="0" text="Agregar Items" @tap="showItem(items[0])"></Button>
			</GridLayout>
			
			<StackLayout row="3">
				<ScrollView>
					<StackLayout verticalAlignment="top"
						horizontalAlignment="left">
						<Label row="0" col="2" colSpan="2" text="Totales" />
						<Label placeholder="IGV:" row="1" col="1" />
						<FloatLabel placeholder="monto igv" row="1" col="2" />
						<Label placeholder="Gravada:" row="2" col="1" />
						<FloatLabel placeholder="monto gravada" row="2" col="2" />
					</StackLayout>
				</ScrollView>
			</StackLayout>

			<navBottom row="4" />

		</GridLayout>
</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import { isIOS, isAndroid } from 'tns-core-modules/platform'
	import navBottom from "./custom/navBottom";
	import Item from "./custom/item";
	import Category from "./custom/category";
	import ItemDetails from "./ItemDetails";

	const gestures = require("ui/gestures"); 
	const app = require("application");

export default {
    name: 'Factura',
	components: {
		navBottom,
		Item,
		Category
	},
	computed: {
		itemsCategory(){
			return this.category.slice().reverse();
		}
	},

	mounted () {
		// SwissArmyKnife.setAndroidStatusBarColor("#b51213");
	},
	data() {
		return {
			lastDelY: 0,
			headerCollapsed: false,
			selectedTab: 0,
			selectedTabview: 0,
			items: [{
				name: "Manila Ultimate Tombstone Burger",
				category: "Burger",
				categoryTag: "#2D9CDB",
				price: "300.00",
				likes: 987,
				isLike: false,
				isFavorite: true,
				comments: 13,
				rating: "4.5",
				description: "a"
			}],
			category: [
			{
				cover: "~/assets/images/food/burger640.jpg",
				category: "BURGER",
				count: "13",
			},
			]
		};
	},
	methods: {
		search(){
			console.log('search')
		},
		bell(){
			console.log('bell')
		},
		showItem(payload) {
			this.$navigateTo(ItemDetails,{
				props: {
					item: payload
				},
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			})
		},
		
		popular() {
			this.selectedTabview = 0;
		},
		showCategory() {
			this.selectedTabview = 1;
		},
		showPromos() {
			this.selectedTabview = 2;
		},
		home() {
			this.selectedTab = 0;
		},
		cart() {
			this.selectedTab = 1;
		},
		history() {
			this.selectedTab = 2;
		},
		about() {
			this.selectedTab = 3;
		}
	}
};
</script>

<style>
.tabview.active {
	border-bottom-color: white;
	border-bottom-width: 3;
	margin: 0;
	height: 50;
}
.tabviewText {
	margin-top: 15;
	margin-bottom: 5;
	font-size: 13;
	color: #d8d2d2;
	horizontal-align: center;
}
.tabviewText.active {
	margin-top: 0;
	margin-bottom: 5;
	font-weight: bold;
	color: white;
	vertical-align: center;
}
.navTab {
	background-color: #bd2122;
}
.navTabview {
	background-color: blue;
}
.status-img {
	margin-top: 4;
	margin-right: 20;
	width: 30;
	height: 30;
}
.status-profile {
	border-width: 1;
	border-color: #ffffff;
	background-color: #f1ebeb;
	border-radius: 50%;
	margin-top: 4;
	margin-right: 15;
	width: 30;
	height: 30;
}
.status-title {
	color: white;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	horizontal-align: left;
	vertical-align: center;
}
.description-text {
        font-size: 14;
        font-weight: bold;
        color: black;
    }

    .description-icon {
        font-size: 16;
        font-weight: bold;
        color: #3e9edb;
        margin-right: 8;
        vertical-align: center;
	}
</style>