const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/userModel.js')
const reviewModel = require('./models/reviewModel.js')
const basketModel = require('./models/basketModel.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

connectDB()

app.listen(port, () => console.log(`Listening on port ${port}`))

app.post('/api/add-review', async (req, res) => {
  try {
    const { userName, email, text } = req.body

    if (email) {
      if (!userName || !email || !userName)
        return res.status(400).json({ message: 'Enter the values!' })
  
      const newReview = new reviewModel({
        userName,
        email,
        text,
      })
      const save = await newReview.save()
      return res.status(200).json({message: "Review added!"}, save)
    }
    return res.status(400).json({ error: 'You are not authorized!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.delete('/api/delete-review', async (req, res) => {
  try {
    const { id } = req.body
    const deletedReview = await reviewModel.findByIdAndDelete(id)
    return res.status(200).json({ message: 'Review deleted!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
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
      return res.status(400).json({ error: 'Enter the values!' })

    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Passwords do not match!' })

    const candidate = await userModel.findOne({ email })
    if (candidate)
      return res.status(400).json({ error: 'Such user already exists!' })

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
        { message: 'You registered successfully!', email: save.email },
        save
      )
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ error: 'Enter the values!' })

    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Email not found!' })

    if (password !== user.password)
      return res.status(400).json({ error: 'Password is not valid!' })

    return res.status(200).json({ message: 'Login successful!', email: email })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
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

app.post('/api/baskets', async (req, res) => {
  try {
    const { email, product } = req.body

    if (email) {
      const newBasket = new basketModel({
        email,
        product,
      })
  
      const save = await newBasket.save()
      return res.status(200).json({ message: 'Product added to basket!' }, save)
    }
    return res.status(400).json({ error: 'You are not authorized!' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Error' })
  }
})

app.post('/api/get-products-in-basket', async (req, res) => {
  try {
    const { email } = req.body
    const products = await basketModel.find({ email: email })
    res.json(products)
  } catch (error) {
    console.log(error)
  }
})

app.delete('/api/delete-products-from-basket', async (req, res) => {
  try {
    const { _id } = req.body
    const deletedProduct = await basketModel.findOneAndDelete({_id: _id})
    return res.status(200).json({ message: 'Product deleted from your basket!' })
  } catch (error) {
    console.log(error)
  }
})

const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')))

app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Computer ARTLINE Gaming X63',
      image: '/images/ARTLINE Gaming X63.png',
      price: 770,
      description: "Computer 1"

    },
    {
      id: 2,
      name: 'Computer ARTLINE WorkStation W53',
      image: '/images/ARTLINE WorkStation W53.png',
      price: 580,
      description: "Computer 2"

    },
    {
      id: 3,
      name: 'Computer ARTLINE Gaming X39',
      image: '/images/ARTLINE Gaming X39.png',
      price: 780,
      description: "Computer 3"

    },
    {
      id: 4,
      name: 'Gaming keyboard 2E-KG315-GAMING_-Black',
      image: '/images/2E-KG315-GAMING_-Black.png',
      price: 22,
      description: "Computer 4"

    },
    {
      id: 5,
      name: 'Gaming keyboard GamePro-Headshot-GK398-USB',
      image: '/images/GamePro-Headshot-GK398-USB.png',
      price: 15,
      description: "Computer 5"

    },
    {
      id: 6,
      name: 'Gaming keyboard RAZER-Ornata-V3-X_-UKR',
      image: '/images/RAZER-Ornata-V3-X_-UKR.png',
      price: 58,
      description: "Computer 6"

    },
    {
      id: 7,
      name: 'Gaming mouse Esperanza-MX205-FIGHTER-Green',
      image: '/images/Esperanza-MX205-FIGHTER-Green.png',
      price: 10,
      description: "Computer 7"

    },
    {
      id: 8,
      name: 'Gaming mouse Logitech-G102-Lightsync-Black',
      image: '/images/Logitech-G102-Lightsync-Black.png',
      price: 44,
      description: "Computer 8"

    },
    {
      id: 9,
      name: 'Gaming mouse Razer-DeathAdder-Essential-Black',
      image: '/images/Razer-DeathAdder-Essential-Black.png',
      price: 34,
      description: "Computer 9"

    },
  ])
})
