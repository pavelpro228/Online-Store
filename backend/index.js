const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/userModel.js')
const reviewModel = require('./models/reviewModel.js')
const basketModel = require('./models/basketModel.js')
const productModel = require('./models/productModel.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

connectDB()

app.listen(port, () => console.log(`Listening on port ${port}`))

app.post('/api/add-review', async (req, res) => {
  try {
    const { userName, email, text } = req.body

    if (email) {
      if (!userName || !email)
        return res.status(400).json({ message: 'Введіть значення!' })
  
      const newReview = new reviewModel({
        userName,
        email,
        text,
      })
      const saveReview = await newReview.save()
      
      // const reviewsArr = new userModel
      // const arr = reviewsArr.reviews
      // const newArr = [arr, newReview]
      // console.log(arr);
      

      // const updatedReviewArr = await userModel.findOneAndUpdate(
      //   {email: email}, {reviews: newArr}
      // )

      return res.status(200).json({message: "Відгук додано!"}, saveReview)
    }
    return res.status(400).json({ error: 'Ви не авторизовані!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Помилка' })
  }
})

app.delete('/api/delete-review', async (req, res) => {
  try {
    const { id, email } = req.body
    if (!email) 
      return res.status(400).json({ error: 'Ви не авторизовані!' })
    
    const deletedReview = await reviewModel.findByIdAndDelete(id)

    return res.status(200).json({ message: 'Відгук видалено!' })
  } catch (error) {
    console.log(error)
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Помилка' });
    }
  }
})

app.get('/api/reviews', async (req, res) => {
  const reviews = await reviewModel.find()
  res.json(reviews)
})

app.post('/api/registration', async (req, res) => {
  try {
    const { name, surname, email, password, confirmPassword } = req.body

    if (!name || !surname || !email || !password || !confirmPassword)
      return res.status(400).json({ error: 'Введіть значення!' })

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Паролі не співпадають!' })

    const candidate = await userModel.findOne({ email })
    if (candidate)
      return res.status(400).json({ error: 'Такий користувач вже існує!' })

    const user = new userModel({
      name,
      surname,
      email,
      password,
      confirmPassword,
    })
    const save = await user.save()
    return res
      .status(200)
      .json(
        { message: 'Ви успішно авторизувалися!', email: save.email, name: save.name },
        save
      )
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Помилка' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Введіть значення!' })

    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Email не знайдено!' })

    if (password !== user.password)
      return res.status(400).json({ error: 'Пароль неправильний!' })

    return res.status(200).json({ message: 'Ви авторизувалися успішно!', email: email, name: user.name })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Помилка' })
  }
})

// app.get('/api/users', (req, res) => {
//   res.json([
//     {
//       id: 1,
//       name: 'Pavel',
//       surname: 'Buylin',
//       email: 'buylin399pavel@gmail.com',
//       password: 'pasha123',
//     },
//     {
//       id: 2,
//       name: 'Alex',
//       surname: 'Chubenko',
//       email: 'sasha@gmail.com',
//       password: 'sasha123',
//     },
//     {
//       id: 3,
//       name: 'Petro',
//       surname: 'Petrov',
//       email: 'petro@gmail.com',
//       password: 'petro123',
//     },
//   ])
// })
const addProductCount = async (res, email, product, candidate) => {
  const updatedCount = await basketModel.findOneAndUpdate(
    {email: email, 'product.name': product.name}, {count: candidate.count + 1}
  )
  return res.status(200).json(updatedCount)
}

const subProductCount = async (res, product, candidate) => {
  const updatedCount = await basketModel.findOneAndUpdate(
    {'product.name': product.name}, {count: candidate.count - 1}
  )
  return res.status(200).json(updatedCount)
}

app.post('/api/baskets', async (req, res) => {
  try {
    const { email, product } = req.body
    const candidate = await basketModel.findOne({email: email, 'product.name': product.name})

    if (email) {
      if (!candidate) {
        const count = 1
        const newBasket = new basketModel({
          email,
          product,
          count
        })
        const save = await newBasket.save()
        return res.status(200).json({ message: 'Новий товар додано у кошик!' }, save)
      }
      return addProductCount(res, email, product, candidate)
    }
    return res.status(400).json({ error: 'Ви не авторизовані!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Помилка' })
  }
})

app.post('/api/add-count', async (req, res) => {
  const { email, product } = req.body
  const candidate = await basketModel.findOne({email: email, 'product.name': product.name})
  return addProductCount(res, email, product, candidate)
})
app.post('/api/sub-count', async (req, res) => {
  const { email, product } = req.body
  const candidate = await basketModel.findOne({email: email, 'product.name': product.name})
  return subProductCount(res, product, candidate)
})

app.post('/api/get-products-in-basket', async (req, res) => {
  try {
    const { email } = req.body
    const products = await basketModel.find({ email: email })
    // const prices = products.map(p => p.product.price)
    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Помилка' })
  }
})

app.delete('/api/delete-products-from-basket', async (req, res) => {
  try {
    const { _id } = req.body
    const deletedProduct = await basketModel.findOneAndDelete({_id: _id})
    return res.status(200).json({ message: 'Товар видалено з кошика!' })
  } catch (error) {
    console.log(error)
  }
})

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/api/products', async (req, res) => {
  const products = await productModel.find()
  res.json(products)
})