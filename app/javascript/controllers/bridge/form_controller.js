import { BridgeComponent } from "@hotwired/hotwire-native-bridge"

export default class extends BridgeComponent {
  static component = "native-form"
  static values = { type: String }

  connect() {
    super.connect()
		if (!this.isNative()) return
		this.hideWebForm()
    this.showNativeForm()
  }

	isNative() {
    return !!window.HotwireNative
  }

	hideWebForm() {
    const form = this.element.querySelector("form")
    if (form) form.style.display = "none"
  }

	showNativeForm(){
    const form = this.element.querySelector('form')
		if (!form) return
		if (this.typeValue === "edit") {
      this.showEditForm(form)
    } else if (this.typeValue === "signup") {
      this.showSignupForm(form)
    }
	}

	showEditForm(form){
		this.send("showNativeForm", {
      fields: [
        { name: "username", type: "text", label: "Username" },
        { name: "email", type: "email", label: "Email" }
      ]
    }, (result) => {
      // Native sent back the form data!
      console.log("Native form submitted:", result)
      
      if (result.data.submitted) {
        // Fill web form with native form data
        form.elements["user[username]"].value = result.data.data.username
        form.elements["user[email]"].value = result.data.data.email
        
        // Submit the web form
				console.log("Submitting web form")
        form.submit()
      }
    })
	}

  showSignupForm(form){
		this.send("showSignupForm", {
      fields: [
        { name: "username", type: "text", label: "Username" },
        { name: "email", type: "email", label: "Email" },
				{ name: "password", type: "password", label: "Password" }
      ]
    }, (result) => {
      // Native sent back the form data!
      if (result.data.submitted) {
        // Fill web form with native form data
        form.elements["user[username]"].value = result.data.data.username
        form.elements["user[email]"].value = result.data.data.email
				form.elements["user[password]"].value = result.data.data.password
      
        form.submit()
      }
    })
  }

	// // Native can also call methods on the JavaScript side
	updateProgress(percent) {
		console.log("Native says upload is", percent, "% complete")
		this.element.querySelector('.progress').style.width = percent + '%'
	}
}
