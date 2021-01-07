module.exports = {
  age: function(timestamp) {
    const today = new Date() //Pegando a DATA atual
    const birthDay = new Date(timestamp) // Pegando a data de aniversário

    let age = today.getFullYear() - birthDay.getFullYear() // 2020 - 2000 = 20

    const month = today.getMonth() - birthDay.getMonth() // MÊS = 12 - 6 = 6

    if(month < 0 || month == 0 && today.getDate() < birthDay.getDate()) {
      age -= 1
    }

    return age
  },

  graduation: function(education) {
    // education = VALOR DIGITADO PELO USUÁRIO ex: medio, superior, mestrado, doutorado
    return (education == "medio") ? "Ensino Médio Completo"
    : (education == "superior") ? "Ensino Superior Completo"
    : (education == "mestrado") ? "Mestrado"
    : "Doutorado"
  },

  date: function(timestamp) {
    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
  }
}