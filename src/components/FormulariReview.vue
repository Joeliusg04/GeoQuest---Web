<template>
  <div class="flex-column">
    <h1>{{ treasure.name }}</h1>
    <form id="form" @submit.prevent="sendReview">
      <div id="imgDiv" class="image-review">
        <img id="preview" alt="preview"/>
        <div class="review-image">
          <input id="image" name="add" type="file" @change="onFileUpload">
        </div>
      </div>
      <div class="data">
        <!-- <div class="rate">
          <input type="radio" id="star5" name="rate" value="5"/>
          <label for="star5" title="5">5 stars</label>
          <input type="radio" id="star4" name="rate" value="4"/>
          <label for="star4" title="4">4 stars</label>
          <input type="radio" id="star3" name="rate" value="3"/>
          <label for="star3" title="3">3 stars</label>
          <input type="radio" id="star2" name="rate" value="2"/>
          <label for="star2" title="2">2 stars</label>
          <input type="radio" id="star1" name="rate" value="1"/>
          <label for="star1" title="1">1 star</label>
        </div> -->
        <star-rating v-model:rating="review.rating"/>
        <div class="opinion">
          <label class="title" for="opinion">Opinion </label>
          <textarea id="opinion" name="opinion" required v-model="review.opinion"></textarea>
          <div class="completed"><input type="checkbox" id="solved" name="completed" value="true"><label
              for="completed">Mark as
            completed</label></div>
        </div>
        <input v-if="id === ''" class="form-submit" type="submit" value="Add"/>
        <img class="buttonimage" v-if="id !== ''" @click.prevent="updateReview" src="../assets/icons/edit.png"
             alt="edit-icon"/>

        <img class="buttonimage" v-if="id !== ''" @click.prevent="deleteReview" src="../assets/icons/borrar.png"
             alt="delete-icon"/>
      </div>

    </form>
  </div>
</template>

<script>
import ReviewService from "@/services/review.service";
import UserService from "@/services/user.service";
import TreasureService from "@/services/treasure.service";
import StarRating from 'vue-star-rating';

export default {
  name: "FormulariReview",
  data() {
    return {
      FILE: null,
      review: {
        idTreasure: this.$route.params.idTreasure,
        idUser: "",
        opinion: "",
        rating: 0,
        photo: "",
      },
      treasure: {
        name: ""
      }
    }
  },
  props: {
    idReview: String,
    idTreasure: String
  },
  components: {
    StarRating
  },
  computed: {
    newReview() {
      return (this.$route.params.idReview === undefined || this.$route.params.idReview === '')
    },
    id() {
      return (this.$route.params.idReview)
    }
  },
  methods: {
    onFileUpload(event) {
      this.FILE = event.target.files[0]
      this.review.photo = this.FILE.name
      this.loadPreview()
    },
    loadPreview() {
      const reader = new FileReader();
      reader.onload = () => {
        document.getElementById("preview").src = reader.result;
      };
      reader.readAsDataURL(this.FILE);
    },

    getImage(review) {

      document.getElementById("preview").src = ReviewService.getPicturePath(review.idTreasure, review.idReview)

    },

    sendReview() {

      const formData = new FormData()

      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.review))

      ReviewService.createNew(this.review.idTreasure, formData).then(() => {
        this.$router.push(`/treasure/${this.review.idTreasure}`)
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.setItem('error', JSON.stringify("Unauthorized action"))
          this.$router.push("/error")
        }
      })

    },

    updateReview() {


      if (this.FILE === null) {
        ReviewService.getPicture(this.review.idTreasure, this.review.idReview).then((response) => {
          const bytes = new Uint8Array(response.data.length);
          for (var i = 0; i < response.data.length; i++) {
            bytes[i] = response.data.charCodeAt(i);
          }

          const blob = new Blob(bytes, {type: response.headers["content-type"]})
          this.FILE = new File([blob], this.review.photo, {type: response.headers["content-type"]})

          const formData = new FormData()

          formData.append('image', this.FILE, this.FILE.name)
          formData.append('body', JSON.stringify(this.review))

          ReviewService.update(this.review.idTreasure, this.review.idReview, formData).then(() => {
            this.$router.push(`/treasure/${this.review.idTreasure}`)
          }).catch(() => {
            localStorage.setItem('error', JSON.stringify("Error when updating review"))
            this.$router.push("/error")
          });
        }).catch(() => {
          localStorage.setItem('error', JSON.stringify("Error when getting review picture"))
          this.$router.push("/error")
        });
      } else {

        const formData = new FormData()
        formData.append('image', this.FILE, this.FILE.name)
        formData.append('body', JSON.stringify(this.review))

        ReviewService.update(this.review.idTreasure, this.review.idReview, formData).then(() => {
          this.$router.push(`/treasure/${this.review.idTreasure}`)
        }).catch(() => {
          localStorage.setItem('error', JSON.stringify("Error when updating review"))
          this.$router.push("/error")
        });

      }
    },
    deleteReview() {
      ReviewService.deleteByTreasure(this.$route.params.idTreasure, this.$route.params.idReview).then(() => {
        window.location.href = "/profile"
      }).catch(() => {
        localStorage.setItem('error', JSON.stringify("Error when deleting review"))
        this.$router.push("/error")
      })

    }
  },
  mounted() {
    if (this.$route.params.idReview !== '') {
      ReviewService.getOneByTreasure(this.$route.params.idTreasure, this.$route.params.idReview).then((response) => {
        this.review = response.data
        this.getImage(response.data)

        UserService.getCurrentUsername().then((response) => {
          UserService.getByNickname(response.data).then((response) => {
            if (this.review.idUser !== response.data.idUser) {
              localStorage.setItem('error', JSON.stringify("You have been a very bad boy"))
              this.$router.push("/error")
            }
          }).catch(() => {

          });
        }).catch(() => {
          localStorage.removeItem('token')
          this.$router.push("/login")
        });
      }).catch(() => {
        localStorage.setItem('error', JSON.stringify("Error when finding treasure"))
        this.$router.push("/error")

      });
    } else {
      this.$router.push(`/treasure/${this.$route.params.idTreasure}`);
    }

    TreasureService.getById(this.$route.params.idTreasure).then((response) => {
      this.treasure = response.data
    }).catch((error) => {
      if (error.response.status === 401) {
        localStorage.setItem('error', JSON.stringify("Unauthorized action"))
        this.$router.push("/error")
      }
      if (error.response.status === 404) {
        localStorage.setItem('error', JSON.stringify("Treasure not found"))
        this.$router.push("/error")
      }
    });
  }
}
</script>

<style scoped>
template {
  margin: 0;
  padding: 0;
}
#preview{
  height: 200px;
  width: 200px;
}
.flex-column {
  display: flex;
  margin: 4rem 5rem 10rem 5rem;
  flex-direction: column;
  align-items: center;
}

.buttonimage {
  height: 50px;
  width: 50px;
  cursor: pointer;
}

#form {
  display: flex;
  justify-content: space-around;
  width: 80%;
  height: 100%;
}

#imgDiv {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 2rem;
}

.title {
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;

}

.completed {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#preview {
  border: 1px solid black;
  border-radius: 50px;
  margin-bottom: 1rem;
}

#image {
  border: 1px solid black;
}

h1 {
  margin-bottom: 5rem;
}


.rate {
  justify-content: center;
  align-items: center;
  float: left;
  height: 46px;
  padding: 0 10px;
  margin-bottom: 2rem;
}

.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}

.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}

.rate:not(:checked) > label:before {
  content: '★ ';
}

.rate > input:checked ~ label {
  color: #ffc700;
}

.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}

.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>