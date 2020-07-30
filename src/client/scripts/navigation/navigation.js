export class NavigationBar extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.open()
  }

  open() {
    this.classList.add('na')
    this.render()
  }

  render() {
    this.innerHTML = `
    <nav class="month-selector">
      <button class="left">
        <i class="icon">arrowtriangle_left_fill</i>
      </button>
      <div class="month">6월</div>
      <button class="right">
        <i class="icon">arrowtriangle_right_fill</i>
      </button>
    </nav>
    
    <nav class="page-selector">
      <button class="reports-page-btn selected">내역</button>
      <button class="calendar-page-btn">달력</button>
      <button class="statistics-page-btn">통계</button>
    </nav>
    `
  }

  // connectedCallback() {}
  // disconnectedCallback() {}
  // attributeChangedCallback(attrName, oldVal, newVal) {}
  // adaotedCallback() {}
}

// Element 정의하기
customElements.define('navigation-bar', NavigationBar)
