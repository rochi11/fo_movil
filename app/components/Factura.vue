<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<!-- @loaded="onLoaded" -->
		<AbsoluteLayout>
			<GridLayout rows="auto,auto,auto,*,auto" columns="*,auto,auto,auto" width="100%" height="100%">
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
					<GridLayout top="50" row="1" rows="40,40,40,40,80" columns="20,*,*,20" width="100%">
						<SearchBar row="0" col="1" colSpan="2" hint="Ingrese RUC" v-model="receptor.nro" @textChange="getReceivers" @clear="clearItem" />
						<Label row="1" col="1" colSpan="2" :text="receptor.razonSocial" class="generalesRecector" />
						<Label row="2" col="1" colSpan="2" :text="receptor.direccionFiscal" class="generalesRecector" />
						<row="3" col="1" ListPicker  :items="listPickerCountries" v-model="selectedListPickerIndex" />
						<ListPicker row="3" col="1" :items="listaSeries" v-model="selectedListPickerIndex" class="separateSeries"/>
						<ListPicker row="3" col="2" :items="listaMoneda" v-model="selectedListPickerIndexMoneda" class="separateSeries"/>
						<!-- <FloatLabel placeholder="Fecha" row="4" col="2" /> -->
					</GridLayout>
					<GridLayout v-if="listarec" top="90" margin="10" width="100%" height="250" backgroundColor="white">
						<ListView for="(item, index) in listaReceptores" @itemTap="onItemTap" separatorColor="transparent">
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
					
					<Label row="1" col="2" :text="'fa-cart-plus' | fonticon" class="fa plus-icon addtamanio"
						textWrap="true" />
					<Label row="1" col="3" class="description-text-item" text=" + Items" @tap="showItem"></Label>

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
			<GridLayout v-if="agregarItems" top="40" width="100%" height="100%" backgroundColor="skyblue">
				<StackLayout class="main" verticalAlignment="top">
					<GridLayout margin="10" class="anim-cover" rows="auto" columns="*">
						<Label row="0" col="0" verticalAlignment="top"
							horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
							class="fa close" fontSize="24" />
					</GridLayout>
				
					<GridLayout marginTop="15" marginBottom="5" rows="auto,auto,auto,auto,auto,auto,auto,auto,auto" columns="30,auto,auto,30">
						
						<Label text="Cantidad:" row="0" col="1" />
						<TextField row="0" col="2" hint="Ingresa cantidad" />
						<Label text="Unidad Medida:" row="1" col="1" />
						<TextField row="1" col="2" hint="Unidad de Medida" />
						<Label text="Cod. Producto:" row="2" col="1" />
						<TextField row="2" col="2" hint="Cant. Producto" />
						<Label text="Descripción:" row="3" col="1" />
						<TextField row="3" col="2" hint="Descripción" />
						<Label text="Precio Unitario:" row="4" col="1" />
						<TextField row="4" col="2" hint="Precion Unitario" />
						<Label text="Valor Unitario:" row="5" col="1" />
						<TextField row="5" col="2" hint="Valor Unitario" />
						<Button row="6" col="2" :text="isValid ? 'Agregar' : 'Editar'" :isEnabled="!processing"
                   				 @tap="submit" class="btn btn-primary m-t-20"></Button>
					</GridLayout>
			
				</StackLayout>
			</GridLayout>
		</AbsoluteLayout>
</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import axios from "axios";
	import { isAndroid } from 'tns-core-modules/platform'
	import navBottom from "./custom/navBottom";
	import Item from "./custom/item";
	import Category from "./custom/category";
	// import ItemDetails from "./ItemDetails";
	const gestures = require("ui/gestures"); 
	const app = require("application");

export default {
    name: 'Factura',
	components: {
		navBottom,
		Item,
		Category
	},
	mounted () {
		this.getSeries()
	},
	data() {
		return {
			isValid: true,
			agregarItems: false,
			receptor: {
				nro:'',
				tipo:'6',
				razonSocial:'Razon Social',
				direccionFiscal: 'Direccion Fiscal'
			},
			listaSeries: [
                    "F001",
                    "F002",
                    "F003",
                    "F004",
			],
			listaMoneda: [
				"SOLES",
				"DOLARES"
			],
			selectedListPickerIndex: 0,
			selectedListPickerIndexMoneda: 0,
			serie: 0,
			listarec: false,
			listaReceptores: [],
			lastDelY: 0,
			headerCollapsed: false,
			selectedTab: 0,
			selectedTabview: 0
		};
	},
	methods: {
		close(){
			this.agregarItems = false
		},
		showItem(){
			this.agregarItems = true
		},
		getSeries(){
			axios
			.post('https://demofoapi2.facturaonline.pe/api/usuario/series/1', {
				token: 'd88088f265c71d5e79ce396857de1375f8943d82da92a762ab349d1811076156'
			})
			.then(response => (
				this.listaSeries = response.data.data
				// this.rolSeries = response.data.rol,
				// this.seriesCargadas = false
			))
			.catch(error => (
				console.log("")
				// this.seriesCargadas = false
			))
		},
		onItemTap(event){
			// console.log(this.listaReceptores[event.index].idReceptor),
			// this.alert(this.listaReceptores[event.index].idReceptor)
			this.receptor.tipo = this.listaReceptores[event.index].tipo,
			this.receptor.nro = this.listaReceptores[event.index].idReceptor,
			this.receptor.razonSocial = this.listaReceptores[event.index].razonSocial,
			this.receptor.direccionFiscal = this.listaReceptores[event.index].direccionReferencia,
			this.listarec = false
		},
		clearItem(){
			this.receptor.tipo = '6'
			this.receptor.nro = ''
			this.receptor.razonSocial = 'Razon Social'
			this.receptor.direccionFiscal = 'Direccion Fiscal'
			this.listarec = false
		},
		selectedIndexChanged(){
			
		},
		getReceivers(){
			this.listarec = true,
			console.log("yeeeeeee");
			if(this.receptor.nro.length > 3){
				axios
                .post('https://demofoapi2.facturaonline.pe/api/receptores/lista', 
                {
                    token: 'd88088f265c71d5e79ce396857de1375f8943d82da92a762ab349d1811076156',
					q: this.receptor.nro,
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
		},
		alert(message) {
                return alert({
                    title: "APP NAME",
                    okButtonText: "OK",
                    message: message
                });
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
.description-text-item {
        font-size: 20;
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
.generalesRecector{
	margin-top: 50px;
}
.separateSeries{
	padding: 50px;
}
.addtamanio{
	font-size: 25;
	color: orangered;
}
</style>