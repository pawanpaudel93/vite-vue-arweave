<template>
  <div class="container mx-auto">
    <p v-if="active">
      Your logged in account: <b>{{ account }}</b> <br />
      ChainId: <b>{{ chainId }}</b>
    </p>
    <p v-else>
      You are not logged in.
      <br />
      <button
        @click="connect"
        v-if="!active"
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Connect
      </button>
    </p>

    <web3-modal-vue
      ref="web3modal"
      :theme="theme"
      :provider-options="providerOptions"
      cache-provider
    />
  </div>
</template>

<script>
import { Web3ModalComponent as Web3ModalVue } from "web3modal-vue3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { mapGetters } from "vuex";

export default {
  components: {
    Web3ModalVue,
  },
  data() {
    return {
      theme: "light",
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "-",
          },
        },
      },
      number: 0,
      balance: 0,
    };
  },
  created() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.theme = "dark";
    }
  },
  mounted() {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit("setWeb3Modal", web3modal);
      if (web3modal.cachedProvider) {
        await this.$store.dispatch("connect");
      }
    });
  },
  methods: {
    connect() {
      this.$store.dispatch("connect");
    },
  },
  computed: {
    ...mapGetters({
      active: "getActive",
      account: "getAccount",
      chainId: "getChainId",
    }),
  },
};
</script>
