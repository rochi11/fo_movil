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

			<AbsoluteLayout>
				<GridLayout top="50" row="1" rows="40,40,40,40,40,80" columns="20,*,*,20">
					<SearchBar row="0" col="1" colSpan="2" hint="Ingrese RUC" :text="searchPhrase" v-model="ruc" @textChange="getReceivers" @submit="onSubmit" />
					<FloatLabel placeholder="Razon Social" row="2" col="1" colSpan="2" />
					<FloatLabel placeholder="Dirección Fiscal" row="3" col="1" colSpan="2" />
					<FloatLabel placeholder="Serie" row="4" col="1" />
					<FloatLabel placeholder="Moneda" row="5" col="2" />
					<FloatLabel placeholder="Fecha" row="6" col="2" />
				</GridLayout>
				<GridLayout v-if="listarec" top="90" margin="10" width="100%" height="250" backgroundColor="white">
					<ListView for="item in listaReceptores" @itemTap="onItemTap">
						<v-template>
							<Label :text="item.razonSocial" />
						</v-template>
					</ListView>
				</GridLayout>
			</AbsoluteLayout>
			<GridLayout width="90%" height="100" row="2" rows="40,60" columns="30,85,30,*,40,30" borderWidth="1" borderColor="#ccc" verticalAlignment="top">
				<Label row="0" col="2" :text="'fa-tags' | fonticon" class="fa description-icon" 
					textWrap="true" /> 
				<Label row="0" col="3" margin="8" class="description-text" text="Productos y Servicios" 
					textWrap="true" />
				<!-- <Button row="1" col="1" colSpan="4" height="30" margin="0" class="btn btn-primary" padding="0" text="Agregar Items" @tap="showItem(items[0])"></Button>
				 -->
				 
				<Label row="1" col="2" :text="'fa-plus' | fonticon" class="fa plus-icon"
					textWrap="true" />
				<Label row="1" col="3" class="description-text" text="Agregar Items" @tap="showItem(items[0])"></Label>

			</GridLayout>
			
			<GridLayout marginTop="15" marginBottom="5" row="3" rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="30,auto,auto,30">
                    <Label row="0" col="2" text="Totales" class="description-text"></Label>
					
                    <Label row="1" col="2" text="Total IGV:"></Label>
                    
                    <Label row="2" col="2" text="Total Gravada:"></Label>
                    
                    <Label row="3" col="2" text="Total Exonerada:"></Label>
                    
                    <Label row="4" col="2" text="Total Inafecta:"></Label>
                    
                    <Label row="5" col="2" text="Importe Total:"></Label>
                </GridLayout>

			<navBottom row="4" />

		</GridLayout>
</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import axios from "axios";
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
			ruc: '',
			listarec: false,
			listaReceptores: [],
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
		onItemTap(){

		},
		getReceivers(){
			this.listarec = true,
			console.log("yeeeeeee");
			if(this.ruc.length > 3){
				axios
                .post('https://demofoapi2.facturaonline.pe/api/receptores/lista', 
                {
                    token: '1eace214726acbd1d84dee38fd912857b7b37075c382545d5787e873efb41853',
					q: this.ruc,
					tipoRec: '6'
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers':'*',
                        'cache-control': 'no-cache'
                    }
                })
                .then(response => (
                   this.listaReceptores = response.data,
					console.log(this.listaReceptores)
                  
                ))
                .catch(error => (
                    // this.alert(error.response.data)
                      this.alert('error') 
                ));
			}
		},
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