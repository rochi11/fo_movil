<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true" @loaded="onLoaded">
        <StackLayout class="main" verticalAlignment="top">
            <GridLayout class="anim-cover" rows="auto" columns="*">
                <Label row="0" col="0" verticalAlignment="top"
                    horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
                    class="fa close" fontSize="24" />
            </GridLayout>
        
            
                <GridLayout marginTop="15" marginBottom="5" rows="auto,auto,auto,auto,auto,auto,auto,auto" columns="30,auto,auto,30">
                    <Label row="0" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Cantidad" row="0" col="2" />
                    <Label row="1" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Unidad Medida" row="1" col="2" />
                    <Label row="2" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Cod. Producto" row="2" col="2" />
                    <Label row="3" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Descripción" row="3" col="2" />
                    <Label row="4" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Precio Unitario" row="4" col="2" />
                    <Label row="5" col="1" :text="'fa-angellist' | fonticon" class="fa description-icon"
                        textWrap="true" />
                    <FloatLabel placeholder="Valor Unitario" row="5" col="2" />
                </GridLayout>
    
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        props: ["item"],
        components: {},
        computed: {
            categoryIcon() {
                switch (this.item.category) {
                    case "Burger":
                        return "fa-cutlery";
                        break;
                    case "Beer":
                        return "fa-beer";
                        break;
                    case "Pancake":
                        return "fa-coffee";
                        break;
                    case "Cake":
                        return "fa-birthday-cake";
                        break;
                    default:
                        return "fa-fire";
                        break;
                }
            }
        },
        created() {
            this.images = [{
                    src: "~/assets/images/food/pancake640.jpg"
                },
                {
                    src: "~/assets/images/food/pancake640.jpg"
                },
                {
                    src: "~/assets/images/food/pancake640.jpg"
                },
                {
                    src: "~/assets/images/food/pancake640.jpg"
                }
            ];
            this.isLike = this.item.isLike;
            this.isHeart = this.item.isFavorite;
        },
        mounted() {},
        methods: {
            onLoaded() {
                // this.animateFrom()
            },
            animateFrom() {
                let cover = this.$refs.cover.nativeView;
                let images = this.$refs.images.nativeView;
                let page = this.$refs.page.nativeView;

                images.translateY = 200;
                images.opacity = 0;
                images.scaleX = 0;
                cover.scaleY = 0;

                cover.translateY = 200;
                cover.opacity = 0;
                cover.scaleX = 0;
                cover.scaleY = 0;

                (page.backgroundColor = "#d4d6d8"), this.animateTo();
            },
            animateTo() {
                let cover = this.$refs.cover.nativeView;
                let images = this.$refs.images.nativeView;
                let page = this.$refs.page.nativeView;

                // images.animate({
                // 	scale: { x: 1, y: 1 } ,
                // 	translate: { x: 0, y: 0},
                // 	opacity: 1,
                // 	duration: 1000,
                // 	delay: 150
                // });

                cover.animate({
                    scale: {
                        x: 0.5,
                        y: 0.5
                    },
                    opacity: 1,
                    duration: 1000,
                    delay: 0
                });
                cover.animate({
                    translate: {
                        x: 0,
                        y: 0
                    },
                    scale: {
                        x: 1,
                        y: 1
                    },
                    duration: 1000,
                    delay: 1000
                });

                page.animate({
                    backgroundColor: "#ffffff",
                    duration: 2000,
                    delay: 0
                });
            },
            close() {
                this.$navigateBack();
            },
            animateLike() {
                let imgLogo = this.$refs.like.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 100,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            animateFavorite() {
                let imgLogo = this.$refs.favorite.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 50,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            toggleLike() {
                this.animateLike();
                this.isLike = !this.isLike;
                if (this.isLike) {
                    this.item.likes += 1;
                } else {
                    this.item.likes -= 1;
                }
            },
            toggleHeart() {
                this.animateFavorite();
                this.isHeart = !this.isHeart;
            },
            onClickButton() {
                this.$emit("clicked");
            }
        },
        data() {
            return {
                images: null,
                isLike: false,
                isHeart: false,
                description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nNesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi!
				\nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
				\nNesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi!	`
            };
        }
    };
</script>
<style scoped>
    .close {
        font-size: 20;
        color: rgb(226, 229, 229);
        margin: 15 0 0 15;
    }

    TextView {
        border-width: 1;
        border-color: #ffffff;
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

    .description-value {
        font-size: 14;
        color: black;
    }

    .rate {
        padding-top: 3;
        margin: 0;
        color: #FFE900;
        font-size: 18;
    }

    .rating-value {
        margin-left: 5;
    }

    .liked-active {
        color: #4080FF;
    }

    .heart-active {
        color: #b51213;
    }

    .default {
        color: #828282;
    }

    .layout {
        vertical-align: bottom;
        color: #828282;
        font-size: 14;
        height: 30;
        padding: 5 0 5 0;
    }

    .like-icon {
        vertical-align: bottom;
        height: 30;
        font-size: 16;
        margin-right: 2;
        padding: 5 5 5 5;
    }

    .item-name {
        font-size: 14;
        font-weight: bold;
    }

    .item-category {
        font-size: 14;
        color: #828282;
    }

    .category-icon {
        text-align: center;
        padding-top: 5;
        color: white;
        vertical-align: center;
        font-size: 25;
        border-width: 1;
        border-color: #ffffff;
        border-radius: 50%;
        margin-top: 4;
        margin-right: 15;
        width: 40;
        height: 40;
    }

    .content {
        margin-left: 16;
        margin-right: 16;
        margin-bottom: 3;
        /* margin-top: 16; */
    }

    .card-img {
        width: 100%;
        height: 250;
        margin-bottom: 5;
    }

    .card-img-thumb {
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 130;
        height: 70;
        margin-left: 5;
    }

    .line {
        height: 0.5;
        border: none;
        color: #e0e0e0;
        background-color: #e0e0e0;
    }

    .lineBreak {
        height: 0.5;
        border: none;
        color: #e0e0e0;
        background-color: #e0e0e0;
    }

    .anim-page {
        background-color: #d4d6d8;
        animation-name: key-page;
        animation-duration: 2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-page {
        0% {
            background-color: #dadada;
        }

        20% {
            background-color: #dbd2d5;
        }

        100% {
            background-color: white;
        }
    }

    .anim-cover {
        opacity: 0;
        animation-name: key-cover;
        animation-duration: 1;
        animation-delay: 0.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-cover {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-images {
        opacity: 0;
        animation-name: key-images;
        animation-duration: 1;
        animation-delay: 0.7;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-images {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-itemInfo {
        opacity: 0;
        animation-name: key-itemInfo;
        animation-duration: 1;
        animation-delay: 1.2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-itemInfo {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-likes {
        opacity: 0;
        animation-name: key-likes;
        animation-duration: 1;
        animation-delay: 1.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-likes {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-content {
        opacity: 0;
        animation-name: key-content;
        animation-duration: 1;
        animation-delay: 1.8;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-content {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }
</style>