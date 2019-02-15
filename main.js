var app = new Vue({
  el: "#app",
  data: {
    brand: "Vue Mastery",
    product: "socks",
    selectedVariant: 0,
    details: ["100% real", "80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./greenSocks.jpeg",
        variantQuantity: 10,
        onSale: true
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./blueSocks.jpeg",
        variantQuantity: 0,
        onSale: false
      }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + "" + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale!"
      } else {
        return this.brand + " " + this.product + " are not on sale."
      }
    }
  }
})
