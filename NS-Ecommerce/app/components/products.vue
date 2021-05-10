<template>
    <StackLayout>
        <Label class="h2 p-10" textWrap="true"
            text="To add to cart, tap on a product" />

        <ListView for='product in products' @itemTap='onItemTap'
            height="100%">

            <v-template>

                <StackLayout>
                    <Label :text='product.title' />

                    <Image :src="product.img" width='650px' height='550px' />

                    <Label :text="`Location: ${product.location}`" />

                    <Label :text=" `Price: ${product.price}`" />

                    <Label :text="`Spaces: ${product.stock}`" />


                </StackLayout>

            </v-template>

        </ListView>


    </StackLayout>

</template>

<script>
    export default {
        data() {
            return {
                products: []
            };
        },

        created() {
            fetch("https://afterschoolactivities.herokuapp.com/collection/products")
                .then(res => res.json())
                .then(res => {
                    this.loadFunc(res);
                })
                .catch(e => {
                    console.log("Error calling API", e);
                });
        },

        methods: {
            onItemTap(event) {
                this.$emit("addProduct", event.item);
            },
            loadFunc(res) {
                for (var i = 0; i < res.length; i++) {
                    this.products.push(res[i]);
                }
            }
        }
    };
</script>