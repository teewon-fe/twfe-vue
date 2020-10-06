
let PDF = null

import(/* webpackChunkName: "pdf" */ 'html2canvas')
  .then(html2canvas => {
    window.html2canvas = html2canvas
  })

import(/* webpackChunkName: "pdf" */ 'jspdf')
  .then(jsPDF => {
    PDF = jsPDF
  })

export default {
  name: 'tw-html-download',

  props: {
    selector: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      default: 'doc'
    },

    // image, pdf
    fileType: {
      type: String,
      default: 'image'
    },

    autoDownload: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    init () {
      let vm = this

      if (this.$el) {
        if (this.autoDownload) {
          this.$el.addEventListener('click', function () {
            vm.download()
          })
        }
      } else {
        throw new Error('The root element is missing.')
      }
    },

    download () {
      let vm = this

      if (PDF) {
        let docEl = document.querySelector(this.selector)

        if (docEl) {
          window.html2canvas(docEl).then(canvas => {
            let image = canvas.toDataURL('image/png')

            if (image === 'data:,') {
              throw new Error('Canvas data is not a valid base64-String.')
            }

            if (this.fileType === 'image') {
              var a = document.createElement('a')
              a.download = `${vm.fileName}.png`

              if (canvas.msToBlob) {
                if (window.navigator.msSaveBlob) {
                  // fix ie10, ie11
                  window.navigator.msSaveBlob(canvas.msToBlob(), `${vm.fileName}.png`)
                } else {
                  // fix edge
                  a.href = URL.createObjectURL(canvas.msToBlob())
                  a.click()
                  vm.$emit('done')
                }
              } else {
                canvas.toBlob(b => {
                  a.href = URL.createObjectURL(b)
                  a.click()
                  vm.$emit('done')
                })
              }
            } else if (this.fileType === 'pdf') {
              let width = docEl.scrollWidth
              let height = docEl.scrollHeight

              let pdf = new PDF({
                orientation: width > height ? 'landscape' : 'portrait',
                unit: 'px',
                format: [width, height]
              })

              let w = pdf.internal.pageSize.getWidth()
              let h = pdf.internal.pageSize.getHeight()
              pdf.addImage(image, 'PNG', 0, 0, w, h)
              pdf.save(`${vm.fileName}.pdf`, { returnPromise: true }).then(() => {
                vm.$emit('done')
              })
            }
          })
        }
      }
    }
  },

  mounted () {
    this.init()
  },

  render () {
    return this.$slots.default
  }
}
