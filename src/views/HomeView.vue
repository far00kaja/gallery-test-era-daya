<template>
  <main>
    <button class="px-5 py-3 bg-blue-400" @click="hideFormUpload(!isHideFormUpload)">
      Upload File
    </button>
    <div
      :class="isHideFormUpload ? 'hidden' : 'fixed'"
      class="bg-black w-full h-screen top-0 bg-opacity-50"
    >
      <div class="h-screen flex items-center justify-center">
        <form
          id="upload-image"
          class="opacity-100 text-black bg-gray-200 h-96 p-2 rounded-lg"
          @submit="submit($event)"
        >
          <div class="text-center flex justify-end">
            <button
              class="text-white bg-gray-700 p-2 left-9 font-semibold"
              @click="hideFormUpload(true)"
              type="button"
            >
              Close
            </button>
          </div>
          <div
            class="mt-2 p-2"
            :class="
              getAlert === ''
                ? 'hidden'
                : getAlertType === 'failed'
                ? 'bg-red-500 text-red-50'
                : 'bg-blue-500 text-blue-50'
            "
          >
            {{ alert }}
          </div>
          <div class="flex flex-row bg-gray-200 pt-10 text-center">
            <input
              type="file"
              name="uploadfile"
              id="uploadfile"
              @change="uploadFile($event.target)"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              class="px-5 py-3 bg-blue-200 disabled:bg-blue-50 flex"
              :disabled="isLoading"
              type="submit"
              @click="submit($event)"
            >
              <Loading :class="isLoading ? '' : 'hidden'" /><span>Upload File</span>
            </button>
          </div>
          <div class="flex flex-col">
            <span>preview image :</span>
            <img
              :src="imagePreview"
              class="justify-center self-center object-fit w-max h-32 pt-3"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="flex flex-wrap gap-5 justify-center">
      <div v-for="(item, index) in store.getImages" :key="index">
        <div class="max-w-sm bg-gray-200 overflow-hidden shadow-sm">
          <img class="w-full" :src="item.display_url ? item.display_url : logo" alt="sunset" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ item.title }}</div>
            <p class="text-gray-700 text-base">size: {{ item.size }}</p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #tags
            </span>
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #tags
            </span>
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #tags
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, computed } from 'vue'
import { postImage } from '../api/api'
import logo from '@/assets/logo.svg'
import Loading from '@/components/Loading.vue'
import { dataImage } from '@/stores/index'

const store = dataImage()

let alert = ref('')
let isHideFormUpload = ref(true)
let isLoading = ref(false)
let image = ref(null)
let imagePreview = ref(logo)
let alertType = ref('')
const uploadFile = (event) => {
  console.log('event')
  console.log(event)
  image.value = event
  imagePreview.value = URL.createObjectURL(event.files[0])
}

const hideFormUpload = (value) => {
  isHideFormUpload.value = value
}
const getAlert = computed(() => {
  return alert.value
})
const getAlertType = computed(() => {
  return alertType.value
})

const submit = async (event) => {
  isLoading.value = true
  if (image.value.files[0].size > 1024 * 1024) {
    alert.value = 'gambar harus kurang dari 2mb'
    alertType = 'failed'
    setTimeout(() => {
      alert.value = ''
    }, 3000)

    return false
  }
  event.preventDefault()
  let formData = new FormData()
  formData.append('image', image.value.files[0])
  console.log('test : ', image.value)
  let request = await postImage(formData)
  isLoading.value = false
  console.log('request : ', request)
  console.log('request status: ', request.status)
  if (request.status === 200) {
    console.log('masuk data : ', request.data.data)
    store.uploadImage(request.data.data)
    alert.value = 'Gambar berhasil diupload'
    alertType.value = 'success'
  } else {
    alert.value = 'upload error'
    alertType.value = 'failed'
  }
  setTimeout(() => {
    alert.value = ''
  }, 3000)
}
</script>
