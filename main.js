Vue.config.devtools = true

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <ul>
    <li v-for="detail in details">{{ detail }} </li>
  </ul>
  `
})

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
  <div class="product-image">
    <img :src="image" />
  </div>

  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inStock">In Stock</p>
    <p v-else>Out of Stock</p>
    <p>{{ sale }}</p>
    <p>Shipping: {{ shipping }}</p>

    <product-details :details="details"></product-details>

    <div
      class="color-box"
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      :style="{ backgroundColor: variant.variantColor }"
      @mouseover="updateProduct(index)"
    ></div>

    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
    >
      Add to cart
    </button>
    <button @click="removeFromCart">
      Remove from cart
    </button>

    
  </div>
</div>
`,
  data() {
    return {
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
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      )
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
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return "$3 MXN"
    }
  }
})

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1)
        }
      }
    }
  }
})
