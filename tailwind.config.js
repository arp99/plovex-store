module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        primary : {
          DEFAULT : '#231f20',
          ligter : '#231f20cc',
          darker : '#1c1b1b'
        },
        secondary : '#fff',
        tertiary : '#6b6969',
      },
      fontFamily : {
        helvetica : ['Helvetica', 'Helvetica Neue', 'Arial', 'Lucida Grande', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
