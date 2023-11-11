import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const dataImage = defineStore('dataImage', () => {
  const checkImage = localStorage.getItem('dataImage')
  console.log('checkImage : ', checkImage !== null)
  const image = checkImage !== null ? ref(JSON.parse(checkImage)) : ref(new Array())
  // const image = ref(new Array())
  const getImages = computed(() => {
    const getImages = localStorage.getItem('dataImage')
    if (dataImage !== null) {
      image.value = JSON.parse(getImages)
    }
    console.log('getimages : ', image.value)
    return image.value
  })

  const uploadImage = (newImage) => {
    console.log('image valule = ', image.value)
    if (image.value === null) {
      image.value = new Array(newImage)
    } else {
      image.value.push(newImage)
    }
    localStorage.setItem('dataImage', JSON.stringify(image.value))
  }

  return {
    image,
    getImages,
    uploadImage
  }
})
