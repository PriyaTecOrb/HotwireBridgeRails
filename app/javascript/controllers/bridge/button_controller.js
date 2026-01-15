import { BridgeComponent } from "@hotwired/hotwire-native-bridge"

export default class extends BridgeComponent {
  static component = "button"
  connect() {
    super.connect()
    const element = this.bridgeElement
    const title = element.bridgeAttribute("title")
    console.log("🔵 JS: title =", title)
    this.send("connect", {title}, () => {
        console.log("Button connected with title: ", title)
      this.element.click()
    })
  }
}