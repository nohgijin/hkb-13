import { generateElement } from '@/client/utils/htmlGenerator'
import { hkbModel } from '@/client/models/hkbModel'

export class Settings {
  constructor() {
    this.$root = generateElement(`<main class="settings-page"></main>`)

    hkbModel.subscribe(this.render.bind(this))
  }

  generateProfileSectionElm({ profile, email, name }) {
    const profileSection = generateElement(`
    <section class="profiles">
      <div class="profile-header">
        <div class=""title">Profile</div>
      </div>
      <div class="profile-body">
        <div class="profile-image">
          ${
            profile
              ? `<img src=${profile} alt="" />`
              : `<i class="icon">person_crop_circle</i>`
          }
        </div>
        <div class="profile-content">
          <div class="email"></div>
          <div class="name">한규현</div>
        </div>
      </div>
    </section>
  `)

    return profileSection
  }

  generateSettingSection(categoriesList, paymentsList) {
    const settingSection = generateElement(`
      <section class="settings">
        <div class="categories-list">
          <div class="income-categories-list">
            <div class="list-header">
              <div class=""title">Categories</div>
            </div>
            <div class="list-body">
              ${incomeCategoriesList
                .map((category) => {
                  return `<div class="row" contenteditable>${category.name}</div>`
                })
                .join('')}   
            </div>
          </div>

          <div class="expense-categories-list">
            <div class="list-header">
              <div class=""title">Categories</div>
            </div>
            <div class="list-body">
              ${expenseCategoriesList
                .map((category) => {
                  return `<div class="row" contenteditable>${category.name}</div>`
                })
                .join('')}   
            </div>
          </div>
        </div>

        <div class="payments-list">
          <div class="list-header">
            <div class=""title">Payments</div>
          </div>
          <div class="list-body">
            ${paymentsList
              .map(
                (payment) =>
                  `<div class="payment row" contenteditable>${payment.name}</div>`
              )
              .join('')}
          </div>
        </div>
      </section>
    `)
  }

  render({ page, data: { category: categoriesList, payment: paymentsList } }) {
    const user = {
      profile: null,
      email: 'winteri1276@gmail.com',
      name: '힌규현',
    }

    const incomeCategoriesList = categoriesList.filter(
      (c) => c.type === 'income'
    )
    const expenseCategoriesList = categoriesList.filter(
      (c) => c.type === 'expense'
    )

    this.$root.append(generateProfileSectionElm(user))
    this.$root.append(settingSection)
  }
}
