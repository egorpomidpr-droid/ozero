const header = document.querySelector('[data-header]')
const menuToggle = document.querySelector('[data-menu-toggle]')
const menu = document.querySelector('[data-menu]')
const form = document.querySelector('[data-form]')
const formMessage = document.querySelector('[data-form-message]')
const modal = document.querySelector('[data-lightbox-modal]')
const modalImage = document.querySelector('[data-lightbox-image]')
const closeModal = document.querySelector('[data-lightbox-close]')

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 30)
}

window.addEventListener('scroll', updateHeader, { passive: true })
updateHeader()

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
  menuToggle.setAttribute('aria-expanded', String(!isOpen))
  menu?.classList.toggle('open', !isOpen)
})

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false')
    menu.classList.remove('open')
  })
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))

document.querySelectorAll('[data-lightbox]').forEach((item) => {
  item.addEventListener('click', () => {
    const source = item.getAttribute('data-lightbox')
    if (!source || !modal || !modalImage) return
    modalImage.src = source
    modalImage.alt = item.querySelector('img')?.alt || ''
    modal.classList.add('open')
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
  })
})

const hideModal = () => {
  modal?.classList.remove('open')
  modal?.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
}

closeModal?.addEventListener('click', hideModal)
modal?.addEventListener('click', (event) => {
  if (event.target === modal) hideModal()
})
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideModal()
})

form?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (formMessage) formMessage.textContent = 'Спасибо. Мы получили заявку и скоро свяжемся с вами.'
  form.reset()
})
