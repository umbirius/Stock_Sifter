class User {
    constructor(user) {
      this.name = user.name
      this.id = user.id
    }
  
    static setCurrentUser(user) {
      currentUser = user
    }
  
    static currentUser() {
      return currentUser
    }
  
    static createOrAccessUser() {
      let form = document.getElementById("user-sign-up-log-in")
      document.querySelector(".popup-user").style.display = "flex";
  
      document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".popup-user").style.display = "none";
      })
  
      form.addEventListener("submit", function (e) {
        e.preventDefault()
        e.stopImmediatePropagation()
        fetch('http://localhost:3000/users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(
            {
              user: {
                name: e.target.elements[0].value
              }
            }
          )
        })
          .then(response => {
            return response.json()
          })
          .then(user => {
            let newUser = new User(user)
            User.setCurrentUser(newUser)
            newUser.loadFilters()
            console.log(newUser)
            console.log(user)
            logInOrSignUp.style.display = "none";
            document.querySelector(".popup-user").style.display = "none";
            logOut.style.display = "flex"
            load.disabled = false 
            save.disabled = false
            deleteBtn.disabled = false
          })
          .then(() => {
            let div = document.querySelector("#user")
            div.innerHTML = `  Current User: ${currentUser.name}`
            form.reset()
          })
  
      })
  
  
  
  
    }
  
    static logOut() {
      let div = document.querySelector("#user")
      div.innerHTML = ""
      currentUser = undefined
      logInOrSignUp.style.display = "flex";
      logOut.style.display = "none"
      let loadOptions = document.querySelector("#load-filter")
      loadOptions.options.length = 0
      let option = document.createElement("option")
      loadOptions.appendChild(option)
      option.value = "none"
      option.text = "None"
      save.disabled = true
      deleteBtn.disabled = true
      load.disabled = true
      Filter.resetFilter()
      renderTableRows(stocks)
    }
  
    loadFilters() {
      fetch('http://localhost:3000/filters')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let filterSelection = document.getElementById("load-filter")
          let userFilters = data.data.filter(filter => filter.attributes.user_id === this.id)
          for (let filter of userFilters) {
            let option = document.createElement("option")
            option.value = filter.attributes.name
            option.text = filter.attributes.name
            option.setAttribute("id", filter.attributes.id)
            filterSelection.appendChild(option)
  
          }
          filterSelection.value = "none"
        })
    }
  }
  
  