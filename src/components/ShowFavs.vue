<template>
    <div class="flex-column bg-green">
        <h2>Favs</h2>
        <div class="flex-column">
            <div class="flex">
                <a :href="favorite.favoriteLink">{{ favorite.name }}</a> - Location: {{ favorite.location }}
                <button class="borrar" @click="deleteFav"><img class="del-img"
                        src="../assets/icons/borrar.png"></button>
            </div>
        </div>
    </div>
</template>

<script>

import FavService from '@/services/fav.service';

export default {
    name: "ShowFavs",
    components: {},
    data() {
        return {
            
        }
    },
    props:{
        favorite: Object
    },
    methods: {
        displayFavs() {
            if (this.showFavs == false) {
                this.showFavs = true
            } else this.showFavs = false
        },
        deleteFav() {
            FavService.delete(this.favorite.idTreasure).then((response) => {
                alert(response.data)
                this.$router.push("/profile")
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    mounted() {

    
    },
    computed: {
        favoriteLink(){
            return `${window.location.origin}/treasure/${this.favorite.idTreasure}`
        }
    }

}

</script>

<style>

.flex-column{
    display: flex;
    flex-direction: column;
}

.bg-green{
    background-color: rgb(153, 226, 153);
}

.flex{
    display: flex;
}
</style>