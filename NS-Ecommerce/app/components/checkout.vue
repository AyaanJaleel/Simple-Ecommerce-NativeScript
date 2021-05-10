<template>
    <StackLayout>
        <Label class="h2 text-center" text="Shopping Cart" />
        <Label class="h2 text-center" text="(Tap a product to remove it)" />
        <TextField hint='Name' v-model='orders.name' />
        <TextField hint='Address' v-model='orders.address' />
        <Button @tap='submitOrder' text='Submit Order' />
        <ListView style="height:100%" for="product in cart"
            @itemTap="onItemTap">
            <v-template>
                <StackLayout>
                    <Label :text="product.title" />
                    <Label :text=" `price: ${product.price}`" />
                    <Label :text=" `Quantity: ${product.inCart}`" />
                </StackLayout>
            </v-template>
        </ListView>
    </StackLayout>
</template>

<script>
    export default {
        props: ["cart"],
        data() {
            return {
                orders: {
                    name: "",
                    address: "",
                    prods: []
                }
            };
        },
        methods: {
            onItemTap(event) {
                this.$emit("removeProduct", event.item);
            },
            updateStock() {
                fetch(
                        "https://afterschoolactivities.herokuapp.com/collection/products", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(this.orders)
                        }
                    )
                    .then(response => response.json())
                    .catch(function(error) {
                        console.log(error);
                        alert("Looks like there was a problem: \n",
                        error);
                    });
            },
            submitOrder() {
                if (this.cart.length === 0) {
                    alert("Cart has 0 items.");
                } else {
                    if (this.orders.name == "" || this.orders.address == "") {
                        alert("Please fill in your details");
                    } else {
                        for (var i = 0; i < this.cart.length; i++) {
                            var prodSchema = {
                                id: this.cart[i].id,
                                space: this.cart[i].inCart
                            };
                            this.orders.prods.push(prodSchema);
                        }
                        this.updateStock();
                        fetch(
                                "https://afterschoolactivities.herokuapp.com/collection/Order", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(this.orders)
                                }
                            )
                            .then(response => response.json())
                            .catch(function(error) {
                                console.log(error);
                                alert("Looks like there was a problem: \n",
                                    error);
                            });
                        alert("Order placed successfuly, " + this.orders
                        .name);
                        this.orders.name = "";
                        this.orders.address = "";
                        this.cart = [];
                    }
                }
            }
        }
    };
</script>