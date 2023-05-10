<template>
  <div class="flex-column">
    <h1>Treasure: PLACEHOLDER</h1>
    <form id="form" @submit.prevent="sendReview">
      <div id="imgDiv" class="image-review">
        <img id="preview" alt="preview" />
        <div class="review-image">
          <input id="image" name="add" type="file" @change="onFileUpload">
        </div>
      </div>
      <div class="data">
        <div class="rating">
          <label for="rating">Rating </label>
          <div class="rate-bar">
            <input type="range" min="0" max="5"  id="rating" name="rating" required v-model="review.rating">
            <p>{{ review.rating }}</p>
          </div>
        </div>
        <div class="opinion">
          <label for="opinion">Opinion </label>
          <textarea id="opinion" name="opinion" required v-model="review.opinion"></textarea>
        </div>
        <input v-if="id === ''" class="form-submit" type="submit" value="Add" />
        <button v-if="id !== ''" @click.prevent="updateReview"><img src="../assets/icons/edit.png" alt="edit-icon" />
        </button>
        <button v-if="id !== ''" @click.prevent="deleteReview"><img src="../assets/icons/borrar.png"
            alt="delete-icon" /></button>
      </div>

    </form>
  </div>
</template>

<script>
import ReviewService from "@/services/review.service";
import UserService from "@/services/user.service";

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
      }
    }
  },
  props: {
    idReview: String,
    idTreasure: String
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
        // console.log(reader.result)
      };
      // console.log(this.FILE)
      reader.readAsDataURL(this.FILE);
    },

    getImage(review) {

      document.getElementById("preview").src = ReviewService.getPicturePath(review.idTreasure, review.idReview)

    },

    sendReview() {

      const formData = new FormData()

      formData.append('image', this.FILE, this.FILE.name)
      formData.append('body', JSON.stringify(this.review))

      ReviewService.createNew(this.review.idTreasure, formData).then((response) => {
        console.log(response)
        this.$router.push(`/treasure/${this.review.idTreasure}`)
      }).catch((error) => {
        console.log(error)
      })

    },

    updateReview() {
      if (this.FILE === null) {
        ReviewService.getPicture(this.review.idTreasure, this.review.idReview).then((response) => {
          const bytes = new Uint8Array(response.data.length);
          for (var i = 0; i < response.data.length; i++) {
            bytes[i] = response.data.charCodeAt(i);
          }

          const blob = new Blob(bytes, { type: response.headers["content-type"] })
          this.FILE = new File([blob], this.review.photo, { type: response.headers["content-type"] })

          const formData = new FormData()

          formData.append('image', this.FILE, this.FILE.name)
          formData.append('body', JSON.stringify(this.review))

          ReviewService.update(this.review.idTreasure, this.review.idReview, formData).then((response) => {
            console.log(response)
            this.$router.push(`/treasure/${this.review.idTreasure}`)
          }).catch((error) => {
            console.log(error)
          });

        }).catch((error) => {
          console.log(error)
        });
      } else {

        const formData = new FormData()
        formData.append('image', this.FILE, this.FILE.name)
        formData.append('body', JSON.stringify(this.review))

        ReviewService.update(this.review.idTreasure, this.review.idReview, formData).then((response) => {
          console.log(response)
          this.$router.push(`/treasure/${this.review.idTreasure}`)
        }).catch((error) => {
          console.log(error)
        });

      }
    }
  },
  mounted() {
    console.log(this.$route.params)
    if (this.$route.params.idReview !== '') {
      ReviewService.getOneByTreasure(this.$route.params.idTreasure, this.$route.params.idReview).then((response) => {
        this.review = response.data
        console.log(response.data)
        UserService.getByNickname(JSON.parse(localStorage.getItem('user'))).then((response) => {
          if (this.review.idUser !== response.data.idUser) {
            localStorage.setItem('error', JSON.stringify("You have been a very bad boy"))
            this.$router.push("/error")
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    } else {
      document.getElementById('image').setAttribute('required', '')
      UserService.getByNickname(JSON.parse(localStorage.getItem('user'))).then((response) => {
        this.review.idUser = response.data.idUser
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
h1{
  margin-bottom: 5rem;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10rem;
  margin-top: 4rem;
}

#imgDiv {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 2rem;
}

#form {
  display: flex;
  justify-content: space-between;
}

.data {
  display: block;
  margin-left: 10rem;
}

.form-submit {
  margin-top: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.form-submit:hover {
  background-color: #3e8e41;
}

.rate-bar{
  display: flex;
  flex-direction: row;
}

.opinion label{
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
}

.rating{
  max-width: 250px;
  min-width: 250px;
}
.rating label{
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
}

.rating input{
  margin-left: 3rem;
}

.opinion {
  display: flex;
  flex-direction: column;
}

</style>