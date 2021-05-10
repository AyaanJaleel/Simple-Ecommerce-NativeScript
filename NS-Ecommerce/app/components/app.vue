<template>
    <Page style="background-color: goldenrod">
        <ActionBar title="Ayaan's After School Activities" />
        <Label text="Extra classes" class="h1" />

        <TabView androidTabsPosition="bottom">
            <TabViewItem title="Lesson List" class="h2 text-capitalize">
                <products @addProduct="addToCart" />
            </TabViewItem>
            <TabViewItem title="Check Out" class="h2 text-capitalize">
                <checkout :cart='cart' @removeProduct='removeFromCart' />
            </TabViewItem>
        </TabView>
    </Page>
</template>



<script>
    import products from "./products";
    import checkout from "./checkout";

    export default {
        data() {
            return {
                cart: []
            };
        },

        components: {
            products,
            checkout
        },

        methods: {
            addToCart(product) {
                if (product.stock < 1) {
                    alert("Product out of stock!");
                } else {
                    if (this.cart.includes(product)) {
                        product.inCart++;
                        product.stock--;
                    } else {
                        this.cart.push(product);
                        product.stock--;
                        product.inCart++;
                    }
                }
            },
            removeFromCart(item) {
                var indexOfItem = this.cart.indexOf(item);
                if (item.inCart == 1) {
                    item.inCart--;
                    item.stock++;
                    this.cart.splice(indexOfItem, 1);
                } else {
                    item.inCart--;
                    item.stock++;
                }
            }
        }
    };
</script>



<style scoped>

</style>