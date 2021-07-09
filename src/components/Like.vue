<template>
  <div>
    <button-press v-if="!this.isFavorite" style="margin-top: 10px" v-on:click="Like(id)" color="cyan" size="l">Like</button-press>
    <button-press v-else style="margin-top: 10px" v-on:click="DisLike(id)" color="red" size="l">DisLike</button-press>
  </div>
</template>

<script>
export default {
    name: "LikeButton",
    data() {
        return {
            isFavorite: false
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        async Like() {
            try {
                const response = await this.axios.post(
                "http://localhost:3000/users/favoritePlayers",
                {
                    player_id: this.id,
                    type: this.type
                },
                    {withCredentials: true}
                );
                this.isFavorite = true;
                this.$root.store.setFavoItems([{targetID: this.id, type: this.type}], true);

            } catch(error) {
                window.alert('An Error been accur')
            }
        },
        isFavo() {
            this.isFavorite =  this.$root.store.isFavo(this.id, this.type);
        },
        async DisLike() {
            try {
                let details = JSON.stringify([this.id, this.type]);
                const response = await this.axios.delete(
                  `http://localhost:3000/users/deleteFavo/${details}`  
                );
                this.isFavorite = false;
                this.$root.store.removeSingleFavo(this.id, this.type);
            } catch (error) {
                window.alert('An Error been accur');
            }
        }
    },
    mounted() {
        this.isFavo();
    }
}
</script>

<style>

</style>