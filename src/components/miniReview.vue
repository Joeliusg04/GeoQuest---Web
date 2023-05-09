<template>
    <div>
        <img :id="review.idReview">
        <p>{{ treasure.name }}</p>
    </div>
</template>

<script>
import treasureService from "@/services/treasure.service";
import UserService from "@/services/user.service";
import ReviewService from "@/services/review.service";

export default {
    name: 'MiniReview',
    data() {
        return {
            user: "",
            treasure: ""
        }
    },
    props: {
        review: Object,
    },
    mounted() {

        UserService.getById(this.review.idUser).then((response) => {

            this.user = response.data
            document.getElementById(this.review.idReview).setAttribute('src', require(`../assets/rating/rating_${this.review.rating}.png`))
            document.getElementById(`${this.review.idUser}$${this.review.idReview}`).setAttribute('src', ReviewService.getPicturePath(this.review.idTreasure, this.review.idReview))

        }).catch((error) => {
            console.log(error)
        });


        // TODO Acabar de carregar la imatge de la review (cal solucionar el tema imatges a FormulariTreasure tambe)
        /*    ReviewService.getPicture(this.review.idTreasure,this.review.idReview).then((response)=>{
              console.log(response)
                }
            ).catch((error)=>{
              console.log(error)
            })*/
        treasureService.getById(this.review.idTreasure).then((response) => {

            this.treasure = response.data
            

        }).catch((error) => {
            console.log(error)
        });
    },
    computed: {
        getId() {
            return this.review.idUser + "$" + this.review.idReview
        }
    }
}
</script>

<style scoped></style>